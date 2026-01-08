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
  const generateIcons = useCallback(async (file: File, backgroundColor: string) => {
    console.log("🔥 [FRONTEND] Starting icon generation...");
    console.log("🔥 [FRONTEND] File:", {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString()
    });
    console.log("🔥 [FRONTEND] Background color:", backgroundColor);

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("backgroundColor", backgroundColor);

      console.log("🔥 [FRONTEND] Sending request to /api/generate-icons...");

      const response = await fetch("/api/generate-icons", {
        method: "POST",
        body: formData,
      });

      console.log("🔥 [FRONTEND] Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🔥 [FRONTEND] API error response:", errorText);
        throw new Error("Failed to generate icons");
      }

      const result = await response.json();
      console.log("🔥 [FRONTEND] API result:", {
        iconsCount: result.icons?.length,
        firstIconName: result.icons?.[0]?.name,
        firstIconUrlPrefix: result.icons?.[0]?.url?.substring(0, 100),
        firstIconUrlLength: result.icons?.[0]?.url?.length,
        firstIconSize: result.icons?.[0]?.size,
        hasBlob: !!result.icons?.[0]?.blob
      });

      // Log each icon's details
      result.icons?.forEach((icon: GeneratedIcon, index: number) => {
        console.log(`🔥 [FRONTEND] Icon ${index}:`, {
          name: icon.name,
          size: icon.size,
          urlLength: icon.url?.length,
          urlPrefix: icon.url?.substring(0, 50) + "...",
          isDataUrl: icon.url?.startsWith('data:'),
          mimeType: icon.url?.match(/data:([^;]+)/)?.[1],
          hasBase64: icon.url?.includes('base64,')
        });
      });

      setGeneratedIcons(result.icons);
      console.log("🔥 [FRONTEND] Icons set in state successfully!");

    } catch (err) {
      console.error("🔥 [FRONTEND] Error in generateIcons:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while generating icons"
      );
    } finally {
      setIsGenerating(false);
      console.log("🔥 [FRONTEND] Icon generation process completed");
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

  // Download all icons as ZIP
  const downloadAllIcons = useCallback(async () => {
    try {
      const zip = new JSZip();

      // Add each icon to the zip
      generatedIcons.forEach((icon) => {
        // If it's a data URL, we need to extract the base64 part
        if (icon.url.startsWith("data:")) {
          const base64Data = icon.url.split(",")[1];
          zip.file(icon.name, base64Data, { base64: true });
        } else if (icon.blob) {
          zip.file(icon.name, icon.blob);
        } else {
          // Fallback for non-data URLs if any (though currently all are data URLs or blobs)
          // This might need fetch if we had remote URLs, but for this app content is local
          // Attempt to fetch if it's a blob url that we don't have direct blob access to?
          // For now assuming data URI or blob is available.
          // actually the current generatedIcons usually have data urls.
          // Let's stick to the data url assumption based on previous code.
        }
      });

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
