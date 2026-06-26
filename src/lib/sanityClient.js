import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production'

export const sanityClient = projectId
  ? createClient({ projectId, dataset, useCdn: true, apiVersion: '2024-01-01' })
  : null

const builder = projectId ? imageUrlBuilder(sanityClient) : null

/**
 * Build a URL from a Sanity image reference.
 * Usage: urlFor(source).width(800).url()
 */
export function urlFor(source) {
  return builder ? builder.image(source) : null
}

/** Optimized Sanity CDN image URL (webp, sized for display). */
export function optimizedImageUrl(source, { width = 800, quality = 85 } = {}) {
  if (!source || !builder) return null
  return builder.image(source).width(width).format('webp').quality(quality).url()
}
