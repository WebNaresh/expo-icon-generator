import { useState, useCallback } from "react";

interface GeneratedIcon {
  name: string;
  size: string;
  url: string;
  blob: Blob;
}

export function useIconGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<GeneratedIcon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastDownloadType, setLastDownloadType] = useState<string>("");

  // Generate icons
  const generateIcons = useCallback(async (file: File, backgroundColor: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
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
  }, []);

  // Download single icon
  const downloadIcon = useCallback((icon: GeneratedIcon) => {
    const link = document.createElement("a");
    link.href = icon.url;
    link.download = icon.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show feedback modal after download
    setLastDownloadType(`icon: ${icon.name}`);
    setTimeout(() => setShowFeedbackModal(true), 500);
  }, []);

  // Download all icons as ZIP
  const downloadAllIcons = useCallback(async () => {
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

      // Show feedback modal after download
      setLastDownloadType("all icons (ZIP)");
      setTimeout(() => setShowFeedbackModal(true), 500);
    } catch (err) {
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
