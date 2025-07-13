import jsPDF from 'jspdf'

// TypeScript interface for contributor data
interface ContributorData {
  username: string
  name: string | null
  contributions: number
  joinDate?: string
}

// Certificate configuration
const CERTIFICATE_CONFIG = {
  width: 297, // A4 landscape width in mm
  height: 210, // A4 landscape height in mm
  margin: 20,
  colors: {
    primary: '#0ea5e9', // Sky blue
    secondary: '#1e40af', // Blue
    accent: '#f59e0b', // Amber
    text: '#1f2937', // Gray-800
    lightText: '#6b7280', // Gray-500
    background: '#f8fafc' // Slate-50
  },
  fonts: {
    title: 24,
    subtitle: 16,
    body: 12,
    small: 10
  }
}

/**
 * Generate a PDF certificate for a contributor
 */
export function generateContributorCertificate(contributor: ContributorData): jsPDF {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  const { width, height, margin, colors, fonts } = CERTIFICATE_CONFIG
  const centerX = width / 2
  const displayName = contributor.name || contributor.username

  // Set background color
  doc.setFillColor(colors.background)
  doc.rect(0, 0, width, height, 'F')

  // Add decorative border
  doc.setDrawColor(colors.primary)
  doc.setLineWidth(2)
  doc.rect(margin / 2, margin / 2, width - margin, height - margin)
  
  // Inner border
  doc.setLineWidth(0.5)
  doc.rect(margin, margin, width - 2 * margin, height - 2 * margin)

  // Header section
  doc.setTextColor(colors.primary)
  doc.setFontSize(fonts.title)
  doc.setFont('helvetica', 'bold')
  doc.text('CERTIFICATE OF COLLABORATION', centerX, 40, { align: 'center' })

  // Subtitle
  doc.setTextColor(colors.secondary)
  doc.setFontSize(fonts.subtitle)
  doc.setFont('helvetica', 'normal')
  doc.text('Expo Icon Generator Project', centerX, 50, { align: 'center' })

  // Decorative line
  doc.setDrawColor(colors.accent)
  doc.setLineWidth(1)
  doc.line(centerX - 40, 55, centerX + 40, 55)

  // Main content
  doc.setTextColor(colors.text)
  doc.setFontSize(fonts.body)
  doc.setFont('helvetica', 'normal')
  doc.text('This certificate is proudly presented to', centerX, 75, { align: 'center' })

  // Contributor name (highlighted)
  doc.setTextColor(colors.primary)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(displayName, centerX, 90, { align: 'center' })

  // GitHub username
  if (contributor.name && contributor.username !== contributor.name) {
    doc.setTextColor(colors.lightText)
    doc.setFontSize(fonts.body)
    doc.setFont('helvetica', 'italic')
    doc.text(`(@${contributor.username})`, centerX, 100, { align: 'center' })
  }

  // Recognition text
  doc.setTextColor(colors.text)
  doc.setFontSize(fonts.body)
  doc.setFont('helvetica', 'normal')
  const recognitionY = contributor.name && contributor.username !== contributor.name ? 115 : 105
  doc.text('in recognition of their valuable contributions to the', centerX, recognitionY, { align: 'center' })
  doc.text('Expo Icon Generator open-source project', centerX, recognitionY + 8, { align: 'center' })

  // Contribution details
  doc.setTextColor(colors.secondary)
  doc.setFontSize(fonts.subtitle)
  doc.setFont('helvetica', 'bold')
  const contributionText = `${contributor.contributions} Contribution${contributor.contributions !== 1 ? 's' : ''}`
  doc.text(contributionText, centerX, recognitionY + 25, { align: 'center' })

  // Footer section
  const footerY = height - 40

  // Date
  doc.setTextColor(colors.lightText)
  doc.setFontSize(fonts.small)
  doc.setFont('helvetica', 'normal')
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  doc.text(`Issued on ${currentDate}`, margin + 10, footerY)

  // Project info
  doc.text('Expo Icon Generator Project', width - margin - 10, footerY, { align: 'right' })
  doc.text('https://expo-assets-generator.vercel.app', width - margin - 10, footerY + 8, { align: 'right' })

  // Signature line (decorative)
  doc.setDrawColor(colors.lightText)
  doc.setLineWidth(0.5)
  doc.line(centerX - 30, footerY - 15, centerX + 30, footerY - 15)
  doc.setTextColor(colors.lightText)
  doc.setFontSize(fonts.small)
  doc.text('Project Maintainer', centerX, footerY - 10, { align: 'center' })

  // Add decorative elements
  addDecorativeElements(doc, colors)

  return doc
}

/**
 * Add decorative elements to the certificate
 */
function addDecorativeElements(doc: jsPDF, colors: typeof CERTIFICATE_CONFIG.colors) {
  const { width, height, margin } = CERTIFICATE_CONFIG

  // Corner decorations
  doc.setFillColor(colors.accent)
  
  // Top-left corner
  doc.circle(margin + 5, margin + 5, 2, 'F')
  
  // Top-right corner
  doc.circle(width - margin - 5, margin + 5, 2, 'F')
  
  // Bottom-left corner
  doc.circle(margin + 5, height - margin - 5, 2, 'F')
  
  // Bottom-right corner
  doc.circle(width - margin - 5, height - margin - 5, 2, 'F')

  // Side decorative lines
  doc.setDrawColor(colors.primary)
  doc.setLineWidth(0.5)
  
  // Left side
  doc.line(margin + 10, margin + 20, margin + 10, height - margin - 20)
  
  // Right side
  doc.line(width - margin - 10, margin + 20, width - margin - 10, height - margin - 20)
}

/**
 * Download the certificate as a PDF file
 */
export function downloadCertificate(contributor: ContributorData) {
  try {
    const doc = generateContributorCertificate(contributor)
    const filename = `${contributor.username}-expo-icon-generator-certificate.pdf`
    doc.save(filename)
  } catch (error) {
    console.error('Error generating certificate:', error)
    throw new Error('Failed to generate certificate')
  }
}

/**
 * Get certificate as blob for further processing
 */
export function getCertificateBlob(contributor: ContributorData): Blob {
  try {
    const doc = generateContributorCertificate(contributor)
    return doc.output('blob')
  } catch (error) {
    console.error('Error generating certificate blob:', error)
    throw new Error('Failed to generate certificate')
  }
}

/**
 * Preview certificate (returns base64 data URL)
 */
export function getCertificatePreview(contributor: ContributorData): string {
  try {
    const doc = generateContributorCertificate(contributor)
    return doc.output('datauristring')
  } catch (error) {
    console.error('Error generating certificate preview:', error)
    throw new Error('Failed to generate certificate preview')
  }
}
