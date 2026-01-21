// @ts-nocheck
import fs from 'fs'
import path, { dirname } from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ICON_SIZES = [192, 512]
const PADDING_PERCENTAGE = 0.1 // 10% padding

async function generateMaskableIcon(size) {
  const inputPath = path.join(__dirname, '../public/icons', `icon-${size}x${size}.png`)
  const outputPath = path.join(__dirname, '../public/icons', `icon-${size}x${size}-maskable.png`)

  // Calculate padding
  const padding = Math.floor(size * PADDING_PERCENTAGE)
  const targetSize = size - padding * 2

  try {
    // Read the original image
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    // Create a new image with padding
    await image
      .resize(targetSize, targetSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(outputPath)

    console.log(`Generated maskable icon: ${outputPath}`)
  } catch (error) {
    console.error(`Error processing icon ${size}x${size}:`, error)
  }
}

async function main() {
  // Ensure the icons directory exists
  const iconsDir = path.join(__dirname, '../public/icons')
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }

  // Generate maskable icons for each size
  for (const size of ICON_SIZES) {
    await generateMaskableIcon(size)
  }
}

main().catch(console.error)
