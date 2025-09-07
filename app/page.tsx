"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Upload,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Users,
  ExternalLink,
  Smartphone,
  Palette,
  Zap,
  ArrowRight,
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

// Types for color analysis
interface ColorAnalysis {
  suggestedBackgroundColor: string;
  dominantColors: string[];
  hasTransparency: boolean;
  edgeColors: string[];
  reasoning: string;
}

// Types for contributors
interface Contributor {
  username: string;
  name: string | null;
  avatar_url: string;
  profile_url: string;
  contributions: number;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
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
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [colorAnalysis, setColorAnalysis] = useState<ColorAnalysis | null>(
    null
  );
  const [isAnalyzingColors, setIsAnalyzingColors] = useState(false);

  console.log(
    `🚀 ~ page.tsx:66 ~ HomePage ~ backgroundColor:`,
    backgroundColor
  );

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoadingContributors, setIsLoadingContributors] = useState(false);
  const [contributorsError, setContributorsError] = useState<string | null>(
    null
  );
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

  // Analyze image colors to suggest background color
  const analyzeImageColors = async (file: File) => {
    setIsAnalyzingColors(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze-image-colors", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image colors");
      }

      const analysis: ColorAnalysis = await response.json();
      setColorAnalysis(analysis);
      setBackgroundColor(analysis.suggestedBackgroundColor);

      console.log("Color analysis result:", analysis);
    } catch (err) {
      console.warn("Failed to analyze image colors:", err);
      // Keep default white background if analysis fails
      setColorAnalysis(null);
    } finally {
      setIsAnalyzingColors(false);
    }
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
    setColorAnalysis(null); // Clear previous color analysis
    setBackgroundColor("#ffffff"); // Reset to default while analyzing

    // Analyze image colors to suggest background color
    analyzeImageColors(file);
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
      formData.append("backgroundColor", backgroundColor);

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

  // Fetch contributors from API
  const fetchContributors = useCallback(async () => {
    setIsLoadingContributors(true);
    setContributorsError(null);

    try {
      const response = await fetch("/api/contributors");

      if (!response.ok) {
        throw new Error("Failed to fetch contributors");
      }

      const data = await response.json();
      setContributors(data.contributors || []);
    } catch (err) {
      setContributorsError(
        err instanceof Error ? err.message : "Failed to load contributors"
      );
    } finally {
      setIsLoadingContributors(false);
    }
  }, []);

  // Fetch contributors on component mount
  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

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
                    <div
                      className="w-32 h-32 rounded-lg shadow-md flex items-center justify-center p-4"
                      style={{ backgroundColor }}
                    >
                      <Image
                        src={uploadedFile.preview}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="max-w-20 max-h-20 object-contain"
                      />
                    </div>
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
                      setColorAnalysis(null);
                      setBackgroundColor("#ffffff");
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

            {/* Background Color Picker */}
            {uploadedFile && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Icon Background Color
                  </h3>
                  {isAnalyzingColors && (
                    <div className="flex items-center gap-2 text-sm text-sky-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing colors...
                    </div>
                  )}
                </div>

                {colorAnalysis && (
                  <div className="mb-4 p-3 bg-sky-50 border border-sky-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-sky-600" />
                      <span className="text-sm font-medium text-sky-800">
                        Smart Color Suggestion
                      </span>
                    </div>
                    <p className="text-sm text-sky-700 mb-2">
                      {colorAnalysis.reasoning}
                    </p>
                    {colorAnalysis.hasTransparency && (
                      <p className="text-xs text-sky-600">
                        ✓ Transparency detected in image
                      </p>
                    )}
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-4">
                  Choose a background color for your app icon. This will be
                  applied to icon.png with your image centered and smaller (70%
                  size) as a square background.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="backgroundColor"
                        className="text-sm font-medium text-gray-700"
                      >
                        Background Color:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="backgroundColor"
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Preview:</span>
                      <div
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor }}
                      />
                    </div>
                  </div>

                  {/* Detected Colors */}
                  {colorAnalysis && colorAnalysis.dominantColors.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 mb-2 block">
                        Detected Colors:
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          ...new Set([
                            colorAnalysis.suggestedBackgroundColor,
                            ...colorAnalysis.dominantColors,
                            ...colorAnalysis.edgeColors,
                          ]),
                        ]
                          .slice(0, 8)
                          .map((color, index) => (
                            <button
                              key={`detected-${color}-${index}`}
                              onClick={() => setBackgroundColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                backgroundColor === color
                                  ? "border-sky-500 ring-2 ring-sky-200"
                                  : "border-gray-300 hover:border-gray-400"
                              } ${
                                color === colorAnalysis.suggestedBackgroundColor
                                  ? "ring-2 ring-green-300"
                                  : ""
                              }`}
                              style={{ backgroundColor: color }}
                              title={
                                color === colorAnalysis.suggestedBackgroundColor
                                  ? "Suggested color"
                                  : `Detected color: ${color}`
                              }
                            />
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Preset Colors */}
                  <div>
                    <span className="text-sm font-medium text-gray-700 mb-2 block">
                      Quick Presets:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { color: "#ffffff", name: "White" },
                        { color: "#000000", name: "Black" },
                        { color: "#3b82f6", name: "Blue" },
                        { color: "#ef4444", name: "Red" },
                        { color: "#10b981", name: "Green" },
                        { color: "#f59e0b", name: "Orange" },
                        { color: "#8b5cf6", name: "Purple" },
                        { color: "#06b6d4", name: "Cyan" },
                      ].map((preset) => (
                        <button
                          key={preset.color}
                          onClick={() => setBackgroundColor(preset.color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                            backgroundColor === preset.color
                              ? "border-sky-500 ring-2 ring-sky-200"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: preset.color }}
                          title={preset.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
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

        {/* Contributors Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-sky-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Meet Our Contributors
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The amazing developers who make Expo Icon Generator possible
              through their contributions and dedication.
            </p>
          </div>

          {isLoadingContributors ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading contributors...</span>
              </div>
            </div>
          ) : contributorsError ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="text-red-700 font-medium mb-2">
                  Failed to load contributors
                </p>
                <p className="text-red-600 text-sm mb-4">{contributorsError}</p>
                <button
                  onClick={fetchContributors}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : contributors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {contributors.slice(0, 3).map((contributor) => (
                  <div
                    key={contributor.username}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={contributor.avatar_url}
                        alt={`${
                          contributor.name || contributor.username
                        } avatar`}
                        width={64}
                        height={64}
                        className="rounded-full border-2 border-sky-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/default-avatar.png";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {contributor.name || contributor.username}
                        </h3>
                        <p className="text-sky-600 font-medium">
                          @{contributor.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {contributor.contributions} contribution
                          {contributor.contributions !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {contributor.bio && (
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {contributor.bio}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {contributor.location && (
                          <span>📍 {contributor.location}</span>
                        )}
                        {contributor.public_repos > 0 && (
                          <span>📚 {contributor.public_repos} repos</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/contributors/${contributor.username}`}
                          className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors text-sm font-medium"
                        >
                          View Profile
                        </Link>
                        <Link
                          href={contributor.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-400 hover:text-sky-600 transition-colors"
                          aria-label={`Visit ${contributor.username}'s GitHub profile`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/contributors"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  View All Contributors
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No contributors found</p>
            </div>
          )}
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

        {/* Comprehensive Guide Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complete Icon Generation Guide
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Platform Requirements
              </h3>
              <p className="text-gray-600 mb-4">
                Understanding iOS and Android icon specifications is crucial for
                app store approval. iOS requires 1024×1024px icons without
                transparency, while Android uses adaptive icons with foreground
                and background layers.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• iOS: 1024×1024px, no transparency</li>
                <li>• Android: Adaptive icons with safe zones</li>
                <li>• Web: Multiple sizes for PWA support</li>
                <li>• Apple Watch: Various sizes up to 108×108px</li>
              </ul>
              <Link
                href="/blog/ios-android-icon-requirements-2024"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Design Best Practices
              </h3>
              <p className="text-gray-600 mb-4">
                Creating effective app icons requires understanding design
                principles, color theory, and user psychology. Your icon should
                be simple, memorable, and work across all sizes and backgrounds.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Simple, recognizable design</li>
                <li>• High contrast for visibility</li>
                <li>• Consistent brand identity</li>
                <li>• Test at smallest sizes (29×29px)</li>
              </ul>
              <Link
                href="/blog/icon-design-best-practices"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Design Guide →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Automation & Workflow
              </h3>
              <p className="text-gray-600 mb-4">
                Streamline your development process with automated icon
                generation. Integrate with CI/CD pipelines, maintain consistency
                across updates, and save hours of manual work with proper
                tooling.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Automated CI/CD integration</li>
                <li>• Batch processing capabilities</li>
                <li>• Version control best practices</li>
                <li>• Quality assurance workflows</li>
              </ul>
              <Link
                href="/blog/automated-icon-generation-workflow"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Automation Guide →
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="max-w-6xl mx-auto mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Technical Specifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Generated Icon Formats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">adaptive-icon.png</span>
                  <span className="text-sm text-gray-600">1024×1024px</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">icon.png</span>
                  <span className="text-sm text-gray-600">1024×1024px</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">splash-icon.png</span>
                  <span className="text-sm text-gray-600">1024×1024px</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">favicon.png</span>
                  <span className="text-sm text-gray-600">48×48px</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Multi-density icons</span>
                  <span className="text-sm text-gray-600">@1x, @2x, @3x</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Supported Input Formats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>PNG (Recommended for best quality)</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>JPG/JPEG (Good for photographs)</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>SVG (Vector graphics, scalable)</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Maximum file size: 10MB</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Recommended: 1024×1024px or larger</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Store Optimization Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            App Store Optimization (ASO)
          </h2>
          <p className="text-lg mb-8 text-center opacity-90">
            Your app icon is the first thing users see. Make it count with these
            proven strategies that can increase your download rates by up to
            30%.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Icon Impact Statistics</h3>
              <ul className="space-y-2 text-sm">
                <li>• 73% of users judge app quality by icon design</li>
                <li>• Professional icons increase retention by 25%</li>
                <li>• Consistent branding improves recognition by 40%</li>
                <li>• A/B testing icons can boost downloads by 20-30%</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Optimization Checklist</h3>
              <ul className="space-y-2 text-sm">
                <li>• Test on different backgrounds and themes</li>
                <li>• Ensure visibility at small sizes</li>
                <li>• Maintain brand consistency across platforms</li>
                <li>• Consider cultural differences for global apps</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog/app-store-optimization-icons"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Learn ASO Strategies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
