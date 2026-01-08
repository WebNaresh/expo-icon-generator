export default function TechnicalSpecificationsSection() {
  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-2xl bg-gray-50 p-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Technical Specifications
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Supported Input Formats
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              PNG (with transparency support)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              JPG/JPEG (automatic background detection)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              SVG (vector graphics)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Maximum file size: 10MB
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Recommended: Square aspect ratio
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Generated Output
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              iOS: icon.png (1024×1024px)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              Android: Multiple adaptive icon sizes
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              Web: Progressive Web App icons
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Format: Optimized PNG files
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Compression: Balanced quality/size
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
