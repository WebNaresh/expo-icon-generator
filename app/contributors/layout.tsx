import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contributors",
  },
  title: "Contributors | Expo Icon Generator",
  description:
    "Meet the amazing developers who contribute to Expo Icon Generator. Open source contributors making icon generation easier for React Native developers.",
  openGraph: {
    title: "Contributors | Expo Icon Generator",
    description:
      "Meet the developers behind Expo Icon Generator",
    type: "website",
  },
};

export default function ContributorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
