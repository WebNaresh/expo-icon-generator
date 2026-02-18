"use client";

import React, { useState } from "react";
import { Copy, Download, Check, FileJson } from "lucide-react";

interface AppJsonPreviewProps {
  backgroundColor: string;
  splashBackgroundColor: string;
  splashEnabled: boolean;
}

function buildAppJson(
  backgroundColor: string,
  splashBackgroundColor: string,
  splashEnabled: boolean
) {
  const config: Record<string, unknown> = {
    expo: {
      icon: "./assets/icon.png",
      ...(splashEnabled
        ? {
            splash: {
              image: "./assets/splash.png",
              resizeMode: "contain",
              backgroundColor: splashBackgroundColor,
            },
          }
        : {}),
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: backgroundColor,
        },
      },
      web: {
        favicon: "./assets/favicon.png",
      },
    },
  };

  return JSON.stringify(config, null, 2);
}

export default function AppJsonPreview({
  backgroundColor,
  splashBackgroundColor,
  splashEnabled,
}: AppJsonPreviewProps) {
  const [copied, setCopied] = useState(false);

  const jsonContent = buildAppJson(
    backgroundColor,
    splashBackgroundColor,
    splashEnabled
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "app.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileJson className="h-5 w-5 text-gray-400" />
          <h4 className="text-lg font-semibold text-white">
            app.json Configuration
          </h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-gray-300" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      <p className="mb-3 text-xs text-gray-500">
        Add this to your Expo project&apos;s app.json to configure icons and
        splash screen.
      </p>

      <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-100">
        <code>{jsonContent}</code>
      </pre>
    </div>
  );
}
