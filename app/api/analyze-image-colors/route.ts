import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

// Type for color analysis result
interface ColorAnalysis {
  suggestedBackgroundColor: string;
  dominantColors: string[];
  hasTransparency: boolean;
  edgeColors: string[];
  reasoning: string;
}

// Helper function to convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Helper function to calculate color contrast ratio
function getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
  const getLuminance = (rgb: [number, number, number]) => {
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// Helper function to analyze image colors
async function analyzeImageColors(buffer: Buffer): Promise<ColorAnalysis> {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Check for transparency
    const hasTransparency = metadata.channels === 4 || metadata.format === 'png';

    // Resize image to a smaller size for faster color analysis while preserving detail
    const analysisSize = 100; // Smaller for better performance
    const smallImage = image.clone().resize(analysisSize, analysisSize, { fit: 'inside' });

    // Get raw pixel data for more accurate color analysis
    const { data, info } = await smallImage.raw().toBuffer({ resolveWithObject: true });

    // Extract colors from pixels
    const colors: { [key: string]: number } = {};
    const totalPixels = (info.width * info.height);

    // Sample ALL pixels for better accuracy (not every 4th)
    const step = info.channels; // 3 for RGB, 4 for RGBA
    for (let i = 0; i < data.length; i += step) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Skip transparent pixels if RGBA
      if (step === 4 && data[i + 3] < 200) continue; // Higher alpha threshold

      // Less aggressive quantization - group colors more precisely
      const quantizedR = Math.round(r / 16) * 16; // Divide by 16 instead of 32
      const quantizedG = Math.round(g / 16) * 16;
      const quantizedB = Math.round(b / 16) * 16;

      const colorKey = rgbToHex(quantizedR, quantizedG, quantizedB);
      colors[colorKey] = (colors[colorKey] || 0) + 1;
    }

    // Filter out colors that appear in less than 1% of pixels (noise reduction)
    const minPixelCount = Math.max(1, Math.floor(totalPixels * 0.01));
    const significantColors = Object.entries(colors)
      .filter(([, count]) => count >= minPixelCount)
      .sort(([, a], [, b]) => b - a);

    // Get top colors sorted by frequency
    const dominantColors = significantColors
      .slice(0, 6) // Get top 6 colors
      .map(([color]) => color);

    // Extract edge colors more accurately with better sampling
    const edgeColors: string[] = [];
    if (metadata.width && metadata.height && info.width && info.height) {
      const edgeThickness = Math.max(1, Math.floor(info.width * 0.1)); // Thicker edge sampling
      const edgeColorCounts: { [key: string]: number } = {};

      // Sample edge pixels with better coverage
      // Top and bottom edges
      for (let y = 0; y < edgeThickness; y++) {
        for (let x = 0; x < info.width; x++) { // Sample every pixel, not every 2nd
          // Top edge
          const topIndex = (y * info.width + x) * step;
          if (topIndex + 2 < data.length) {
            // Skip transparent pixels
            if (step === 4 && data[topIndex + 3] < 200) continue;

            const topColor = rgbToHex(
              Math.round(data[topIndex] / 16) * 16,
              Math.round(data[topIndex + 1] / 16) * 16,
              Math.round(data[topIndex + 2] / 16) * 16
            );
            edgeColorCounts[topColor] = (edgeColorCounts[topColor] || 0) + 1;
          }

          // Bottom edge
          const bottomY = info.height - 1 - y;
          const bottomIndex = (bottomY * info.width + x) * step;
          if (bottomIndex + 2 < data.length) {
            // Skip transparent pixels
            if (step === 4 && data[bottomIndex + 3] < 200) continue;

            const bottomColor = rgbToHex(
              Math.round(data[bottomIndex] / 16) * 16,
              Math.round(data[bottomIndex + 1] / 16) * 16,
              Math.round(data[bottomIndex + 2] / 16) * 16
            );
            edgeColorCounts[bottomColor] = (edgeColorCounts[bottomColor] || 0) + 1;
          }
        }
      }

      // Left and right edges  
      for (let x = 0; x < edgeThickness; x++) {
        for (let y = edgeThickness; y < info.height - edgeThickness; y++) { // Skip corners already counted
          // Left edge
          const leftIndex = (y * info.width + x) * step;
          if (leftIndex + 2 < data.length) {
            // Skip transparent pixels
            if (step === 4 && data[leftIndex + 3] < 200) continue;

            const leftColor = rgbToHex(
              Math.round(data[leftIndex] / 16) * 16,
              Math.round(data[leftIndex + 1] / 16) * 16,
              Math.round(data[leftIndex + 2] / 16) * 16
            );
            edgeColorCounts[leftColor] = (edgeColorCounts[leftColor] || 0) + 1;
          }

          // Right edge
          const rightX = info.width - 1 - x;
          const rightIndex = (y * info.width + rightX) * step;
          if (rightIndex + 2 < data.length) {
            // Skip transparent pixels
            if (step === 4 && data[rightIndex + 3] < 200) continue;

            const rightColor = rgbToHex(
              Math.round(data[rightIndex] / 16) * 16,
              Math.round(data[rightIndex + 1] / 16) * 16,
              Math.round(data[rightIndex + 2] / 16) * 16
            );
            edgeColorCounts[rightColor] = (edgeColorCounts[rightColor] || 0) + 1;
          }
        }
      }

      // Get most common edge colors with minimum threshold
      const minEdgeCount = Math.max(1, Math.floor(edgeThickness * 2));
      edgeColors.push(...Object.entries(edgeColorCounts)
        .filter(([, count]) => count >= minEdgeCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4)
        .map(([color]) => color));
    }

    // Analyze and suggest background color
    let suggestedBackgroundColor = "#ffffff"; // Default fallback
    let reasoning = "Using white as safe default";

    if (dominantColors.length > 0) {
      const primaryColor = dominantColors[0];
      const primaryRgb = hexToRgb(primaryColor);

      if (primaryRgb) {
        // First priority: Use the most dominant color from the image
        suggestedBackgroundColor = primaryColor;
        reasoning = "Using most dominant color from image";

        // Only override with edge color if:
        // 1. Image has transparency 
        // 2. Edge color is different enough from dominant color
        // 3. Edge color appears to be a significant background color
        if (hasTransparency && edgeColors.length > 0) {
          const mostCommonEdgeColor = edgeColors[0];
          const edgeRgb = hexToRgb(mostCommonEdgeColor);

          if (edgeRgb && getContrastRatio(edgeRgb, primaryRgb) > 2.0) {
            // Check if edge color is more prevalent than expected for a border
            suggestedBackgroundColor = mostCommonEdgeColor;
            reasoning = "Using edge color - likely original transparent background";
          }
        }
      }
    }

    return {
      suggestedBackgroundColor,
      dominantColors: dominantColors.slice(0, 6), // Limit to top 6
      hasTransparency,
      edgeColors: [...new Set(edgeColors)].slice(0, 4), // Remove duplicates, limit to 4
      reasoning
    };

  } catch (error) {
    console.error('Error analyzing image colors:', error);
    return {
      suggestedBackgroundColor: "#ffffff",
      dominantColors: ["#ffffff"],
      hasTransparency: false,
      edgeColors: [],
      reasoning: "Error during analysis, using white default"
    };
  }
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// Helper function to generate complementary color
function generateComplementaryColor(rgb: [number, number, number]): [number, number, number] {
  const [r, g, b] = rgb;

  // Calculate luminance to determine if we need a light or dark background
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) {
    // Image is bright, suggest a darker background
    return [Math.max(0, r - 100), Math.max(0, g - 100), Math.max(0, b - 100)];
  } else {
    // Image is dark, suggest a lighter background
    return [Math.min(255, r + 100), Math.min(255, g + 100), Math.min(255, b + 100)];
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Please upload PNG, JPG, JPEG, or SVG.' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Analyze the image colors
    const colorAnalysis = await analyzeImageColors(buffer);

    return NextResponse.json(colorAnalysis);

  } catch (error) {
    console.error('Error in color analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image colors. Please try again.' },
      { status: 500 }
    );
  }
}
