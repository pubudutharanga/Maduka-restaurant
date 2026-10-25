import type { Metadata, Viewport } from "next";
import { Caveat, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFloatingCTA } from "@/components/WhatsAppFloatingCTA";
import { siteDescription, siteKeywords, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const sensei = localFont({
  src: "./font/Sensei-Medium.otf",
  weight: "500",
  style: "normal",
  variable: "--font-sensei",
  display: "swap",
});

const pageTitle =
  "Maduka Restaurant & Rooms | Beachfront Stay & Sri Lankan Kitchen, Kalpitiya";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "restaurant",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "/",
    siteName,
    title: pageTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fishing boats on the private beach at Maduka Restaurant & Rooms, Ilandaiyadi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d4c5c",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${caveat.variable} ${sensei.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ocean focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-sand focus:shadow-lift"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloatingCTA />
      </body>
    </html>
  );
}
