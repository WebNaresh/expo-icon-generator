import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AppStoreOptimizationSection() {
  return (
    <div className="mx-auto max-w-3xl py-16">
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
        <h2 className="mb-3 text-xl font-semibold text-white">
          App Store Optimization
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-sm text-gray-400">
          Your app icon is the first thing users see. A well-designed icon can
          increase downloads by up to 30%.
        </p>
        <div className="mb-6 grid gap-4 text-left md:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">
              Visual Impact
            </h3>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>- Bold, contrasting colors</li>
              <li>- Avoid text in small icons</li>
              <li>- Test on different backgrounds</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">
              Brand Consistency
            </h3>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>- Align with brand colors</li>
              <li>- Keep recognizable elements</li>
              <li>- A/B test variations</li>
            </ul>
          </div>
        </div>
        <Link
          href="/blog/app-store-optimization-icons"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:underline"
        >
          Learn ASO strategies
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
