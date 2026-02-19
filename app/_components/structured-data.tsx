import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Expo Icon Generator",
    alternateName: [
      "Expo Assets Generator",
      "React Native Icon Generator",
      "Expo App Icon Generator",
    ],
    url: "https://expo-assets-generator.vercel.app",
    description:
      "Free tool to generate iOS, Android, and web icons for Expo/React Native apps from a single source image. Creates adaptive icons, app store icons, and splash screens automatically.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    softwareVersion: "1.2.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Naresh Bhosale",
      url: "https://github.com/WebNaresh",
    },
    publisher: {
      "@type": "Organization",
      name: "Expo Icon Generator",
      url: "https://expo-assets-generator.vercel.app",
    },
    featureList: [
      "Generate expo app icons from one image",
      "Create adaptive icons for Android",
      "iOS app icon generation",
      "Web app favicon creation",
      "Splash screen generation",
      "Automatic app.json configuration",
      "React Native compatible",
      "Free and open source",
    ],
    screenshot: "https://expo-assets-generator.vercel.app/opengraph-image.png",
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Expo Icon Generator",
    url: "https://expo-assets-generator.vercel.app",
    logo: "https://expo-assets-generator.vercel.app/web-app-manifest-512x512.png",
    description:
      "Free Expo icon generator for React Native developers. Generate all required platform icons from a single source image.",
    founder: {
      "@type": "Person",
      name: "Naresh Bhosale",
    },
    sameAs: ["https://github.com/WebNaresh/expo-icon-generator"],
  };

  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate Expo App Icons",
    description:
      "Generate all required iOS, Android, and web icons for your Expo React Native app from a single image in seconds.",
    totalTime: "PT1M",
    tool: [
      {
        "@type": "HowToTool",
        name: "Expo Icon Generator",
        url: "https://expo-assets-generator.vercel.app",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your image",
        text: "Upload a high-quality PNG, JPG, JPEG, or SVG image (1024×1024px recommended, max 10MB).",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Configure settings",
        text: "Choose a background color for your Android adaptive icon. The tool auto-detects the best color from your image.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download your icons",
        text: "Download individual icons or the complete ZIP with all icon sizes and a pre-configured app.json file.",
      },
    ],
  };

  return (
    <>
      <Script
        id="webapp-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <Script
        id="howto-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToData),
        }}
      />
    </>
  );
}
