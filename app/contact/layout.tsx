import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact - Expo Assets Generator",
  description:
    "Get in touch with questions, bug reports, or feature requests for Expo Assets Generator.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
