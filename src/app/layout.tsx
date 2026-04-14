import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { DishaChatbot } from "@/components/shared/disha-chatbot";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daivik Vani — Cosmic Intelligence, Ancient Wisdom",
  description:
    "The all-seeing cosmic intelligence bridging millennia of Vedic knowledge with artificial minds. Personalized astrology readings, birth chart analysis, and daily horoscopes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${outfit.variable} font-body antialiased`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
          <DishaChatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
