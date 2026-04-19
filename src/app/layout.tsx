import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://idonthaveawill.com"),
  verification: {
    google: "aSAROWRm5tmjvMJ71KHMPTVNVZCIcIyBpY0o7WbHN10",
  },
  title: {
    default: "Free Will Drafting Tool | idonthaveawill.com",
    template: "%s | idonthaveawill.com",
  },
  description:
    "A free self-help tool to draft a simple will in about 10 minutes. Covers all 50 US states and DC. No account needed. Your data never leaves your browser. Not legal advice.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://idonthaveawill.com",
  },
  openGraph: {
    title: "You Don't Have a Will. Let's Fix That.",
    description:
      "A free self-help tool to draft a simple will in about 10 minutes. All 50 states + DC. No account, no cost, no data stored.",
    type: "website",
    url: "https://idonthaveawill.com",
    siteName: "idonthaveawill.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "You Don't Have a Will. Let's Fix That.",
    description:
      "A free self-help tool to draft a simple will in about 10 minutes. All 50 states + DC. No account needed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-cream)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "idonthaveawill.com",
            "url": "https://idonthaveawill.com"
          }) }}
        />
        <PostHogProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
