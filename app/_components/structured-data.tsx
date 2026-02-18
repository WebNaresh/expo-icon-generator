import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Expo Assets Generator",
    alternateName: [
      "Expo Icon Generator",
      "React Native Icon Generator",
      "Expo App Icon Generator",
    ],
    url: "https://expo-assets-generator.vercel.app",
    description:
      "Free Expo Assets Generator and Icon Generator for React Native apps. Generate iOS, Android, and web icons from one image. Create adaptive icons, app store icons, and all expo icon sizes automatically.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Expo Assets Generator Team",
    },
    featureList: [
      "Generate expo app icons",
      "Create adaptive icons for Android",
      "iOS app icon generation",
      "Web app icon creation",
      "Multiple icon densities",
      "Automatic app.json configuration",
      "React Native compatible",
      "Free and open source",
    ],
    screenshot: "https://expo-assets-generator.vercel.app/opengraph-image.png",
    softwareVersion: "1.0",
    keywords: [
      "expo assets generator",
      "expo icon generator",
      "expo app icon generator",
      "react native icon generator",
      "adaptive icon generator",
      "expo icons",
      "react native app icon",
      "expo android icon",
      "expo ios icon",
      "app store icons generator",
    ],
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Expo Assets Generator",
    url: "https://expo-assets-generator.vercel.app",
    logo: "https://expo-assets-generator.vercel.app/web-app-manifest-512x512.png",
    description:
      "The ultimate expo icon generator and expo assets generator for React Native developers.",
    sameAs: ["https://github.com/WebNaresh/expo-icon-generator"],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Expo Assets Generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Expo Assets Generator is a free tool that helps React Native developers generate platform-specific icons (iOS, Android, web) from a single source image. It creates all the required expo app icons, adaptive icons, and icon sizes needed for app store submission.",
        },
      },
      {
        "@type": "Question",
        name: "How do I generate expo app icons?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply upload your source image (PNG, JPG, or SVG), select your background color, and click generate. Our expo icon generator will create all the necessary icon sizes and formats for iOS, Android, and web platforms automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support Android adaptive icons?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our adaptive icon generator creates Android adaptive icons that follow Google's design guidelines. The tool generates both foreground and background layers required for adaptive icons.",
        },
      },
      {
        "@type": "Question",
        name: "Is the expo icon generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Expo Assets Generator is completely free and open source. You can generate unlimited expo icons, react native app icons, and use all features without any cost.",
        },
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
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
    </>
  );
}
