import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/faq",
  },
  title: "FAQ - Frequently Asked Questions | Expo Icon Generator",
  description: "Find answers to common questions about icon generation, Expo app development, platform requirements, and troubleshooting. Comprehensive FAQ for developers.",
  keywords: [
    "expo icon generator faq",
    "app icon questions", 
    "react native icons help",
    "icon generation troubleshooting",
    "expo development faq",
    "mobile app icons guide"
  ],
  openGraph: {
    title: "FAQ - Frequently Asked Questions",
    description: "Find answers to common questions about icon generation and Expo development",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
