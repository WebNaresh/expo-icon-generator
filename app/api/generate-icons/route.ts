import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

// Type for generated icon data
interface GeneratedIconData {
  name: string;
  size: string;
  url: string;
  buffer: Buffer;
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}



// Icon specifications
const ICON_SPECS = [
  { name: 'adaptive-icon.png', width: 1024, height: 1024, description: '1024×1024px (Android adaptive icon)' },
  { name: 'favicon.png', width: 48, height: 48, description: '48×48px (Web favicon)' },
  { name: 'icon.png', width: 1024, height: 1024, description: '1024×1024px (Main app icon)' },
  { name: 'react-logo.png', width: 100, height: 100, description: '100×100px (1x density)' },
  { name: 'react-logo@2x.png', width: 200, height: 200, description: '200×200px (2x density)' },
  { name: 'react-logo@3x.png', width: 300, height: 300, description: '300×300px (3x density)' },
  { name: 'splash-icon.png', width: 1024, height: 1024, description: '1024×1024px (Splash screen icon)' },
];

// Special handling for partial-react-logo.png (crop top-right section)
const PARTIAL_LOGO_SPEC = {
  name: 'partial-react-logo.png',
  width: 518,
  height: 316,
  description: '518×316px (Cropped top-right section)'
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const backgroundColor = formData.get('backgroundColor') as string || '#ffffff';

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

    // Get original image metadata
    const originalImage = sharp(buffer);
    const metadata = await originalImage.metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json({ error: 'Could not read image dimensions' }, { status: 400 });
    }

    const generatedIcons: GeneratedIconData[] = [];

    // Parse background color
    const bgColor = hexToRgb(backgroundColor);

    // Generate standard icons
    for (const spec of ICON_SPECS) {
      try {
        let processedImage = originalImage.clone();

        // Special handling for icon.png with background color and rounded square corners
        if (spec.name === 'icon.png') {
          try {
            console.log(`Processing icon.png with background color: ${backgroundColor} (RGB: ${bgColor.r}, ${bgColor.g}, ${bgColor.b}) - creating rounded square`);

            // Step 1: Create a square background with the selected color
            const squareBackground = sharp({
              create: {
                width: spec.width,
                height: spec.height,
                channels: 4,
                background: { r: bgColor.r, g: bgColor.g, b: bgColor.b, alpha: 1 }
              }
            });

            // Step 2: Resize the original icon to fit within the square (with padding)
            const iconSize = Math.round(Math.min(spec.width * 0.8, spec.height * 0.8)); // 80% of target size
            const resizedIcon = await processedImage
              .resize(iconSize, iconSize, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background for the icon
              })
              .png()
              .toBuffer();

            // Step 3: Composite the icon on top of the colored background
            const compositeImage = await squareBackground
              .composite([
                {
                  input: resizedIcon,
                  top: Math.floor((spec.height - iconSize) / 2),
                  left: Math.floor((spec.width - iconSize) / 2)
                }
              ])
              .png()
              .toBuffer();

            // Step 4: Create rounded square mask and apply it
            // Using 20% corner radius for iOS-style rounded square (similar to iPhone app icons)
            const cornerRadius = Math.round(spec.width * 0.2);
            const roundedSquareMask = Buffer.from(
              `<svg width="${spec.width}" height="${spec.height}">
                <rect x="0" y="0" width="${spec.width}" height="${spec.height}"
                      rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
              </svg>`
            );

            // Step 5: Apply the rounded square mask to create rounded corners
            processedImage = sharp(compositeImage)
              .composite([
                {
                  input: roundedSquareMask,
                  blend: 'dest-in'
                }
              ]);

          } catch (maskError) {
            console.warn('Error applying rounded square mask to icon.png, falling back to regular square icon:', maskError);
            // Fallback to square icon with background color (no rounded corners)
            const squareBackground = sharp({
              create: {
                width: spec.width,
                height: spec.height,
                channels: 4,
                background: { r: bgColor.r, g: bgColor.g, b: bgColor.b, alpha: 1 }
              }
            });

            const iconSize = Math.round(Math.min(spec.width * 0.8, spec.height * 0.8));
            const resizedIcon = await processedImage
              .resize(iconSize, iconSize, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
              })
              .png()
              .toBuffer();

            processedImage = squareBackground.composite([
              {
                input: resizedIcon,
                top: Math.floor((spec.height - iconSize) / 2),
                left: Math.floor((spec.width - iconSize) / 2)
              }
            ]);
          }
        }
        // For splash-icon, add padding/background
        else if (spec.name === 'splash-icon.png') {
          // Create a white background and composite the icon in the center
          const iconSize = Math.round(Math.min(spec.width * 0.8, spec.height * 0.8)); // 80% of target size, rounded to integer
          const topPadding = Math.floor((spec.height - iconSize) / 2);
          const bottomPadding = Math.ceil((spec.height - iconSize) / 2);
          const leftPadding = Math.floor((spec.width - iconSize) / 2);
          const rightPadding = Math.ceil((spec.width - iconSize) / 2);

          processedImage = processedImage
            .resize(iconSize, iconSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .extend({
              top: topPadding,
              bottom: bottomPadding,
              left: leftPadding,
              right: rightPadding,
              background: { r: 255, g: 255, b: 255, alpha: 0 }
            });
        } else {
          // Standard resize with high-quality scaling
          processedImage = processedImage.resize(spec.width, spec.height, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          });
        }

        const iconBuffer = await processedImage.png().toBuffer();
        const base64 = iconBuffer.toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;

        generatedIcons.push({
          name: spec.name,
          size: spec.description,
          url: dataUrl,
          buffer: iconBuffer
        });
      } catch (error) {
        console.error(`Error processing icon ${spec.name}:`, error);
        throw new Error(`Failed to process ${spec.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Generate partial-react-logo.png (crop top-right section)
    try {
      const partialImage = originalImage.clone();
      const cropWidth = Math.floor(metadata.width * 0.6); // Take 60% width from right
      const cropHeight = Math.floor(metadata.height * 0.4); // Take 40% height from top
      const left = Math.floor(metadata.width - cropWidth); // Start from right side, ensure integer
      const top = 0; // Start from top

      const partialBuffer = await partialImage
        .extract({ left, top, width: cropWidth, height: cropHeight })
        .resize(PARTIAL_LOGO_SPEC.width, PARTIAL_LOGO_SPEC.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toBuffer();

      const partialBase64 = partialBuffer.toString('base64');
      const partialDataUrl = `data:image/png;base64,${partialBase64}`;

      generatedIcons.push({
        name: PARTIAL_LOGO_SPEC.name,
        size: PARTIAL_LOGO_SPEC.description,
        url: partialDataUrl,
        buffer: partialBuffer
      });
    } catch (error) {
      console.error('Error processing partial-react-logo.png:', error);
      throw new Error(`Failed to process partial-react-logo.png: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Return the generated icons (without buffers for response size)
    const response = generatedIcons.map(icon => ({
      name: icon.name,
      size: icon.size,
      url: icon.url
    }));

    return NextResponse.json({ icons: response });

  } catch (error) {
    console.error('Error generating icons:', error);

    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to generate icons. Please try again.';

    if (error instanceof Error) {
      if (error.message.includes('Input file contains unsupported image format')) {
        errorMessage = 'Unsupported image format. Please upload a PNG, JPG, JPEG, or SVG file.';
      } else if (error.message.includes('Input buffer contains unsupported image format')) {
        errorMessage = 'Invalid image file. Please ensure your file is a valid image.';
      } else if (error.message.includes('Input image exceeds pixel limit')) {
        errorMessage = 'Image is too large. Please use an image smaller than 10MB.';
      } else if (error.message.includes('Failed to process')) {
        errorMessage = error.message; // Use our custom error messages from individual icon processing
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
