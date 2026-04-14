import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanityClient)

/**
 * Build a URL from a Sanity image reference.
 * Usage: urlFor(source).width(800).url()
 */
export function urlFor(source) {
  return builder.image(source)
}
