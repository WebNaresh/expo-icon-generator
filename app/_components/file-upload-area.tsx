import React, { useRef, useState } from "react";
import { Upload, Clipboard, ImageIcon, Type } from "lucide-react";
import TextLogoCreator from "./text-logo-creator";

interface UploadedFile {
  file: File;
  preview: string;
}

type InputTab = "upload" | "text-logo";

interface FileUploadAreaProps {
  uploadedFile: UploadedFile | null;
  isDragOver: boolean;
  isPasteReady: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadAreaFocus: () => void;
  onUploadAreaBlur: () => void;
  onTextLogoCreated: (file: File) => void;
}

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];

export default function FileUploadArea({
  uploadedFile,
  isDragOver,
  isPasteReady,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInputChange,
  onUploadAreaFocus,
  onUploadAreaBlur,
  onTextLogoCreated,
}: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<InputTab>("upload");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
      {/* macOS-style title bar */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Tab switcher — top right */}
        <div className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800 p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("upload")}
            className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "upload"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <ImageIcon className="h-3 w-3" />
            Upload
          </button>
          <button
            onClick={() => setActiveTab("text-logo")}
            className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "text-logo"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Type className="h-3 w-3" />
            Text Logo
            {/* Attention dot for inactive state */}
            {activeTab !== "text-logo" && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-white">
                <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-40" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Window body — fixed height so tabs don't shift */}
      <div className="h-107.5 overflow-y-auto bg-gray-900 p-5">
        {activeTab === "text-logo" ? (
          <TextLogoCreator onLogoCreated={onTextLogoCreated} />
        ) : (
          <div
            ref={uploadAreaRef}
            className={`relative flex h-full items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-all ${
              isDragOver
                ? "border-gray-500 bg-gray-800"
                : uploadedFile
                ? "border-gray-700 bg-gray-800/50"
                : isPasteReady
                ? "border-gray-500 bg-gray-800"
                : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
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
              <div className="space-y-3">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedFile.preview}
                    alt="Uploaded preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    <span className="mx-1.5">·</span>
                    Click or drop to replace
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-800">
                  {isDragOver ? (
                    <Upload className="h-6 w-6 text-gray-500" />
                  ) : isPasteReady ? (
                    <Clipboard className="h-6 w-6 text-gray-500" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {isDragOver
                      ? "Drop your image here"
                      : isPasteReady
                      ? "Press Ctrl+V to paste"
                      : "Drop your image here"}
                  </p>
                  <p className="mt-1.5 text-xs text-gray-500">
                    PNG, JPG, SVG · Max 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
