import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AppStoreOptimizationSection() {
  return (
    <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white">
      <h2 className="mb-6 text-center text-3xl font-bold">
        App Store Optimization (ASO)
      </h2>
      <p className="mb-8 text-center text-lg opacity-90">
        Your app icon is the first thing users see. Make it count with these
        proven strategies that can increase your download rates by up to 30%.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-bold">Visual Impact</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>• Use bold, contrasting colors</li>
            <li>• Avoid text in small icons</li>
            <li>• Ensure scalability to 16×16px</li>
            <li>• Test on different backgrounds</li>
          </ul>
        </div>
        <div className="rounded-lg bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-bold">Brand Consistency</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>• Align with brand colors</li>
            <li>• Maintain recognizable elements</li>
            <li>• Consider category conventions</li>
            <li>• A/B test different versions</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/blog/app-store-optimization-icons"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-gray-100"
        >
          Learn ASO Strategies
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
