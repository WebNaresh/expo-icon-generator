import { useState, useCallback } from "react";
import JSZip from "jszip";
import { GeneratedIcon } from "./types";

export function useIconGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<GeneratedIcon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastDownloadType, setLastDownloadType] = useState<string>("");

  // Generate icons
  const generateIcons = useCallback(async (
    file: File,
    backgroundColor: string,
    splashEnabled: boolean = false,
    splashBackgroundColor: string = "#ffffff"
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("backgroundColor", backgroundColor);
      formData.append("generateSplash", String(splashEnabled));
      formData.append("splashBackgroundColor", splashBackgroundColor);

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
  }, []);

  // Download single icon
  const downloadIcon = useCallback(async (icon: GeneratedIcon) => {
    try {
      // If we have a blob, use it directly
      if (icon.blob) {
        const url = URL.createObjectURL(icon.blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = icon.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // If no blob, download from URL
        const link = document.createElement("a");
        link.href = icon.url;
        link.download = icon.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Show feedback modal after download
      setLastDownloadType(`icon: ${icon.name}`);
      setTimeout(() => setShowFeedbackModal(true), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download icon");
    }
  }, []);

  // Download all icons as ZIP (with optional app.json)
  const downloadAllIcons = useCallback(async (appJsonContent?: string) => {
    try {
      const zip = new JSZip();

      // Add each icon to the zip
      generatedIcons.forEach((icon) => {
        if (icon.url.startsWith("data:")) {
          const base64Data = icon.url.split(",")[1];
          zip.file(icon.name, base64Data, { base64: true });
        } else if (icon.blob) {
          zip.file(icon.name, icon.blob);
        }
      });

      // Add app.json if provided
      if (appJsonContent) {
        zip.file("app.json", appJsonContent);
      }

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "expo-icons.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show feedback modal after download
      setLastDownloadType("all icons (ZIP)");
      setTimeout(() => setShowFeedbackModal(true), 500);
    } catch (err) {
      console.error("Failed to generate zip", err);
      setError(err instanceof Error ? err.message : "Failed to download icons");
    }
  }, [generatedIcons]);

  // Clear generated icons
  const clearGeneratedIcons = useCallback(() => {
    setGeneratedIcons([]);
  }, []);

  // Feedback modal controls
  const closeFeedbackModal = useCallback(() => {
    setShowFeedbackModal(false);
    setLastDownloadType("");
  }, []);

  return {
    isGenerating,
    generatedIcons,
    error,
    setError,
    generateIcons,
    downloadIcon,
    downloadAllIcons,
    clearGeneratedIcons,
    showFeedbackModal,
    lastDownloadType,
    closeFeedbackModal,
  };
}
