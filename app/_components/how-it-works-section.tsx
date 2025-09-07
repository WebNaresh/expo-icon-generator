export default function HowItWorksSection() {
  return (
    <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        How It Works
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Your Source Image
            </h3>
            <p className="text-gray-600">
              Drag and drop your logo or app icon (PNG, JPG, JPEG, or SVG) into
              the upload area. Our smart color detection will suggest the best
              background colors.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Choose Background Color
            </h3>
            <p className="text-gray-600">
              Select from our AI-suggested colors or pick your own. The
              background color is applied to the main app icon (icon.png) with
              your image centered at 70% size.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Download Generated Icons
            </h3>
            <p className="text-gray-600">
              Get all platform-specific icons instantly - iOS, Android, and web
              formats, properly sized and optimized. Download individually or as
              a ZIP file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
