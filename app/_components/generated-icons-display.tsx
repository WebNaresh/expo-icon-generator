import React, { useState } from "react";
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
  console.log("🖼️ [DISPLAY] GeneratedIconsDisplay rendered with icons:", {
    count: generatedIcons.length,
    icons: generatedIcons.map((icon, index) => ({
      index,
      name: icon.name,
      urlLength: icon.url?.length,
      urlPrefix: icon.url?.substring(0, 50),
      isDataUrl: icon.url?.startsWith("data:"),
      mimeType: icon.url?.match(/data:([^;]+)/)?.[1],
      hasBase64: icon.url?.includes("base64,"),
      hasBlob: !!icon.blob,
    })),
  });

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
    <div className="rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          Generated Icons ({generatedIcons.length})
        </h3>
        <button
          onClick={onDownloadAllIcons}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
        >
          <Download className="h-4 w-4" />
          Download All (ZIP)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {generatedIcons.map((icon, index) => {
          // Debug logging
          console.log(`Icon ${index}:`, {
            name: icon.name,
            urlPrefix: icon.url.substring(0, 100), // Show more of the data URL
            urlLength: icon.url.length,
            isDataUrl: icon.url.startsWith("data:image/"),
            hasBase64: icon.url.includes("base64,"),
          });

          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <div
                className="group mb-3 flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-50 transition-colors hover:bg-gray-100"
                onClick={() => handleIconClick(icon)}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon.url}
                    alt={icon.name}
                    width={200}
                    height={200}
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                    onError={(e) => {
                      console.error(
                        `Failed to load image for ${icon.name}:`,
                        e
                      );
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded image for ${icon.name}`);
                    }}
                  />
                  {/* Only show overlay on hover, with pointer-events-none to not block image */}
                  <div className="group-hover:bg-opacity-20 pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent transition-all group-hover:bg-black">
                    <Eye className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm font-medium text-gray-900">
                    {icon.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {icon.size}
                  </span>
                </div>
                {/* Debug: Show URL info */}
                <div className="mb-2 text-xs text-gray-400">
                  <div>URL length: {icon.url.length}</div>
                  <div>
                    Data URL: {icon.url.startsWith("data:") ? "✓" : "✗"}
                  </div>
                  <button
                    onClick={() => {
                      const newWindow = window.open();
                      if (newWindow) {
                        newWindow.document.write(
                          `<img src="${icon.url}" alt="${icon.name}" style="max-width: 100%; max-height: 100vh;" />`
                        );
                      }
                    }}
                    className="text-blue-500 underline"
                  >
                    Open in new tab
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleIconClick(icon)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => onDownloadIcon(icon)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-sky-100 px-3 py-2 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-200"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
