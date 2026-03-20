import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";
import type { SubscriptionTier } from "@/types";
import { PLANS } from "@/lib/stripe";

function getTierFromPriceId(priceId: string): SubscriptionTier {
  if (priceId === PLANS.PRO.priceId) return "PRO";
  if (priceId === PLANS.PREMIUM.priceId) return "PREMIUM";
  return "FREE";
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
        const priceId = subscription.items.data[0].price.id;
        const tier = getTierFromPriceId(priceId);
        const periodStart = new Date((subscription.current_period_start ?? Math.floor(Date.now() / 1000)) * 1000);
        const periodEnd = new Date((subscription.current_period_end ?? Math.floor(Date.now() / 1000) + 30 * 86400) * 1000);

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("No user found for Stripe customer:", customerId);
          break;
        }

        await prisma.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: priceId,
            status: subscription.status,
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
          },
          update: {
            stripeSubscriptionId: subscriptionId,
            stripePriceId: priceId,
            status: subscription.status,
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionTier: tier },
        });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as any;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0].price.id;
        const tier = getTierFromPriceId(priceId);

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("No user found for Stripe customer:", customerId);
          break;
        }

        await prisma.subscription.update({
          where: { userId: user.id },
          data: {
            stripePriceId: priceId,
            status: subscription.status,
            currentPeriodStart: new Date((subscription.current_period_start ?? Math.floor(Date.now() / 1000)) * 1000),
            currentPeriodEnd: new Date((subscription.current_period_end ?? Math.floor(Date.now() / 1000) + 30 * 86400) * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionTier: tier },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("No user found for Stripe customer:", customerId);
          break;
        }

        await prisma.subscription.delete({
          where: { userId: user.id },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionTier: "FREE" },
        });

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
