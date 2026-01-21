// @ts-nocheck
import path, { dirname } from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SCREENSHOTS_DIR = path.join(__dirname, '../public/screenshots')

// Remove the placeholder creation since it's not necessary
// The directory already exists, and we'll be creating actual screenshots

// Function to create a screenshot with a gradient background and text
async function createScreenshot(width, height, text, outputPath, isDark = false) {
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#000000'

  // Create a gradient background
  const gradient = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([
    {
      input: Buffer.from(
        `<svg width="${width}" height="${height}">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${isDark ? '#2a2a2a' : '#f0f0f0'};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)"/>
          <text x="50%" y="50%" font-family="Arial" font-size="48" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
            ${text}
          </text>
        </svg>`,
      ),
      top: 0,
      left: 0,
    },
  ])

  await gradient.toFile(outputPath)
  console.log(`Created screenshot: ${outputPath}`)
}

// Generate all required screenshots
async function generateScreenshots() {
  try {
    // Desktop screenshots (1280x720)
    await createScreenshot(
      1280,
      720,
      'TaskFlow Desktop Dashboard',
      path.join(SCREENSHOTS_DIR, 'dashboard-light.png'),
      false,
    )
    await createScreenshot(
      1280,
      720,
      'TaskFlow Desktop Dashboard',
      path.join(SCREENSHOTS_DIR, 'dashboard-dark.png'),
      true,
    )

    // Mobile screenshots (750x1334)
    await createScreenshot(
      750,
      1334,
      'TaskFlow Mobile Interface',
      path.join(SCREENSHOTS_DIR, 'mobile-light.png'),
      false,
    )
    await createScreenshot(750, 1334, 'TaskFlow Mobile Interface', path.join(SCREENSHOTS_DIR, 'mobile-dark.png'), true)

    console.log('All screenshots generated successfully!')
  } catch (error) {
    console.error('Error generating screenshots:', error)
    process.exit(1)
  }
}

generateScreenshots()
