import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./deck.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deck.spectra.support"),
  title: {
    default: "Spectra | Nearshore Operations for Real Estate & PropTech",
    template: "%s | Spectra"
  },
  description:
    "Standalone Spectra microsite for real estate and PropTech operations support across DACH and US markets.",
  applicationName: "Spectra Capabilities Deck",
  keywords: [
    "Spectra",
    "real estate operations",
    "PropTech support",
    "nearshore delivery",
    "property management support",
    "DACH operations",
    "US operations"
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: "Spectra | Nearshore Operations for Real Estate & PropTech",
    description:
      "A dedicated operational and technical delivery partner for DACH and US real estate markets, running from Pristina, Kosovo.",
    url: "https://deck.spectra.support",
    siteName: "Spectra",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Spectra capabilities microsite preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectra | Nearshore Operations for Real Estate & PropTech",
    description:
      "Operational, accounting, and platform support for DACH and US real estate operators.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  );
}
