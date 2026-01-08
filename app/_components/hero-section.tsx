import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
        Expo Assets Generator
        <span className="mt-2 block text-3xl text-sky-600 md:text-4xl">
          Free Icon Generator for React Native
        </span>
      </h1>
      <p className="mx-auto mb-6 max-w-4xl text-xl text-gray-600">
        The ultimate <strong>expo icon generator</strong> and{" "}
        <strong>expo assets generator</strong> for React Native developers.
        Create <strong>expo app icons</strong>, <strong>adaptive icons</strong>,
        and all platform-specific icons from a single image. Perfect for{" "}
        <strong>expo icon generation</strong> and{" "}
        <strong>react native app icon</strong> needs.
      </p>
      <div className="mx-auto mb-8 max-w-3xl text-lg text-gray-700">
        Generate <strong>iOS icons</strong>,{" "}
        <strong>Android adaptive icons</strong>, <strong>web app icons</strong>,
        and <strong>expo favicon</strong> automatically. Supports all{" "}
        <strong>expo icon sizes</strong> and formats required for App Store and
        Google Play submission.
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          iOS, Android & Web Icons
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Adaptive Icon Generator
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          All Expo Icon Sizes
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          React Native Compatible
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          App Store Ready
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Free & Open Source
        </span>
      </div>
    </div>
  );
}
