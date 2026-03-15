"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Twitter, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@celestialpath.com",
    href: "mailto:support@celestialpath.com",
  },
  {
    icon: MessageCircle,
    label: "Live Chat",
    value: "Available Mon-Fri, 9am-5pm EST",
    href: "#",
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#", handle: "@AstroPath" },
  { icon: Instagram, label: "Instagram", href: "#", handle: "@celestialpath" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    console.log("Contact form submission:", data);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24-48 hours.",
    });

    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="bg-[#FAFAF5]">
      {/* Header */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in{" "}
            <span className="bg-gradient-to-r from-[#FF6600] to-[#FF8C00] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Have a question, feedback, or just want to say hello? We would love
            to hear from you.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Fill out the form below and we will respond within 24-48 hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm text-gray-700">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm text-gray-700">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      required
                      className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more..."
                      required
                      rows={5}
                      className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 w-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-[#e55b00] hover:to-[#e07b00] disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Side panel */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Contact info */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Contact Information
                  </h3>
                  <div className="mt-4 space-y-4">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-orange-50"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF6600]">
                          <item.icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-600">{item.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Follow Us
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Stay connected for daily cosmic updates.
                  </p>
                  <div className="mt-4 space-y-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-orange-50"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF6600]">
                          <social.icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {social.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            {social.handle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* FAQ callout */}
                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                  <h3 className="text-lg font-semibold text-[#FF6600]">
                    Looking for answers?
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Check out our FAQ section on the pricing page for common
                    questions about subscriptions, features, and more.
                  </p>
                  <a
                    href="/pricing"
                    className="mt-3 inline-block text-sm font-medium text-[#FF6600] transition-colors hover:text-[#FF8C00]"
                  >
                    Visit FAQ &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
