"use client";

import { useEffect, useRef } from "react";
import {
  HeroSection,
  FileUploadArea,
  GeneratedIconsDisplay,
  FeaturesSection,
  ContributorsSection,
  HowItWorksSection,
  ComprehensiveGuideSection,
  TechnicalSpecificationsSection,
  AppStoreOptimizationSection,
  useFileUpload,
  useContributors,
  useIconGeneration,
} from "./_components";

export default function HomePage() {
  // Use custom hooks for separated concerns
  const {
    uploadedFile,
    error,
    isDragOver,
    isPasteReady,
    backgroundColor,
    colorAnalysis,
    isAnalyzingColors,
    setBackgroundColor,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handlePaste,
    handleKeyDown,
    handleUploadAreaFocus,
    handleUploadAreaBlur,
  } = useFileUpload();

  const {
    contributors,
    isLoadingContributors,
    contributorsError,
    fetchContributors,
  } = useContributors();

  const {
    isGenerating,
    generatedIcons,
    error: iconError,
    setError: setIconError,
    generateIcons,
    downloadIcon,
    downloadAllIcons,
    clearGeneratedIcons,
  } = useIconGeneration();

  // Track the previous uploaded file to avoid infinite re-renders
  const previousFileRef = useRef<string | null>(null);

  // Set up event listeners for paste functionality
  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePaste, handleKeyDown]);

  // Fetch contributors on component mount
  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  // Clear generated icons when new file is uploaded
  useEffect(() => {
    const currentFileKey = uploadedFile
      ? `${uploadedFile.file.name}-${uploadedFile.file.lastModified}`
      : null;

    if (currentFileKey && currentFileKey !== previousFileRef.current) {
      clearGeneratedIcons();
      setIconError(null);
      previousFileRef.current = currentFileKey;
    }
  }, [uploadedFile, clearGeneratedIcons, setIconError]);

  // Handle icon generation
  const handleGenerateIcons = async () => {
    if (!uploadedFile) return;
    await generateIcons(uploadedFile.file, backgroundColor);
  };

  // Combine errors from different hooks
  const displayError = error || iconError;

  console.log(
    `🚀 ~ page.tsx:66 ~ HomePage ~ backgroundColor:`,
    backgroundColor
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto">
          <FileUploadArea
            uploadedFile={uploadedFile}
            isGenerating={isGenerating}
            isDragOver={isDragOver}
            isPasteReady={isPasteReady}
            error={displayError}
            backgroundColor={backgroundColor}
            colorAnalysis={colorAnalysis}
            isAnalyzingColors={isAnalyzingColors}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileInputChange={handleFileInputChange}
            onUploadAreaFocus={handleUploadAreaFocus}
            onUploadAreaBlur={handleUploadAreaBlur}
            onBackgroundColorChange={setBackgroundColor}
            onGenerateIcons={handleGenerateIcons}
          />

          {/* Generated Icons Section */}
          <GeneratedIconsDisplay
            generatedIcons={generatedIcons}
            onDownloadIcon={downloadIcon}
            onDownloadAllIcons={downloadAllIcons}
          />
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* Contributors Section */}
        <ContributorsSection
          contributors={contributors}
          isLoadingContributors={isLoadingContributors}
          contributorsError={contributorsError}
        />

        {/* Instructions Section */}
        <HowItWorksSection />

        {/* Comprehensive Guide Section */}
        <ComprehensiveGuideSection />

        {/* Technical Specifications */}
        <TechnicalSpecificationsSection />

        {/* App Store Optimization Section */}
        <AppStoreOptimizationSection />
      </div>
    </div>
  );
}
