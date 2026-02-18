import { Layers, Zap, Download, Shield } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "All Platforms",
    description: "iOS, Android, and web icons from one source image.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Sharp-powered processing delivers crisp icons in seconds.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description: "Download individually or grab everything as a ZIP.",
  },
  {
    icon: Shield,
    title: "Store Ready",
    description: "Icons meet App Store and Google Play requirements.",
  },
];

export default function FeaturesSection() {
  return (
    <div className="mx-auto max-w-5xl py-16">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
              <feature.icon className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-xs leading-relaxed text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
