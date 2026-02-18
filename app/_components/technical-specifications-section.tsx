const inputFormats = ["PNG (with transparency)", "JPG / JPEG", "SVG (vector)", "Max 10MB", "Square ratio recommended"];
const outputFormats = ["icon.png - 1024x1024", "adaptive-icon.png - 1024x1024", "favicon.png - 48x48", "splash.png - 1284x2778", "react-logo variants (1x/2x/3x)"];

export default function TechnicalSpecificationsSection() {
  return (
    <div className="mx-auto max-w-3xl py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold text-white">
        Specifications
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h3 className="mb-3 text-sm font-semibold text-white">Input</h3>
          <ul className="space-y-2">
            {inputFormats.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h3 className="mb-3 text-sm font-semibold text-white">Output</h3>
          <ul className="space-y-2">
            {outputFormats.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
