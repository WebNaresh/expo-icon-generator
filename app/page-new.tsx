"use client";

import { useEffect } from "react";
import HeroSection from "./_components/hero-section";
import FileUploadArea from "./_components/file-upload-area";
import GeneratedIconsDisplay from "./_components/generated-icons-display";
import FeaturesSection from "./_components/features-section";
import ContributorsSection from "./_components/contributors-section";
import HowItWorksSection from "./_components/how-it-works-section";
import ComprehensiveGuideSection from "./_components/comprehensive-guide-section";
import TechnicalSpecificationsSection from "./_components/technical-specifications-section";
import AppStoreOptimizationSection from "./_components/app-store-optimization-section";
import { useFileUpload } from "./_components/use-file-upload";
import { useContributors } from "./_components/use-contributors";
import { useIconGeneration } from "./_components/use-icon-generation";

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
    if (uploadedFile) {
      clearGeneratedIcons();
      setIconError(null);
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
            onFileUpload={handleFileUpload}
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
