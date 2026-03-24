import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
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
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
