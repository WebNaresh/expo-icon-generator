import React, { useRef, useCallback } from "react";
import { Upload, Clipboard, ImageIcon, AlertCircle } from "lucide-react";

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
  onFileUpload: (file: File) => void;
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
  onFileUpload,
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
            <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-lg">
              <img
                src={uploadedFile.preview}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {uploadedFile.file.name}
              </p>
              <p className="text-sm text-gray-500">
                {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
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
