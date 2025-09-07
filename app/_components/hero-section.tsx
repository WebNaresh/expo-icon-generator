import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Expo Assets Generator
        <span className="block text-3xl md:text-4xl mt-2 text-sky-600">
          Free Icon Generator for React Native
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
        The ultimate <strong>expo icon generator</strong> and <strong>expo assets generator</strong> for React Native developers. 
        Create <strong>expo app icons</strong>, <strong>adaptive icons</strong>, and all platform-specific icons 
        from a single image. Perfect for <strong>expo icon generation</strong> and <strong>react native app icon</strong> needs.
      </p>
      <div className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
        Generate <strong>iOS icons</strong>, <strong>Android adaptive icons</strong>, <strong>web app icons</strong>, 
        and <strong>expo favicon</strong> automatically. Supports all <strong>expo icon sizes</strong> and formats 
        required for App Store and Google Play submission.
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          iOS, Android & Web Icons
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Adaptive Icon Generator
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          All Expo Icon Sizes
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          React Native Compatible
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          App Store Ready
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Free & Open Source
        </span>
      </div>
    </div>
  );
}
