import { useState } from "react";
import { Download, Eye, Package } from "lucide-react";
import IconDetailModal from "./icon-detail-modal";
import AppJsonPreview from "./app-json-preview";
import { GeneratedIcon } from "./types";

interface GeneratedIconsDisplayProps {
  generatedIcons: GeneratedIcon[];
  backgroundColor: string;
  splashBackgroundColor: string;
  splashEnabled: boolean;
  onDownloadIcon: (icon: GeneratedIcon) => void;
  onDownloadAllIcons: () => void;
}

function categorizeIcons(icons: GeneratedIcon[]) {
  const categories: { label: string; icons: GeneratedIcon[] }[] = [
    { label: "App Icons", icons: [] },
    { label: "React Logo", icons: [] },
    { label: "Splash", icons: [] },
    { label: "Other", icons: [] },
  ];

  icons.forEach((icon) => {
    const name = icon.name.toLowerCase();
    if (
      name.includes("icon.png") ||
      name.includes("adaptive") ||
      name.includes("favicon")
    ) {
      categories[0].icons.push(icon);
    } else if (name.includes("react")) {
      categories[1].icons.push(icon);
    } else if (name.includes("splash")) {
      categories[2].icons.push(icon);
    } else {
      categories[3].icons.push(icon);
    }
  });

  return categories.filter((c) => c.icons.length > 0);
}

export default function GeneratedIconsDisplay({
  generatedIcons,
  backgroundColor,
  splashBackgroundColor,
  splashEnabled,
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

  const categories = categorizeIcons(generatedIcons);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-400">
              {generatedIcons.length} assets generated
            </span>
          </div>
          <button
            onClick={onDownloadAllIcons}
            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            <Download className="h-3 w-3" />
            Download ZIP
          </button>
        </div>

        {/* Grouped icon rows */}
        <div className="divide-y divide-gray-800">
          {categories.map((category) => (
            <div key={category.label} className="p-4">
              <p className="mb-2.5 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                {category.label}
              </p>
              <div className="space-y-1">
                {category.icons.map((icon, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-800"
                  >
                    {/* Thumbnail */}
                    <button
                      onClick={() => handleIconClick(icon)}
                      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-700 bg-gray-800"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.url}
                        alt={icon.name}
                        className="h-7 w-7 object-contain"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/0 transition-colors group-hover:bg-white/10">
                        <Eye className="h-3 w-3 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </button>

                    {/* Name */}
                    <button
                      onClick={() => handleIconClick(icon)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="truncate text-sm font-medium text-gray-300">
                        {icon.name}
                      </p>
                    </button>

                    {/* Size badge */}
                    <span className="hidden shrink-0 rounded-md bg-gray-800 px-2 py-0.5 font-mono text-[10px] text-gray-500 sm:inline-block">
                      {icon.size}
                    </span>

                    {/* Download */}
                    <button
                      onClick={() => onDownloadIcon(icon)}
                      className="shrink-0 rounded-md border border-gray-700 p-1.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-gray-800 hover:text-white"
                      title={`Download ${icon.name}`}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* app.json Configuration */}
      <AppJsonPreview
        backgroundColor={backgroundColor}
        splashBackgroundColor={splashBackgroundColor}
        splashEnabled={splashEnabled}
      />

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
