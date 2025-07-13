"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

import {
  Upload,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

// Types for our icon generation
interface GeneratedIcon {
  name: string;
  size: string;
  url: string;
  blob: Blob;
}

interface UploadedFile {
  file: File;
  preview: string;
}

// Accepted file types
const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function HomePage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<GeneratedIcon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPasteReady, setIsPasteReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  // File validation
  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "Please upload a PNG, JPG, JPEG, or SVG image file.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 10MB.";
    }
    return null;
  };

  // Handle file upload
  const handleFileUpload = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const preview = URL.createObjectURL(file);
    setUploadedFile({ file, preview });
    setGeneratedIcons([]); // Clear previous results
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  // File input change handler
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  // Handle clipboard paste
  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      e.preventDefault();

      if (!e.clipboardData) {
        setError("Clipboard access not available");
        return;
      }

      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith("image/"));

      if (!imageItem) {
        setError(
          "No image found in clipboard. Please copy an image and try again."
        );
        return;
      }

      const file = imageItem.getAsFile();
      if (!file) {
        setError("Failed to read image from clipboard");
        return;
      }

      // Create a proper File object with a name
      const properFile = new File(
        [file],
        `pasted-image.${file.type.split("/")[1]}`,
        {
          type: file.type,
          lastModified: Date.now(),
        }
      );

      handleFileUpload(properFile);
    },
    [handleFileUpload]
  );

  // Handle keyboard events for paste
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Check for Ctrl+V (Windows/Linux) or Cmd+V (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        // Only handle paste if no input is focused
        const activeElement = document.activeElement;
        const isInputFocused =
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            (activeElement as HTMLElement).contentEditable === "true");

        if (!isInputFocused) {
          e.preventDefault();
          // Trigger paste event manually using modern Clipboard API
          navigator.clipboard
            .read()
            .then(async (clipboardItems) => {
              for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                  if (type.startsWith("image/")) {
                    const blob = await clipboardItem.getType(type);
                    const file = new File(
                      [blob],
                      `pasted-image.${type.split("/")[1]}`,
                      {
                        type: type,
                        lastModified: Date.now(),
                      }
                    );
                    handleFileUpload(file);
                    return;
                  }
                }
              }
              setError(
                "No image found in clipboard. Please copy an image and try again."
              );
            })
            .catch(() => {
              setError(
                "Failed to access clipboard. Please try drag and drop instead."
              );
            });
        }
      }
    },
    [handleFileUpload]
  );

  // Focus management for paste functionality
  const handleUploadAreaFocus = useCallback(() => {
    setIsPasteReady(true);
  }, []);

  const handleUploadAreaBlur = useCallback(() => {
    setIsPasteReady(false);
  }, []);

  // Set up event listeners
  useEffect(() => {
    const uploadArea = uploadAreaRef.current;

    // Create wrapper function for paste event
    const pasteHandler = (e: Event) => {
      if (e instanceof ClipboardEvent) {
        handlePaste(e);
      }
    };

    if (uploadArea) {
      uploadArea.addEventListener("paste", pasteHandler);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (uploadArea) {
        uploadArea.removeEventListener("paste", pasteHandler);
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePaste, handleKeyDown]);

  // Generate icons
  const generateIcons = async () => {
    if (!uploadedFile) return;

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile.file);

      const response = await fetch("/api/generate-icons", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate icons");
      }

      const result = await response.json();
      setGeneratedIcons(result.icons);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while generating icons"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Download single icon
  const downloadIcon = (icon: GeneratedIcon) => {
    const link = document.createElement("a");
    link.href = icon.url;
    link.download = icon.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all icons as ZIP
  const downloadAllIcons = async () => {
    try {
      const response = await fetch("/api/download-icons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          icons: generatedIcons.map((icon) => ({
            name: icon.name,
            url: icon.url,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download icons");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "expo-icons.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download icons");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Expo Icon Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Automate and simplify icon generation for your Expo-based React
            Native apps. Generate platform-specific icons from a single source
            image with one command.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              iOS, Android & Web Icons
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Image Optimization
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Multiple Densities
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Automatic app.json Updates
            </span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto">
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
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFocus={handleUploadAreaFocus}
              onBlur={handleUploadAreaBlur}
              tabIndex={0}
              role="button"
              aria-label="Upload area - drag and drop files or press Ctrl+V to paste"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_FILE_TYPES.join(",")}
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Image
                      src={uploadedFile.preview}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="max-w-32 max-h-32 rounded-lg shadow-md object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">
                      ✓ {uploadedFile.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setGeneratedIcons([]);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Choose different image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files, or press{" "}
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                        Ctrl+V
                      </kbd>{" "}
                      to paste
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choose File
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Supports PNG, JPG, JPEG, SVG • Max 10MB • Paste from
                    clipboard
                  </p>
                </div>
              )}
            </div>

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
                  onClick={generateIcons}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg font-medium"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
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

          {/* Generated Icons Section */}
          {generatedIcons.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Generated Icons ({generatedIcons.length})
                </h2>
                <button
                  onClick={downloadAllIcons}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.url}
                        alt={icon.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900 mb-1">
                        {icon.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">{icon.size}</p>
                      <button
                        onClick={() => downloadIcon(icon)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded hover:bg-sky-200 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Expo Icon Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Multiple Formats
              </h3>
              <p className="text-gray-600">
                Generate icons for iOS, Android, and web platforms with proper
                sizing and optimization.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Optimized Output
              </h3>
              <p className="text-gray-600">
                Sharp scaling and image optimization ensure your icons look
                crisp on all devices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                One Command
              </h3>
              <p className="text-gray-600">
                Generate all required icon sizes with a single upload - no
                manual resizing needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Use
              </h3>
              <p className="text-gray-600">
                Download individual icons or get them all in a ZIP file, ready
                for your Expo project.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Upload Your Image
                </h3>
                <p className="text-gray-600">
                  Upload a high-quality PNG, JPG, JPEG, or SVG image
                  (recommended: 1024×1024px or larger).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Generate Icons
                </h3>
                <p className="text-gray-600">
                  Click &ldquo;Generate Icons&rdquo; and our tool will create
                  all the required sizes for your Expo app.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Download & Use
                </h3>
                <p className="text-gray-600">
                  Download individual icons or get them all in a ZIP file. Add
                  them to your Expo project and update your app.json.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
