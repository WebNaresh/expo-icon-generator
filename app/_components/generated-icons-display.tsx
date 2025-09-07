import React, { useState } from "react";
import Image from "next/image";
import { Download, Eye } from "lucide-react";
import IconDetailModal from "./icon-detail-modal";
import { GeneratedIcon } from "./types";

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
  const [selectedIcon, setSelectedIcon] = useState<GeneratedIcon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = (icon: GeneratedIcon) => {
    setSelectedIcon(icon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIcon(null);
  };

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
            <div
              className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors group"
              onClick={() => handleIconClick(icon)}
            >
              <div className="relative">
                <Image
                  src={icon.url}
                  alt={icon.name}
                  width={200}
                  height={200}
                  className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {icon.name}
                </span>
                <span className="text-xs text-gray-500 ml-2">{icon.size}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleIconClick(icon)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded text-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => onDownloadIcon(icon)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-100 hover:bg-sky-200 text-sky-700 font-medium px-3 py-2 rounded text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Icon Detail Modal */}
      <IconDetailModal
        icon={selectedIcon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownload={onDownloadIcon}
      />
    </div>
  );
}
