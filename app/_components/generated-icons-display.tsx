import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

interface GeneratedIcon {
  name: string;
  size: string;
  url: string;
  blob: Blob;
}

interface GeneratedIconsDisplayProps {
  generatedIcons: GeneratedIcon[];
  onDownloadIcon: (icon: GeneratedIcon) => void;
  onDownloadAllIcons: () => void;
}

export default function GeneratedIconsDisplay({
  generatedIcons,
  onDownloadIcon,
  onDownloadAllIcons,
}: GeneratedIconsDisplayProps) {
  if (generatedIcons.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Generated Icons ({generatedIcons.length})
        </h3>
        <button
          onClick={onDownloadAllIcons}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Download All (ZIP)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generatedIcons.map((icon, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <Image
                src={icon.url}
                alt={icon.name}
                width={200}
                height={200}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {icon.name}
                </span>
                <span className="text-xs text-gray-500 ml-2">{icon.size}</span>
              </div>
              <button
                onClick={() => onDownloadIcon(icon)}
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-100 hover:bg-sky-200 text-sky-700 font-medium px-3 py-2 rounded text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
