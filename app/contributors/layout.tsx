import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contributors — Expo Icon Generator Open Source",
  description:
    "Meet the open source contributors who built and maintain the Expo Icon Generator. Their expertise helps developers worldwide generate app icons for iOS, Android, and web from a single image.",
  alternates: {
    canonical: "/contributors",
  },
  openGraph: {
    title: "Contributors — Expo Icon Generator",
    description:
      "Meet the open source contributors who built the Expo Icon Generator tool.",
    type: "website",
    url: "https://expo-assets-generator.vercel.app/contributors",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContributorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
