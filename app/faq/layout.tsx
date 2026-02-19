import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "FAQ — Common Questions About Expo Icon Generation",
  description:
    "Answers to common questions about generating Expo app icons, iOS and Android icon requirements, adaptive icons, supported file formats, and integrating generated icons into your React Native project.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ — Expo Icon Generator",
    description:
      "Answers to common questions about Expo icon generation, platform requirements, adaptive icons, and React Native integration.",
    type: "website",
    url: "https://expo-assets-generator.vercel.app/faq",
  },
  twitter: {
    card: "summary",
    title: "FAQ — Expo Icon Generator",
    description:
      "Common questions about Expo icon generation, iOS/Android requirements, and adaptive icons.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Expo Icon Generator and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expo Icon Generator is a free web-based tool that automatically creates all required icon sizes and formats for Expo React Native applications. Upload a single high-quality image (1024×1024px recommended) and the tool generates platform-specific icons for iOS, Android, and web platforms including adaptive icons.",
      },
    },
    {
      "@type": "Question",
      name: "What file formats are supported for upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG, JPG, JPEG, and SVG file formats are supported. PNG is recommended for best quality. Maximum file size is 10MB. Images should be at least 1024×1024px for optimal results across all generated icon sizes.",
      },
    },
    {
      "@type": "Question",
      name: "What icon sizes and formats are generated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool generates: adaptive-icon.png (1024×1024px for Android), icon.png (1024×1024px main app icon), splash-icon.png (1024×1024px), favicon.png (48×48px for web), and multi-density icons (@1x, @2x, @3x). This covers all requirements for iOS App Store, Google Play Store, and web deployment.",
      },
    },
    {
      "@type": "Question",
      name: "How do Android adaptive icons work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Android adaptive icons have a foreground layer (your main icon design) and a background layer (solid color). The system applies various masks depending on the device manufacturer. The tool automatically creates adaptive icons with a safe zone of 66×66dp in the center where important design elements are guaranteed visible.",
      },
    },
    {
      "@type": "Question",
      name: "Is Expo Icon Generator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free with no hidden costs, registration requirements, or usage limits. The service is open source and supported through optional donations and community contributions.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to my uploaded images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uploaded images are processed in real-time and not stored permanently. Images are temporarily cached during processing and automatically deleted after generation. We do not collect, store, or share image data with third parties.",
      },
    },
    {
      "@type": "Question",
      name: "How do I integrate the generated icons into my Expo project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download the ZIP file and extract it to your project's assets folder. Update app.json: set 'icon' to './assets/icon.png', 'android.adaptiveIcon.foregroundImage' to './assets/adaptive-icon.png', and 'web.favicon' to './assets/favicon.png'. Run 'expo prebuild' to apply changes.",
      },
    },
    {
      "@type": "Question",
      name: "Will these icons pass App Store and Google Play Store review?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, generated icons meet all technical requirements for both app stores. Store approval also depends on your icon design following platform guidelines: icons must represent your app's functionality, be original artwork, and be appropriate for your target audience.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {children}
    </>
  );
}
