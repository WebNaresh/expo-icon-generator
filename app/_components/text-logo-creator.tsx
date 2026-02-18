"use client";

import React from "react";
import { Type, Loader2 } from "lucide-react";
import { useTextLogo } from "./use-text-logo";

interface TextLogoCreatorProps {
  onLogoCreated: (file: File) => void;
}

const FONT_OPTIONS = [
  { value: "sans-serif" as const, label: "Sans Serif" },
  { value: "serif" as const, label: "Serif" },
  { value: "monospace" as const, label: "Monospace" },
];

const SHAPE_OPTIONS = [
  { value: "square" as const, label: "Square" },
  { value: "rounded" as const, label: "Rounded" },
  { value: "circle" as const, label: "Circle" },
];

export default function TextLogoCreator({
  onLogoCreated,
}: TextLogoCreatorProps) {
  const { options, updateOption, createLogo, isGenerating, error } =
    useTextLogo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = await createLogo();
    if (file) {
      onLogoCreated(file);
    }
  };

  // Live SVG preview
  const previewSize = 140;
  const fontWeight = options.bold ? "bold" : "normal";
  const fontStyle = options.italic ? "italic" : "normal";
  const scaledFontSize = (options.fontSize / 1024) * previewSize;

  const lines = (options.text || "Aa").split("\n").filter((l) => l.length > 0);
  const lineHeight = scaledFontSize * 1.2;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (previewSize - totalTextHeight) / 2 + scaledFontSize * 0.85;

  let clipPath = "";
  let clipAttr = "";
  if (options.shape === "circle") {
    clipPath = `<clipPath id="preview-shape"><circle cx="${previewSize / 2}" cy="${previewSize / 2}" r="${previewSize / 2}" /></clipPath>`;
    clipAttr = 'clip-path="url(#preview-shape)"';
  } else if (options.shape === "rounded") {
    clipPath = `<clipPath id="preview-shape"><rect x="0" y="0" width="${previewSize}" height="${previewSize}" rx="24" ry="24" /></clipPath>`;
    clipAttr = 'clip-path="url(#preview-shape)"';
  }

  const previewSvg = `<svg width="${previewSize}" height="${previewSize}" xmlns="http://www.w3.org/2000/svg">
    <defs>${clipPath}</defs>
    <rect width="${previewSize}" height="${previewSize}" fill="${options.backgroundColor}" ${clipAttr} />
    <g ${clipAttr}>
      ${lines
        .map((line, i) => {
          const y = startY + i * lineHeight;
          return `<text x="${previewSize / 2}" y="${y}" text-anchor="middle" font-family="${options.fontFamily}" font-size="${scaledFontSize}" font-weight="${fontWeight}" font-style="${fontStyle}" fill="${options.textColor}">${line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>`;
        })
        .join("")}
    </g>
  </svg>`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Preview */}
      <div className="flex justify-center">
        <div
          className="rounded-lg border border-gray-700 bg-gray-800 p-3"
          dangerouslySetInnerHTML={{ __html: previewSvg }}
        />
      </div>

      {/* Text Input */}
      <input
        type="text"
        value={options.text}
        onChange={(e) => updateOption("text", e.target.value)}
        placeholder="My App"
        maxLength={50}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-gray-500 focus:outline-none"
      />

      {/* Font, Shape, Toggles - compact row */}
      <div className="flex gap-2">
        <select
          value={options.fontFamily}
          onChange={(e) =>
            updateOption(
              "fontFamily",
              e.target.value as "sans-serif" | "serif" | "monospace"
            )
          }
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-2 py-2 text-sm text-gray-300"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <select
          value={options.shape}
          onChange={(e) =>
            updateOption(
              "shape",
              e.target.value as "square" | "rounded" | "circle"
            )
          }
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-2 py-2 text-sm text-gray-300"
        >
          {SHAPE_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => updateOption("bold", !options.bold)}
          className={`rounded-lg border px-3 py-2 text-sm font-bold transition-colors ${
            options.bold
              ? "border-white bg-white text-gray-900"
              : "border-gray-700 text-gray-400 hover:border-gray-500"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => updateOption("italic", !options.italic)}
          className={`rounded-lg border px-3 py-2 text-sm italic transition-colors ${
            options.italic
              ? "border-white bg-white text-gray-900"
              : "border-gray-700 text-gray-400 hover:border-gray-500"
          }`}
        >
          I
        </button>
      </div>

      {/* Size Slider */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-gray-400">Size</span>
          <span className="font-mono text-xs text-gray-500">
            {options.fontSize}px
          </span>
        </div>
        <input
          type="range"
          min={40}
          max={400}
          value={options.fontSize}
          onChange={(e) => updateOption("fontSize", Number(e.target.value))}
          className="w-full accent-gray-900"
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={options.textColor}
            onChange={(e) => updateOption("textColor", e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-gray-700"
          />
          <input
            type="text"
            value={options.textColor}
            onChange={(e) => updateOption("textColor", e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 font-mono text-xs text-gray-300"
            placeholder="Text"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={options.backgroundColor}
            onChange={(e) => updateOption("backgroundColor", e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-gray-700"
          />
          <input
            type="text"
            value={options.backgroundColor}
            onChange={(e) => updateOption("backgroundColor", e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 font-mono text-xs text-gray-300"
            placeholder="Background"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isGenerating || !options.text.trim()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Type className="h-4 w-4" />
            Create Logo
          </>
        )}
      </button>
    </form>
  );
}
