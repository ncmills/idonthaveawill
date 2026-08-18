import type { Metadata, Viewport } from "next";
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
    default: "Free Will Maker — Draft a Legal Will (50 States, 10 Min)",
    template: "%s | idonthaveawill.com",
  },
  description:
    "A free self-help tool to draft a valid will in about 10 minutes. All 50 states + DC. No account, no cost — your data never leaves your browser.",
  // Icons come from the app-dir metadata files (icon.svg, favicon.ico,
  // apple-icon.png) so every surface renders the same "I." mark. An explicit
  // `icons` block here would override them — and the one it replaces pointed
  // `apple` at an SVG, which iOS does not support, so the home-screen icon
  // silently fell back to a screenshot of the page.
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    // Declaring `icon` here stops Next auto-detecting the app-dir icon files,
    // and that suppression is not scoped to `icon` — it drops `apple` too. So
    // src/app/apple-icon.png shipped and then went unlinked, and iOS, which
    // falls back to looking for /apple-touch-icon.png at the root, found
    // nothing and used a screenshot of the page instead.
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f3ea",
  colorScheme: "light",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--color-ink)] focus:text-[var(--color-cream)] focus:px-4 focus:py-2 focus:text-sm focus:rounded-none focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]"
        >
          Skip to main content
        </a>
        <PostHogProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
