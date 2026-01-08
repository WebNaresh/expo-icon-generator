export default function HowItWorksSection() {
  return (
    <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        How It Works
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
            1
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
            2
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
            3
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
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
