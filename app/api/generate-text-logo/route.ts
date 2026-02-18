import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

interface TextLogoRequest {
  text: string;
  fontFamily: 'sans-serif' | 'serif' | 'monospace';
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  shape: 'square' | 'rounded' | 'circle';
  bold: boolean;
  italic: boolean;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function POST(request: NextRequest) {
  try {
    const body: TextLogoRequest = await request.json();
    const {
      text,
      fontFamily = 'sans-serif',
      fontSize = 120,
      textColor = '#ffffff',
      backgroundColor = '#0ea5e9',
      shape = 'rounded',
      bold = true,
      italic = false,
    } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 50) {
      return NextResponse.json({ error: 'Text must be 50 characters or less' }, { status: 400 });
    }

    const size = 1024;
    const escapedText = escapeXml(text.trim());
    const fontWeight = bold ? 'bold' : 'normal';
    const fontStyle = italic ? 'italic' : 'normal';

    // Build clip path based on shape
    let clipPath = '';
    let clipAttr = '';
    if (shape === 'circle') {
      clipPath = `<clipPath id="shape"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" /></clipPath>`;
      clipAttr = 'clip-path="url(#shape)"';
    } else if (shape === 'rounded') {
      clipPath = `<clipPath id="shape"><rect x="0" y="0" width="${size}" height="${size}" rx="160" ry="160" /></clipPath>`;
      clipAttr = 'clip-path="url(#shape)"';
    }

    // Multi-line support: split by newlines
    const lines = escapedText.split('\n').filter(l => l.length > 0);
    const lineCount = lines.length || 1;
    const lineHeight = fontSize * 1.2;
    const totalTextHeight = lineCount * lineHeight;
    const startY = (size - totalTextHeight) / 2 + fontSize * 0.85;

    const textElements = lines.map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="${size / 2}" y="${y}" text-anchor="middle" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" font-style="${fontStyle}" fill="${textColor}">${line}</text>`;
    }).join('\n    ');

    const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${clipPath}
  </defs>
  <rect width="${size}" height="${size}" fill="${backgroundColor}" ${clipAttr} />
  <g ${clipAttr}>
    ${textElements}
  </g>
</svg>`;

    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();

    const base64 = pngBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ url: dataUrl });
  } catch (error) {
    console.error('Error generating text logo:', error);
    return NextResponse.json(
      { error: 'Failed to generate text logo. Please try again.' },
      { status: 500 }
    );
  }
}
