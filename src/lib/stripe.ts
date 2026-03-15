import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_placeholder", {
  apiVersion: "2026-02-25.clover",
});

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
    features: [
      "Daily horoscope (brief)",
      "Basic birth chart (limited)",
      "Community access",
    ],
  },
  PREMIUM: {
    name: "Premium",
    price: 9.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      "Everything in Free",
      "Weekly & monthly horoscopes",
      "Full birth chart analysis",
      "Detailed natal reports",
      "Transit tracker",
      "Exclusive articles",
    ],
  },
  PRO: {
    name: "Pro",
    price: 19.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "Everything in Premium",
      "Compatibility reports",
      "Personalized transit alerts",
      "Priority support",
      "Early access to features",
    ],
  },
} as const;
