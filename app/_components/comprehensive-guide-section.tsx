import Link from "next/link";
import { Smartphone, Palette, ArrowRight } from "lucide-react";

const guides = [
  {
    icon: Smartphone,
    title: "Platform Requirements",
    items: [
      "iOS: 1024x1024px, no transparency",
      "Android: Adaptive icons (108x108dp)",
      "Web: 192x192 and 512x512",
    ],
    href: "/blog/ios-android-icon-requirements-2024",
    linkText: "Learn more",
  },
  {
    icon: Palette,
    title: "Design Tips",
    items: [
      "Use simple, recognizable shapes",
      "High contrast for visibility",
      "Test across different sizes",
    ],
    href: "/blog/icon-design-best-practices",
    linkText: "Design guide",
  },
  {
    icon: ArrowRight,
    title: "Expo Integration",
    items: [
      "Copy assets to your project",
      "Use the generated app.json",
      "Build and deploy",
    ],
    href: "/tutorials/expo-icon-setup",
    linkText: "Setup guide",
  },
];

export default function ComprehensiveGuideSection() {
  return (
    <div className="mx-auto max-w-5xl py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold text-white">
        Quick Guides
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800">
              <guide.icon className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              {guide.title}
            </h3>
            <ul className="mb-4 space-y-1.5 text-xs text-gray-500">
              {guide.items.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <Link
              href={guide.href}
              className="text-xs font-medium text-white hover:underline"
            >
              {guide.linkText} &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
