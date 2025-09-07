import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AppStoreOptimizationSection() {
  return (
    <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        App Store Optimization (ASO)
      </h2>
      <p className="text-lg mb-8 text-center opacity-90">
        Your app icon is the first thing users see. Make it count with these
        proven strategies that can increase your download rates by up to 30%.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Visual Impact</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>• Use bold, contrasting colors</li>
            <li>• Avoid text in small icons</li>
            <li>• Ensure scalability to 16×16px</li>
            <li>• Test on different backgrounds</li>
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Brand Consistency</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>• Align with brand colors</li>
            <li>• Maintain recognizable elements</li>
            <li>• Consider category conventions</li>
            <li>• A/B test different versions</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link
          href="/blog/app-store-optimization-icons"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Learn ASO Strategies
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
