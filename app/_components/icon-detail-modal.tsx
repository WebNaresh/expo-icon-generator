import React from "react";
import { Download, Info, FileImage, Ruler, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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

  // Calculate file size - use blob if available, otherwise estimate from data URL
  const fileSizeKB = icon.blob
    ? Math.round(icon.blob.size / 1024)
    : icon.url.startsWith("data:")
    ? Math.round((icon.url.length * 0.75) / 1024) // Base64 estimate
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Info className="h-6 w-6 text-sky-600" />
            Icon Details
          </DialogTitle>
          <DialogDescription>
            Detailed specifications and preview for {icon.name}
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Icon Preview */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <FileImage className="h-5 w-5 text-sky-600" />
              Preview
            </h3>
            <div className="flex items-center justify-center rounded-xl bg-gray-50 p-8">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.url}
                  alt={icon.name}
                  width={200}
                  height={200}
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                  onError={(e) => {
                    console.error(
                      `Modal: Failed to load image for ${icon.name}:`,
                      e
                    );
                  }}
                  onLoad={() => {
                    console.log(
                      `Modal: Successfully loaded image for ${icon.name}`
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.url}
                  alt={`${icon.name} on white`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-900 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.url}
                  alt={`${icon.name} on dark`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-center text-xs text-gray-500">
              Preview on light and dark backgrounds
            </p>
          </div>

          {/* Icon Specifications */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Ruler className="h-5 w-5 text-sky-600" />
              Specifications
            </h3>

            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 font-medium text-gray-900">
                  Basic Information
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">File Name:</dt>
                    <dd className="font-mono text-sm font-medium text-gray-900">
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
                      {fileSizeKB > 0 ? `${fileSizeKB} KB` : "N/A"}
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

              <div className="rounded-lg bg-sky-50 p-4">
                <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900">
                  <Palette className="h-4 w-4 text-sky-600" />
                  Platform Details
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Platform:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      <Badge variant="secondary">{iconDetails.platform}</Badge>
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
              <div className="rounded-lg bg-amber-50 p-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  Usage Guidelines
                </h4>
                <div className="space-y-1 text-xs text-gray-600">
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

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-600">
            Optimized for {iconDetails.platform} • {iconDetails.purpose}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onDownload(icon);
                onClose();
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
