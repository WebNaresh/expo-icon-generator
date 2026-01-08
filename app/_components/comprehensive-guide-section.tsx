import Link from "next/link";
import { Smartphone, Palette, ArrowRight } from "lucide-react";

export default function ComprehensiveGuideSection() {
  return (
    <div className="mx-auto mt-16 max-w-6xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Complete Icon Generation Guide
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <Smartphone className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            Platform Requirements
          </h3>
          <p className="mb-4 text-gray-600">
            Understanding iOS and Android icon specifications is crucial for app
            store approval. iOS requires 1024×1024px icons without transparency,
            while Android uses adaptive icons with foreground and background
            layers.
          </p>
          <ul className="mb-4 space-y-1 text-sm text-gray-600">
            <li>• iOS: 1024×1024px, no transparency</li>
            <li>• Android: Adaptive icons (108×108dp)</li>
            <li>• Web: Multiple sizes (192×192, 512×512)</li>
            <li>• Proper file naming conventions</li>
          </ul>
          <Link
            href="/blog/ios-android-icon-requirements-2024"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Learn More →
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <Palette className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            Design Best Practices
          </h3>
          <p className="mb-4 text-gray-600">
            Creating effective app icons requires understanding design
            principles, color theory, and user psychology. Your icon should be
            simple, memorable, and work across all sizes and backgrounds.
          </p>
          <ul className="mb-4 space-y-1 text-sm text-gray-600">
            <li>• Simple, recognizable shapes</li>
            <li>• High contrast and legibility</li>
            <li>• Consistent with brand identity</li>
            <li>• Test across different sizes</li>
          </ul>
          <Link
            href="/blog/icon-design-best-practices"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Design Guide →
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <ArrowRight className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            Expo Integration
          </h3>
          <p className="mb-4 text-gray-600">
            Seamlessly integrate generated icons into your Expo project with
            proper app.json configuration and file organization for optimal
            build performance.
          </p>
          <ul className="mb-4 space-y-1 text-sm text-gray-600">
            <li>• Automatic app.json updates</li>
            <li>• Proper asset organization</li>
            <li>• Build optimization tips</li>
            <li>• Testing and deployment</li>
          </ul>
          <Link
            href="/tutorials/expo-icon-setup"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            Integration Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
