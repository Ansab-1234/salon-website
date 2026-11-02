import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  title: "Naturals Salon | Vijaya Nagar Colony, Hyderabad | Luxury Hair & Bridal Studio",
  description: "Experience premium beauty, haircuts, HydraFacials, keratin treatments, and signature bridal makeup at Naturals Salon, Vijaya Nagar Colony, Hyderabad. Rated 4.8★ with 1,480+ reviews.",
  keywords: [
    "Naturals Salon Vijaya Nagar Colony",
    "Salon in Vijaya Nagar Colony Hyderabad",
    "Best hair salon Hyderabad",
    "Bridal makeup Vijaya Nagar Colony",
    "HydraFacial Hyderabad",
    "Keratin treatment Hyderabad",
    "Naturals salon booking",
  ],
  authors: [{ name: "Naturals Salon Vijaya Nagar Colony" }],
  openGraph: {
    title: "Naturals Salon – Vijaya Nagar Colony, Hyderabad",
    description: "Discover Your Beauty. Define Your Style. Premium hair, skincare, and bridal care with certified master artists.",
    url: "https://salons.naturals.in/",
    siteName: "Naturals Salon Vijaya Nagar Colony",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-ivory-50 text-onyx-950 font-sans antialiased selection:bg-gold-500 selection:text-onyx-950">
        {children}
      </body>
    </html>
  );
}
