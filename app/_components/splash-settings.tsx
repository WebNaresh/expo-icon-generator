import React from "react";
import { Smartphone } from "lucide-react";

interface SplashSettingsProps {
  enabled: boolean;
  splashBackgroundColor: string;
  iconBackgroundColor: string;
  previewImageUrl: string;
  onEnabledChange: (enabled: boolean) => void;
  onSplashBackgroundColorChange: (color: string) => void;
}

export default function SplashSettings({
  enabled,
  splashBackgroundColor,
  iconBackgroundColor,
  previewImageUrl,
  onEnabledChange,
  onSplashBackgroundColorChange,
}: SplashSettingsProps) {
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">
            Splash Screen
          </label>
        </div>
        <button
          onClick={() => onEnabledChange(!enabled)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
            enabled ? "bg-gray-900" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={enabled}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {enabled && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-gray-500">
            Generates a 1284x2778 splash screen with your logo centered on the
            chosen background color.
          </p>

          {/* Splash Background Color */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Splash Background Color:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={splashBackgroundColor}
                onChange={(e) => onSplashBackgroundColorChange(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded border border-gray-300"
              />
              <input
                type="text"
                value={splashBackgroundColor}
                onChange={(e) => onSplashBackgroundColorChange(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
                placeholder="#ffffff"
              />
              {splashBackgroundColor !== iconBackgroundColor && (
                <button
                  onClick={() =>
                    onSplashBackgroundColorChange(iconBackgroundColor)
                  }
                  className="rounded-md border border-gray-300 px-2 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100"
                  title="Sync with icon background color"
                >
                  Sync
                </button>
              )}
            </div>
          </div>

          {/* Splash Preview */}
          <div className="flex flex-col items-center">
            <p className="mb-2 text-xs font-medium text-gray-600">
              Splash Preview
            </p>
            <div
              className="flex items-center justify-center rounded-2xl shadow-md"
              style={{
                backgroundColor: splashBackgroundColor,
                width: 120,
                height: 260,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImageUrl}
                alt="Splash preview"
                className="object-contain"
                style={{ width: "50%", height: "auto", maxHeight: "35%" }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              1284x2778px splash screen
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
