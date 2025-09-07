import React, { useCallback, useState } from "react";

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

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPasteReady, setIsPasteReady] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [colorAnalysis, setColorAnalysis] = useState<ColorAnalysis | null>(null);
  const [isAnalyzingColors, setIsAnalyzingColors] = useState(false);

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
                        type,
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

  return {
    uploadedFile,
    error,
    isDragOver,
    isPasteReady,
    backgroundColor,
    colorAnalysis,
    isAnalyzingColors,
    setBackgroundColor,
    setError,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handlePaste,
    handleKeyDown,
    handleUploadAreaFocus,
    handleUploadAreaBlur,
  };
}
