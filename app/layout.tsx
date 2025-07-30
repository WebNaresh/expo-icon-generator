import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/utils/navbar";
import { Footer } from "@/components/utils/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Expo Icon Generator - Automate Your App Icons",
    template: "%s | Expo Icon Generator",
  },
  description:
    "A modern tool designed to automate and simplify icon generation for Expo-based React Native apps. Generate platform-specific icons (iOS, Android, web) from a single source image with one command. Features image optimization, sharp scaling, custom background and padding, and automatic app.json updates.",
  keywords: [
    // High-performing keywords from Google Search Console
    "expo assets generator",
    "expo icon generator",
    "expo app icon generator",
    "expo icons generator",
    "expo icons",
    "expo icon builder",
    "expo app icon",
    "expo icon",
    "expo asset generator",
    "expo android icon",
    "react native icon generator",
    "expo app icons",
    // Additional relevant keywords
    "expo-icon-generator",
    "react native icons",
    "app icon automation",
    "expo development",
    "ios icons",
    "android icons",
    "web icons",
    "icon optimization",
    "sharp scaling",
    "app.json generator",
    "mobile app icons",
    "expo tools",
    "react native development",
    "icon generation",
    "multi-platform icons",
    "expo cli",
    "app icon sizes",
    "icon automation tool",
    "react native tools",
  ],
  authors: [{ name: "Expo Icon Generator Team" }],
  creator: "Expo Icon Generator",
  publisher: "Expo Icon Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://expo-assets-generator.vercel.app"),
  alternates: {
    canonical: "https://expo-assets-generator.vercel.app",
  },
  openGraph: {
    title: "Expo Icon Generator - Automate Your App Icons",
    description:
      "Automate and simplify icon generation for Expo-based React Native apps. Generate platform-specific icons from a single source image with one command.",
    url: "https://expo-assets-generator.vercel.app",
    siteName: "Expo Icon Generator",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Expo Icon Generator Logo",
      },
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "Expo Icon Generator Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expo Icon Generator - Automate Your App Icons",
    description:
      "Automate and simplify icon generation for Expo-based React Native apps. Generate platform-specific icons from a single source image.",
    images: ["/web-app-manifest-512x512.png"],
    creator: "@expo_icons",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="P0DjQblaNVfwyIx_AsVX-z-NqfFD3d_R11IgkLtAsoM"
        />
        <meta name="google-adsense-account" content="ca-pub-6220952943304269" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
