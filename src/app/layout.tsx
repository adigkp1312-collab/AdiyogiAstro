import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nakshatra - Vedic Astrology & Horoscope",
  description: "Personalized Vedic astrology insights, daily horoscopes, Panchang data, and live astrologer consultations.",
  keywords: "vedic astrology, horoscope, nakshatra, panchang, kundli, astrologer consultation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background">
        <AuthProvider>
          <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
