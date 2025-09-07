import Link from "next/link";
import { Smartphone, Palette, ArrowRight } from "lucide-react";

export default function ComprehensiveGuideSection() {
  return (
    <div className="max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Complete Icon Generation Guide
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Smartphone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Platform Requirements
          </h3>
          <p className="text-gray-600 mb-4">
            Understanding iOS and Android icon specifications is crucial for app
            store approval. iOS requires 1024×1024px icons without transparency,
            while Android uses adaptive icons with foreground and background
            layers.
          </p>
          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li>• iOS: 1024×1024px, no transparency</li>
            <li>• Android: Adaptive icons (108×108dp)</li>
            <li>• Web: Multiple sizes (192×192, 512×512)</li>
            <li>• Proper file naming conventions</li>
          </ul>
          <Link
            href="/blog/ios-android-icon-requirements-2024"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn More →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Design Best Practices
          </h3>
          <p className="text-gray-600 mb-4">
            Creating effective app icons requires understanding design
            principles, color theory, and user psychology. Your icon should be
            simple, memorable, and work across all sizes and backgrounds.
          </p>
          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li>• Simple, recognizable shapes</li>
            <li>• High contrast and legibility</li>
            <li>• Consistent with brand identity</li>
            <li>• Test across different sizes</li>
          </ul>
          <Link
            href="/blog/icon-design-best-practices"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Design Guide →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <ArrowRight className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Expo Integration
          </h3>
          <p className="text-gray-600 mb-4">
            Seamlessly integrate generated icons into your Expo project with
            proper app.json configuration and file organization for optimal
            build performance.
          </p>
          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li>• Automatic app.json updates</li>
            <li>• Proper asset organization</li>
            <li>• Build optimization tips</li>
            <li>• Testing and deployment</li>
          </ul>
          <Link
            href="/tutorials/expo-icon-setup"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Integration Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
