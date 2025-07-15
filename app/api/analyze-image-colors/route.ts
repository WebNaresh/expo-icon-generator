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
    
    // Get image statistics for dominant colors
    const { dominant } = await image.stats();
    
    // Extract edge colors by analyzing border pixels
    const edgeColors: string[] = [];
    
    // Sample colors from the edges of the image
    if (metadata.width && metadata.height) {
      const edgeSize = Math.min(20, Math.floor(Math.min(metadata.width, metadata.height) * 0.1));
      
      // Top edge
      const topEdge = await image
        .extract({ left: 0, top: 0, width: metadata.width, height: edgeSize })
        .stats();
      
      // Bottom edge  
      const bottomEdge = await image
        .extract({ left: 0, top: metadata.height - edgeSize, width: metadata.width, height: edgeSize })
        .stats();
      
      // Left edge
      const leftEdge = await image
        .extract({ left: 0, top: 0, width: edgeSize, height: metadata.height })
        .stats();
      
      // Right edge
      const rightEdge = await image
        .extract({ left: metadata.width - edgeSize, top: 0, width: edgeSize, height: metadata.height })
        .stats();
      
      // Collect edge colors
      [topEdge, bottomEdge, leftEdge, rightEdge].forEach(edge => {
        const { r, g, b } = edge.dominant;
        edgeColors.push(rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
      });
    }
    
    // Get dominant colors from the entire image
    const dominantColors: string[] = [];
    const { r, g, b } = dominant;
    dominantColors.push(rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
    
    // Analyze and suggest background color
    let suggestedBackgroundColor = "#ffffff"; // Default fallback
    let reasoning = "Using white as safe default";
    
    // If image has transparency, analyze the edge colors
    if (hasTransparency && edgeColors.length > 0) {
      // Find the most common edge color
      const colorCounts = edgeColors.reduce((acc, color) => {
        acc[color] = (acc[color] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const mostCommonEdgeColor = Object.entries(colorCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      // Check if the edge color is not too similar to the dominant color
      const edgeRgb = hexToRgb(mostCommonEdgeColor);
      const dominantRgb = [Math.round(r), Math.round(g), Math.round(b)] as [number, number, number];
      
      if (edgeRgb && getContrastRatio(edgeRgb, dominantRgb) > 1.5) {
        suggestedBackgroundColor = mostCommonEdgeColor;
        reasoning = "Detected from image edges with transparency";
      } else {
        // Generate a complementary color
        const complementaryColor = generateComplementaryColor(dominantRgb);
        suggestedBackgroundColor = rgbToHex(complementaryColor[0], complementaryColor[1], complementaryColor[2]);
        reasoning = "Generated complementary color for better contrast";
      }
    } else {
      // For images without transparency, generate a complementary color
      const dominantRgb = [Math.round(r), Math.round(g), Math.round(b)] as [number, number, number];
      const complementaryColor = generateComplementaryColor(dominantRgb);
      suggestedBackgroundColor = rgbToHex(complementaryColor[0], complementaryColor[1], complementaryColor[2]);
      reasoning = "Generated complementary color based on dominant image color";
    }
    
    return {
      suggestedBackgroundColor,
      dominantColors,
      hasTransparency,
      edgeColors: [...new Set(edgeColors)], // Remove duplicates
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
