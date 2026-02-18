import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export interface TextLogoOptions {
  text: string;
  fontFamily: "sans-serif" | "serif" | "monospace";
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  shape: "square" | "rounded" | "circle";
  bold: boolean;
  italic: boolean;
}

const DEFAULT_OPTIONS: TextLogoOptions = {
  text: "",
  fontFamily: "sans-serif",
  fontSize: 120,
  textColor: "#ffffff",
  backgroundColor: "#18181b",
  shape: "rounded",
  bold: true,
  italic: false,
};

async function generateTextLogo(
  options: TextLogoOptions
): Promise<{ url: string }> {
  const response = await fetch("/api/generate-text-logo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate text logo");
  }

  return response.json();
}

export function useTextLogo() {
  const [options, setOptions] = useState<TextLogoOptions>(DEFAULT_OPTIONS);

  const mutation = useMutation({
    mutationFn: generateTextLogo,
  });

  const updateOption = <K extends keyof TextLogoOptions>(
    key: K,
    value: TextLogoOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const createLogo = async (): Promise<File | null> => {
    if (!options.text.trim()) return null;

    const result = await mutation.mutateAsync(options);

    // Convert data URL to File
    const res = await fetch(result.url);
    const blob = await res.blob();
    const file = new File([blob], "text-logo.png", { type: "image/png" });
    return file;
  };

  const resetOptions = () => {
    setOptions(DEFAULT_OPTIONS);
    mutation.reset();
  };

  return {
    options,
    updateOption,
    createLogo,
    resetOptions,
    isGenerating: mutation.isPending,
    error: mutation.error?.message ?? null,
    previewUrl: mutation.data?.url ?? null,
  };
}
