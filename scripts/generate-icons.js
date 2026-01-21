import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

async function generateIcons() {
  try {
    // Create a base icon with a simple design
    const svgBuffer = Buffer.from(`
      <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#000000"/>
        <text x="256" y="256" font-family="Arial" font-size="200" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">TF</text>
      </svg>
    `)

    // Generate icons for each size
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '../public/icons', `icon-${size}x${size}.png`))

      console.log(`Generated ${size}x${size} icon`)
    }

    console.log('All icons generated successfully!')
  } catch (error) {
    console.error('Error generating icons:', error)
  }
}

generateIcons()
