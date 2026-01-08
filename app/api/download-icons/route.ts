import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  try {
    const { icons } = await request.json();

    if (!icons || !Array.isArray(icons)) {
      return NextResponse.json({ error: 'Invalid icons data' }, { status: 400 });
    }

    const zip = new JSZip();

    // Add each icon to the ZIP file
    for (const icon of icons) {
      try {
        // Extract base64 data from data URL
        const base64Data = icon.url.split(',')[1];
        if (!base64Data) {
          console.warn(`Skipping icon ${icon.name}: Invalid data URL`);
          continue;
        }

        // Convert base64 to buffer
        const buffer = Buffer.from(base64Data, 'base64');

        // Add to ZIP
        zip.file(icon.name, buffer);
      } catch (error) {
        console.warn(`Error processing icon ${icon.name}:`, error);
        continue;
      }
    }

    // Generate ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Return ZIP file
    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="expo-icons.zip"',
        'Content-Length': zipBlob.size.toString(),
      },
    });

  } catch (error) {
    console.error('Error creating ZIP file:', error);
    return NextResponse.json(
      { error: 'Failed to create ZIP file. Please try again.' },
      { status: 500 }
    );
  }
}
