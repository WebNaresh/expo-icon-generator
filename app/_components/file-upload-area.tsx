import React, { useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Upload,
  Clipboard,
  ImageIcon,
  AlertCircle,
  Pipette,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - EyeDropper is not yet in standard types
        const eyeDropper = new (window as any).EyeDropper();
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
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Upload Your Source Image
      </h2>

      {/* File Upload Area */}
      <div
        ref={uploadAreaRef}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragOver
            ? "border-sky-500 bg-sky-50"
            : uploadedFile
            ? "border-green-500 bg-green-50"
            : isPasteReady
            ? "border-sky-400 bg-sky-25"
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
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {uploadedFile ? (
          <div className="space-y-4">
            <div
              className={`w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-lg transition-all ${
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
                className={`w-full h-full ${
                  isEyedropperActive
                    ? "object-contain bg-gray-100"
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
                <p className="text-sky-600 text-sm font-medium mt-1 animate-pulse">
                  Click anywhere on the image to pick a color
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              {isDragOver ? (
                <Upload className="w-8 h-8 text-sky-500" />
              ) : isPasteReady ? (
                <Clipboard className="w-8 h-8 text-sky-500" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragOver
                  ? "Drop your image here"
                  : isPasteReady
                  ? "Press Ctrl+V to paste image"
                  : "Upload your source image"}
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop, click to browse, or paste from clipboard
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, JPEG, SVG • Max 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Background Color Picker */}
      {uploadedFile && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">
              Background Color (for icon.png):
            </label>
            {isAnalyzingColors && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                Analyzing colors...
              </div>
            )}
          </div>

          {colorAnalysis && (
            <div className="mb-4 p-3 bg-white rounded-lg border">
              <p className="text-xs text-gray-600 mb-2">
                <strong>Smart suggestion:</strong> {colorAnalysis.reasoning}
              </p>
              <div className="flex flex-wrap gap-2">
                {[...colorAnalysis.dominantColors, ...colorAnalysis.edgeColors]
                  .filter((color, index, self) => self.indexOf(color) === index)
                  .slice(0, 6)
                  .map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded border-2 transition-all ${
                        backgroundColor === color
                          ? "border-sky-500 scale-110"
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
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
              placeholder="#ffffff"
            />
            <button
              onClick={handleEyedropperClick}
              className={`p-2 rounded-md border transition-colors ${
                isEyedropperActive
                  ? "bg-sky-100 border-sky-500 text-sky-600"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
              title="Pick color from image"
            >
              <Pipette className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This background color will be used for the main app icon (icon.png)
            with your image centered and sized at 70%.
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Generate Button */}
      {uploadedFile && (
        <div className="mt-6 text-center">
          <button
            onClick={onGenerateIcons}
            disabled={isGenerating}
            className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Icons...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Generate Icons
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
