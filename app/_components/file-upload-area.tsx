import React, { useRef, useState } from "react";

import {
  Upload,
  Clipboard,
  ImageIcon,
  AlertCircle,
  Pipette,
  RotateCcw,
} from "lucide-react";

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

interface FileUploadAreaProps {
  uploadedFile: UploadedFile | null;
  isGenerating: boolean;
  isDragOver: boolean;
  isPasteReady: boolean;
  error: string | null;
  backgroundColor: string;
  colorAnalysis: ColorAnalysis | null;
  isAnalyzingColors: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadAreaFocus: () => void;
  onUploadAreaBlur: () => void;
  onBackgroundColorChange: (color: string) => void;
  onGenerateIcons: () => void;
}

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];

export default function FileUploadArea({
  uploadedFile,
  isGenerating,
  isDragOver,
  isPasteReady,
  error,
  backgroundColor,
  colorAnalysis,
  isAnalyzingColors,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInputChange,
  onUploadAreaFocus,
  onUploadAreaBlur,
  onBackgroundColorChange,
  onGenerateIcons,
}: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);
  const [isEyedropperActive, setIsEyedropperActive] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Helper to convert RGB directly to Hex
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
    // Check if the native EyeDropper API is supported (Chrome/Edge/Opera)
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new (
          window as unknown as {
            EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> };
          }
        ).EyeDropper();
        const result = await eyeDropper.open();
        onBackgroundColorChange(result.sRGBHex);
        return; // Success, don't fallback to manual mode
      } catch (e) {
        console.log("Eyedropper cancelled or failed", e);
        // If cancelled, just return. If failed, maybe fallback?
        // Usually cancellation is intentional, so we stop here.
        return;
      }
    }

    // Fallback for browsers without EyeDropper API (Firefox/Safari)
    setIsEyedropperActive(!isEyedropperActive);
  };

  const pickColorFromImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEyedropperActive || !uploadedFile) return;

    const img = imageRef.current;
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    // Calculate click position relative to the natural image dimensions
    // Since we switch to object-contain, we need to account for potential letterboxing
    const rect = img.getBoundingClientRect();

    // Calculate the actual displayed size of the image within the element
    const scale = Math.min(
      rect.width / img.naturalWidth,
      rect.height / img.naturalHeight
    );
    const displayedWidth = img.naturalWidth * scale;
    const displayedHeight = img.naturalHeight * scale;

    // Offsets to center the image
    const offsetX = (rect.width - displayedWidth) / 2;
    const offsetY = (rect.height - displayedHeight) / 2;

    // Mouse coordinates relative to the image content
    const x = (e.clientX - rect.left - offsetX) / scale;
    const y = (e.clientY - rect.top - offsetY) / scale;

    // Check if click is within the actual image bounds
    if (x >= 0 && x <= img.naturalWidth && y >= 0 && y <= img.naturalHeight) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
      onBackgroundColorChange(hexColor);
      setIsEyedropperActive(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Upload Your Source Image
      </h2>

      {/* File Upload Area */}
      <div
        ref={uploadAreaRef}
        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragOver
            ? "border-sky-500 bg-sky-50"
            : uploadedFile
            ? "border-green-500 bg-green-50"
            : isPasteReady
            ? "border-sky-400 bg-sky-50"
            : "border-gray-300 hover:border-sky-400 hover:bg-sky-50"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onFocus={onUploadAreaFocus}
        onBlur={onUploadAreaBlur}
        tabIndex={0}
        role="button"
        aria-label="Upload area - drag and drop files or press Ctrl+V to paste"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES.join(",")}
          onChange={onFileInputChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        {uploadedFile ? (
          <div className="space-y-4">
            <div
              className={`mx-auto h-32 w-32 overflow-hidden rounded-lg shadow-lg transition-all ${
                isEyedropperActive
                  ? "cursor-crosshair ring-2 ring-sky-500 ring-offset-2"
                  : ""
              }`}
              onClick={pickColorFromImage}
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore - Next/Image is great but for raw pixel access standard img is easier with ref */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={uploadedFile.preview}
                alt="Uploaded preview"
                className={`h-full w-full ${
                  isEyedropperActive
                    ? "bg-gray-100 object-contain"
                    : "object-cover"
                }`}
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {uploadedFile.file.name}
              </p>
              <p className="text-sm text-gray-500">
                {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {isEyedropperActive && (
                <p className="mt-1 animate-pulse text-sm font-medium text-sky-600">
                  Click anywhere on the image to pick a color
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              {isDragOver ? (
                <Upload className="h-8 w-8 text-sky-500" />
              ) : isPasteReady ? (
                <Clipboard className="h-8 w-8 text-sky-500" />
              ) : (
                <ImageIcon className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <p className="mb-2 text-lg font-medium text-gray-900">
                {isDragOver
                  ? "Drop your image here"
                  : isPasteReady
                  ? "Press Ctrl+V to paste image"
                  : "Upload your source image"}
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop, click to browse, or paste from clipboard
              </p>
              <p className="mt-2 text-xs text-gray-400">
                PNG, JPG, JPEG, SVG • Max 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Background Color Picker */}
      {uploadedFile && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Background Color (for icon.png):
            </label>
            {isAnalyzingColors && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-sky-500 border-t-transparent"></div>
                Analyzing colors...
              </div>
            )}
          </div>

          {colorAnalysis && (
            <div className="mb-4 rounded-lg border bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  <strong>Smart suggestion:</strong> {colorAnalysis.reasoning}
                </p>
                {backgroundColor !== colorAnalysis.suggestedBackgroundColor && (
                  <button
                    onClick={() =>
                      onBackgroundColorChange(
                        colorAnalysis.suggestedBackgroundColor
                      )
                    }
                    className="flex shrink-0 items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50"
                    title="Reset to suggested color"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset to suggested
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "#ffffff",
                  ...colorAnalysis.dominantColors,
                  ...colorAnalysis.edgeColors,
                ]
                  .filter((color, index, self) => self.indexOf(color) === index)
                  .slice(0, 7)
                  .map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded border-2 transition-all ${
                        backgroundColor === color
                          ? "scale-110 border-sky-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => onBackgroundColorChange(color)}
                      title={`Use ${color}`}
                    />
                  ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
              placeholder="#ffffff"
            />
            <button
              onClick={handleEyedropperClick}
              className={`rounded-md border p-2 transition-colors ${
                isEyedropperActive
                  ? "border-sky-500 bg-sky-100 text-sky-600"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              title="Pick color from image"
            >
              <Pipette className="h-5 w-5" />
            </button>
          </div>
          {/* Live Icon Preview */}
          <div className="mt-4 flex flex-col items-center">
            <p className="mb-2 text-xs font-medium text-gray-600">
              Icon Preview{" "}
              <span className="font-mono text-gray-400">
                {backgroundColor}
              </span>
            </p>
            <div
              className="flex items-center justify-center rounded-2xl shadow-md"
              style={{
                backgroundColor,
                width: 200,
                height: 200,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploadedFile.preview}
                alt="Icon preview"
                className="object-contain"
                style={{ width: "70%", height: "70%" }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              This is how your icon.png will look
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Generate Button */}
      {uploadedFile && (
        <div className="mt-6 text-center">
          <button
            onClick={onGenerateIcons}
            disabled={isGenerating}
            className="inline-flex items-center gap-3 rounded-lg bg-sky-600 px-8 py-3 font-medium text-white transition-colors hover:bg-sky-700 disabled:bg-gray-400"
          >
            {isGenerating ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Generating Icons...
              </>
            ) : (
              <>
                <ImageIcon className="h-5 w-5" />
                Generate Icons
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
