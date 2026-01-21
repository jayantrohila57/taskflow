import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sys/', '/_next/', '/static/'],
    },
    sitemap: 'https://taskflow.app/sitemap.xml',
  }
}
