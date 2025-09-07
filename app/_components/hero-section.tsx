import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Expo Icon Generator
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Automate and simplify icon generation for your Expo-based React Native
        apps. Generate platform-specific icons from a single source image with
        one command.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          iOS, Android & Web Icons
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Image Optimization
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Multiple Densities
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Automatic app.json Updates
        </span>
      </div>
    </div>
  );
}
