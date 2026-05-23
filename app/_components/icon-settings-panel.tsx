import React, { useRef, useState } from "react";
import { Pipette, RotateCcw, ImageIcon, Smartphone } from "lucide-react";

interface UploadedFile {
  file: File;
  preview: string;
}

interface ColorAnalysis {
  suggestedBackgroundColor: string;
  dominantColors: string[];
  hasTransparency: boolean;
  edgeColors: string[];
  reasoning: string;
}

interface IconSettingsPanelProps {
  uploadedFile: UploadedFile;
  isGenerating: boolean;
  backgroundColor: string;
  colorAnalysis: ColorAnalysis | null;
  isAnalyzingColors: boolean;
  splashEnabled: boolean;
  splashBackgroundColor: string;
  splashIconScale: number;
  splashResizeMode: "contain" | "cover";
  onBackgroundColorChange: (color: string) => void;
  onGenerateIcons: () => void;
  onSplashEnabledChange: (enabled: boolean) => void;
  onSplashBackgroundColorChange: (color: string) => void;
  onSplashIconScaleChange: (scale: number) => void;
  onSplashResizeModeChange: (mode: "contain" | "cover") => void;
}

export default function IconSettingsPanel({
  uploadedFile,
  isGenerating,
  backgroundColor,
  colorAnalysis,
  isAnalyzingColors,
  splashEnabled,
  splashBackgroundColor,
  splashIconScale,
  splashResizeMode,
  onBackgroundColorChange,
  onGenerateIcons,
  onSplashEnabledChange,
  onSplashBackgroundColorChange,
  onSplashIconScaleChange,
  onSplashResizeModeChange,
}: IconSettingsPanelProps) {
  const [isEyedropperActive, setIsEyedropperActive] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const handleEyedropperClick = async () => {
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new (
          window as unknown as {
            EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> };
          }
        ).EyeDropper();
        const result = await eyeDropper.open();
        onBackgroundColorChange(result.sRGBHex);
        return;
      } catch (e) {
        console.log("Eyedropper cancelled or failed", e);
        return;
      }
    }
    setIsEyedropperActive(!isEyedropperActive);
  };

  const pickColorFromImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEyedropperActive) return;
    const img = imageRef.current;
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    const rect = img.getBoundingClientRect();
    const scale = Math.min(
      rect.width / img.naturalWidth,
      rect.height / img.naturalHeight
    );
    const displayedWidth = img.naturalWidth * scale;
    const displayedHeight = img.naturalHeight * scale;
    const offsetX = (rect.width - displayedWidth) / 2;
    const offsetY = (rect.height - displayedHeight) / 2;
    const x = (e.clientX - rect.left - offsetX) / scale;
    const y = (e.clientY - rect.top - offsetY) / scale;

    if (x >= 0 && x <= img.naturalWidth && y >= 0 && y <= img.naturalHeight) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
      onBackgroundColorChange(hexColor);
      setIsEyedropperActive(false);
    }
  };

  const uniqueColors = colorAnalysis
    ? [
        "#ffffff",
        ...colorAnalysis.dominantColors,
        ...colorAnalysis.edgeColors,
      ]
        .filter((c, i, self) => self.indexOf(c) === i)
        .slice(0, 6)
    : [];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
      {/* Title bar — matches the upload window */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-medium text-gray-400">
          Configure & Generate
        </span>
        <div className="w-13" />
      </div>

      {/* Three-column content */}
      <div className="grid gap-0 divide-x divide-gray-800 md:grid-cols-[200px_1fr_1fr]">
        {/* Column 1: Live Icon Preview */}
        <div className="flex flex-col items-center justify-center gap-3 p-5">
          <div
            className={`flex items-center justify-center rounded-2xl border border-gray-700 shadow-sm transition-all ${
              isEyedropperActive ? "cursor-crosshair ring-2 ring-white" : ""
            }`}
            style={{ backgroundColor, width: 140, height: 140 }}
            onClick={pickColorFromImage}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={uploadedFile.preview}
              alt="Icon preview"
              className="object-contain"
              style={{ width: "70%", height: "70%" }}
              crossOrigin="anonymous"
            />
          </div>
          <span className="font-mono text-[10px] text-gray-400">
            1024 × 1024
          </span>
        </div>

        {/* Column 2: Background Color */}
        <div className="flex flex-col justify-center space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Background
            </h3>
            {isAnalyzingColors && (
              <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <span className="h-2 w-2 animate-spin rounded-full border border-gray-300 border-t-transparent" />
                Analyzing
              </span>
            )}
          </div>

          {/* Color swatches */}
          {uniqueColors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  className={`h-7 w-7 rounded-lg border transition-all ${
                    backgroundColor === color
                      ? "scale-110 border-white ring-1 ring-white ring-offset-1 ring-offset-gray-900"
                      : "border-gray-600 hover:scale-105 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onBackgroundColorChange(color)}
                  title={color}
                />
              ))}
              {colorAnalysis &&
                backgroundColor !==
                  colorAnalysis.suggestedBackgroundColor && (
                  <button
                    onClick={() =>
                      onBackgroundColorChange(
                        colorAnalysis.suggestedBackgroundColor
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800"
                    title="Reset to suggested"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                )}
            </div>
          )}

          {/* Hex input + eyedropper */}
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded-md border border-gray-700"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-gray-700 bg-gray-800 px-2.5 py-1.5 font-mono text-xs text-gray-300"
              placeholder="#ffffff"
            />
            <button
              onClick={handleEyedropperClick}
              className={`rounded-md border p-1.5 transition-colors ${
                isEyedropperActive
                  ? "border-white bg-white text-gray-900"
                  : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
              title="Pick color from image"
            >
              <Pipette className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Column 3: Splash Screen */}
        <div className="flex flex-col justify-center space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Splash Screen
            </h3>
            <button
              onClick={() => onSplashEnabledChange(!splashEnabled)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                splashEnabled ? "bg-white" : "bg-gray-700"
              }`}
              role="switch"
              aria-checked={splashEnabled}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full shadow-sm transition-transform ${splashEnabled ? "bg-gray-900" : "bg-gray-400"} ${
                  splashEnabled
                    ? "translate-x-[18px] translate-y-px"
                    : "translate-x-px translate-y-px"
                }`}
              />
            </button>
          </div>

          {splashEnabled ? (
            <>
              {/* Splash color picker */}
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400">Background Color</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={splashBackgroundColor}
                    onChange={(e) =>
                      onSplashBackgroundColorChange(e.target.value)
                    }
                    className="h-8 w-8 cursor-pointer rounded-md border border-gray-700 bg-transparent"
                  />
                  <input
                    type="text"
                    value={splashBackgroundColor}
                    onChange={(e) =>
                      onSplashBackgroundColorChange(e.target.value)
                    }
                    className="min-w-0 flex-1 rounded-md border border-gray-700 bg-gray-800 px-2.5 py-1.5 font-mono text-xs text-gray-300"
                  />
                </div>
              </div>

              {/* Splash Icon Scale Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Icon Scale</span>
                  <span className="font-mono text-white font-medium">
                    {splashIconScale}% ({Math.round(1284 * (splashIconScale / 100))}px)
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  value={splashIconScale}
                  onChange={(e) => onSplashIconScaleChange(Number(e.target.value))}
                  className="w-full h-1 bg-gray-800 rounded-lg cursor-pointer appearance-none accent-white"
                />
                <div className="flex gap-1">
                  {[
                    { label: "Small (20%)", val: 20 },
                    { label: "Med (35%)", val: 35 },
                    { label: "Large (45%)", val: 45 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => onSplashIconScaleChange(preset.val)}
                      className={`flex-1 rounded px-1 py-0.5 text-[9px] border transition-colors ${
                        splashIconScale === preset.val
                          ? "bg-white text-gray-900 border-white font-medium"
                          : "bg-gray-800 text-gray-400 border-gray-700 hover:text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resize Mode Selector */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-gray-400 block">Resize Mode</span>
                <div className="flex rounded-md bg-gray-950 p-0.5 border border-gray-800">
                  {(["contain", "cover"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => onSplashResizeModeChange(mode)}
                      className={`flex-1 rounded py-1 text-[10px] transition-all capitalize ${
                        splashResizeMode === mode
                          ? "bg-gray-800 text-white font-medium"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone mockup preview */}
              <div className="flex justify-center pt-2">
                <div
                  className="flex items-center justify-center rounded-[24px] border-[6px] border-gray-950 shadow-2xl relative overflow-hidden ring-1 ring-gray-800"
                  style={{
                    backgroundColor: splashBackgroundColor,
                    width: 120,
                    height: 213,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedFile.preview}
                    alt="Splash preview"
                    className={splashResizeMode === "contain" ? "object-contain" : "object-cover"}
                    style={{
                      width: splashResizeMode === "contain" ? `${splashIconScale}%` : "100%",
                      height: splashResizeMode === "contain" ? "auto" : "100%",
                      maxHeight: splashResizeMode === "contain" ? "100%" : "none",
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-4">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <p className="text-xs text-gray-400">
                Enable to generate a 1284×2778 splash screen
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Generate button — full width footer */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={onGenerateIcons}
          disabled={isGenerating}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500"
        >
          {isGenerating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="h-4 w-4" />
              Generate All Icons
            </>
          )}
        </button>
      </div>
    </div>
  );
}
