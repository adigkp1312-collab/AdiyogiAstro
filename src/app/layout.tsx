import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nakshatra - Vedic Astrology & Horoscope",
  description: "Personalized Vedic astrology insights, daily horoscopes, Panchang data, and live astrologer consultations.",
  keywords: "vedic astrology, horoscope, nakshatra, panchang, kundli, astrologer consultation",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nakshatra",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#7C3AED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon-96x96.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nakshatra" />
      </head>
      <body className="antialiased bg-background">
        <LanguageProvider>
          <AuthProvider>
            <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden">
              {children}
            </div>
          </AuthProvider>
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                // First unregister any broken service workers, then register fresh
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  var needsReload = false;
                  registrations.forEach(function(reg) {
                    if (reg.installing || reg.waiting) {
                      // A broken or waiting SW exists — unregister it
                      reg.unregister();
                      needsReload = true;
                    }
                  });
                  // Register the (fixed) service worker
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('SW registration failed: ', error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
