import { ImageIcon, CheckCircle, Loader2, Download } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="mx-auto mt-16 max-w-6xl">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        Why Choose Expo Icon Generator?
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            <ImageIcon className="h-8 w-8 text-sky-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Multiple Formats
          </h3>
          <p className="text-gray-600">
            Generate icons for iOS, Android, and web platforms with proper
            sizing and optimization.
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Optimized Output
          </h3>
          <p className="text-gray-600">
            Sharp scaling and image optimization ensure your icons look crisp on
            all devices.
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <Loader2 className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            One Command
          </h3>
          <p className="text-gray-600">
            Generate all required icon sizes with a single upload - no manual
            resizing needed.
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Download className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
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
