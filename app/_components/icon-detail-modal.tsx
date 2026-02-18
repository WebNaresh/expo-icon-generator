import { Download, X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { GeneratedIcon } from "./types";

interface IconDetailModalProps {
  icon: GeneratedIcon | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (icon: GeneratedIcon) => void;
}

export default function IconDetailModal({
  icon,
  isOpen,
  onClose,
  onDownload,
}: IconDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !icon) return null;

  const name = icon.name.toLowerCase();

  // Platform badge
  let platform = "General";
  if (name.includes("android") || name.includes("adaptive")) platform = "Android";
  else if (name.includes("ios") || name.includes("apple")) platform = "iOS";
  else if (name.includes("web") || name.includes("favicon")) platform = "Web";

  // Purpose
  let purpose = "Asset";
  if (name.includes("adaptive")) purpose = "Adaptive Icon";
  else if (name.includes("favicon")) purpose = "Favicon";
  else if (name.includes("splash")) purpose = "Splash Screen";
  else if (name.includes("icon")) purpose = "App Icon";
  else if (name.includes("react")) purpose = "React Logo";

  // File size
  const fileSizeKB = icon.blob
    ? Math.round(icon.blob.size / 1024)
    : icon.url.startsWith("data:")
    ? Math.round((icon.url.length * 0.75) / 1024)
    : 0;

  const handleCopyName = async () => {
    await navigator.clipboard.writeText(icon.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — macOS window */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="max-w-50 truncate font-mono text-xs text-gray-400">
            {icon.name}
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Large preview */}
        <div className="flex items-center justify-center bg-gray-950 p-8">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon.url}
              alt={icon.name}
              className="h-40 w-40 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Info strip */}
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-800 px-4 py-3">
          <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-white">
            {platform}
          </span>
          <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-300">
            {purpose}
          </span>
          <span className="rounded-md bg-gray-800 px-2 py-0.5 font-mono text-[11px] text-gray-400">
            {icon.size}
          </span>
          <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] text-gray-400">
            PNG
          </span>
          {fileSizeKB > 0 && (
            <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] text-gray-400">
              {fileSizeKB} KB
            </span>
          )}
        </div>

        {/* Light / Dark preview */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-3">
          <div className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-800 bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon.url}
              alt="Light preview"
              className="h-10 w-10 object-contain"
            />
            <span className="text-[10px] text-gray-400">Light</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-950 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon.url}
              alt="Dark preview"
              className="h-10 w-10 object-contain"
            />
            <span className="text-[10px] text-gray-500">Dark</span>
          </div>
        </div>

        {/* File path + copy */}
        <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg bg-gray-950 px-3 py-2">
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-gray-400">
            ./assets/{icon.name}
          </span>
          <button
            onClick={handleCopyName}
            className="shrink-0 rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white"
            title="Copy path"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-gray-800 p-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
          >
            Close
          </button>
          <button
            onClick={() => {
              onDownload(icon);
              onClose();
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
