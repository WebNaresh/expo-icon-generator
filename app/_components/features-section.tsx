import { ImageIcon, CheckCircle, Loader2, Download } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Why Choose Expo Icon Generator?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Multiple Formats
          </h3>
          <p className="text-gray-600">
            Generate icons for iOS, Android, and web platforms with proper
            sizing and optimization.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Optimized Output
          </h3>
          <p className="text-gray-600">
            Sharp scaling and image optimization ensure your icons look crisp on
            all devices.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            One Command
          </h3>
          <p className="text-gray-600">
            Generate all required icon sizes with a single upload - no manual
            resizing needed.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Use
          </h3>
          <p className="text-gray-600">
            Download individual icons or get them all in a ZIP file, ready for
            your Expo project.
          </p>
        </div>
      </div>
    </div>
  );
}
