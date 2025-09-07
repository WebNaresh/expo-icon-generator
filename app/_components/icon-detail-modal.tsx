import React from "react";
import Image from "next/image";
import { X, Download, Info, FileImage, Ruler, Palette } from "lucide-react";

interface GeneratedIcon {
  name: string;
  size: string;
  url: string;
  blob: Blob;
}

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
  if (!isOpen || !icon) return null;

  // Parse icon details from the name and size
  const getIconDetails = (iconName: string, iconSize: string) => {
    const details = {
      platform: "Unknown",
      purpose: "Unknown",
      format: "PNG",
      dimensions: iconSize,
      density: "1x",
      category: "Unknown",
    };

    const name = iconName.toLowerCase();

    // Determine platform
    if (name.includes("android") || name.includes("adaptive")) {
      details.platform = "Android";
    } else if (name.includes("ios") || name.includes("apple")) {
      details.platform = "iOS";
    } else if (name.includes("web") || name.includes("favicon")) {
      details.platform = "Web";
    }

    // Determine purpose
    if (name.includes("adaptive")) {
      details.purpose = "Adaptive Icon";
      details.category = "App Icon";
    } else if (name.includes("favicon")) {
      details.purpose = "Website Icon";
      details.category = "Browser";
    } else if (name.includes("apple-touch")) {
      details.purpose = "Apple Touch Icon";
      details.category = "Web App";
    } else if (name.includes("icon")) {
      details.purpose = "App Icon";
      details.category = "Application";
    } else if (name.includes("splash")) {
      details.purpose = "Splash Screen";
      details.category = "Launch Screen";
    }

    // Determine density from size
    const sizeMatch = iconSize.match(/(\d+)/);
    if (sizeMatch) {
      const size = parseInt(sizeMatch[1]);
      if (size >= 512) {
        details.density = "4x (XXXHDPI)";
      } else if (size >= 384) {
        details.density = "3x (XXHDPI)";
      } else if (size >= 256) {
        details.density = "2x (XHDPI)";
      } else if (size >= 192) {
        details.density = "1.5x (HDPI)";
      } else {
        details.density = "1x (MDPI)";
      }
    }

    return details;
  };

  const iconDetails = getIconDetails(icon.name, icon.size);
  const fileSizeKB = Math.round(icon.blob.size / 1024);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl font-bold text-gray-900">Icon Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Icon Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileImage className="w-5 h-5 text-sky-600" />
                Preview
              </h3>
              <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src={icon.url}
                    alt={icon.name}
                    width={200}
                    height={200}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 flex items-center justify-center border-2 border-dashed border-gray-200">
                  <Image
                    src={icon.url}
                    alt={`${icon.name} on white`}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Image
                    src={icon.url}
                    alt={`${icon.name} on dark`}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Preview on light and dark backgrounds
              </p>
            </div>

            {/* Icon Specifications */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" />
                Specifications
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">File Name:</dt>
                      <dd className="text-sm font-medium text-gray-900 font-mono">
                        {icon.name}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Dimensions:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {icon.size}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">File Size:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {fileSizeKB} KB
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Format:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {iconDetails.format}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-sky-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-sky-600" />
                    Platform Details
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Platform:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {iconDetails.platform}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Purpose:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {iconDetails.purpose}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Category:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {iconDetails.category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Density:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {iconDetails.density}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Usage Guidelines */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Usage Guidelines</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    {iconDetails.platform === "Android" && (
                      <>
                        <p>• Place in res/mipmap or res/drawable folder</p>
                        <p>• Use for app launcher icons</p>
                        <p>• Supports adaptive icon format</p>
                      </>
                    )}
                    {iconDetails.platform === "iOS" && (
                      <>
                        <p>• Add to Xcode project assets catalog</p>
                        <p>• Required for App Store submission</p>
                        <p>• No transparency allowed for app icons</p>
                      </>
                    )}
                    {iconDetails.platform === "Web" && (
                      <>
                        <p>• Link in HTML head section</p>
                        <p>• Used by browsers and PWAs</p>
                        <p>• Supports transparency</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="text-sm text-gray-600">
            Optimized for {iconDetails.platform} • {iconDetails.purpose}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDownload(icon);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
