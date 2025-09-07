export default function TechnicalSpecificationsSection() {
  return (
    <div className="max-w-6xl mx-auto mt-16 bg-gray-50 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Technical Specifications
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Supported Input Formats
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              PNG (with transparency support)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              JPG/JPEG (automatic background detection)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              SVG (vector graphics)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Maximum file size: 10MB
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Recommended: Square aspect ratio
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Generated Output
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              iOS: icon.png (1024×1024px)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Android: Multiple adaptive icon sizes
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Web: Progressive Web App icons
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Format: Optimized PNG files
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Compression: Balanced quality/size
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
