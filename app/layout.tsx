import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/utils/navbar";
import { Footer } from "@/components/utils/footer";
import { Providers } from "./providers";
import Script from "next/script";

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
    default:
      "Expo Assets Generator - Free Icon Generator for React Native Apps | Expo Icons",
    template: "%s | Expo Assets Generator",
  },
  description:
    "Free Expo Assets Generator and Icon Generator for React Native apps. Generate iOS, Android, and web icons from one image. Create adaptive icons, app store icons, and all expo icon sizes automatically. Perfect for expo app icon generation, react native icon generator needs, and app development workflow.",
  keywords: [
    // High-performing keywords from Google Search Console (prioritized by CTR and impressions)
    "expo assets generator",
    "expo icon generator",
    "expo app icon generator",
    "expo icons generator",
    "expo adaptive icon generator",
    "expo asset generator",
    "expo icons",
    "expo icon",
    "expo app icon",
    "expo icon builder",
    "react native icon generator",
    "react native app icon generator",
    "expo icon composer",
    "expo adaptive icon",
    "adaptive icon generator",
    "generate app store icons",
    "android adaptive icon generator",
    "expo app icon size",
    "expo android icon",
    "expo android app icon",
    "expo app icons",
    "app icon generator react native",
    "expo icon size",
    "expo icon app",
    "expo ios icon",
    "adaptive icon expo",
    "app icon expo",
    "expo react native icons",
    "expo icons react native",
    "android application icon generator",
    "expo favicon",
    "expo android adaptive icon",
    "react expo icons",
    "react native logo generator",
    "expo splash screen generator",
    "expo app logo",
    "icon expo",
    "react native expo icon",
    "react native expo icons",
    "react native expo app icon",
    "icons expo",
    "react native adaptive icon",
    "android adaptive icons generator",
    "expo generate icons",
    "react native icons generator",
    "expo icon png",
    "app assets generator",
    "react native android icon generator",
    "android adaptive icon expo",
    "auto generate icon",
    "app store icons generator",
    "icons for expo",
    "react native icons expo",
    "expo svg icon",
    "generate adaptive icon android online",
    "generate app icons",
    "apple app store icon generator",
    "splash icon generator",
    "ios icon generator",
    "android and ios app icon generator",
    "ios app icons generator",
    // Additional technical keywords
    "expo icon automation",
    "react native development tools",
    "mobile app icon generator",
    "expo cli tools",
    "app.json icon configuration",
    "expo project setup",
    "react native asset management",
    "cross-platform icon generation",
    "expo build tools",
    "mobile app development",
    "react native toolchain",
    "expo workflow optimization",
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
    title:
      "Expo Assets Generator - Free Icon Generator for React Native Apps | Expo Icons",
    description:
      "Free Expo Assets Generator and Icon Generator for React Native apps. Generate iOS, Android, and web icons from one image. Create adaptive icons, app store icons, and all expo icon sizes automatically.",
    url: "https://expo-assets-generator.vercel.app",
    siteName: "Expo Assets Generator",
    images: [
      {
        url: "https://expo-assets-generator.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Expo Assets Generator - Free Icon Generator for React Native Apps",
        type: "image/png",
      },
      {
        url: "https://expo-assets-generator.vercel.app/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Expo Assets Generator Logo",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expo Assets Generator - Free Icon Generator for React Native Apps",
    description:
      "Free Expo Assets Generator and Icon Generator for React Native apps. Generate iOS, Android, and web icons from one image. Create adaptive icons automatically.",
    images: ["https://expo-assets-generator.vercel.app/opengraph-image.png"],
    creator: "@expo_icons",
    site: "@expo_icons",
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
  other: {
    "google-site-verification": "P0DjQblaNVfwyIx_AsVX-z-NqfFD3d_R11IgkLtAsoM",
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6220952943304269"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
