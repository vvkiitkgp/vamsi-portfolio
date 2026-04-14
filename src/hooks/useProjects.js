import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../lib/sanityClient'
import homePageInfoMock from '../mock/homePageInfoMock'

const QUERY = `*[_type == "project"] | order(section asc, order asc) {
  _id,
  heading,
  info,
  image,
  section,
  order,
  path,
  externalUrl,
  isDeveloped
}`

/**
 * Maps a Sanity project document to the shape CardV2 expects.
 */
function toCardData(doc) {
  return {
    heading: doc.heading,
    info: doc.info,
    imageUrl: doc.image ? urlFor(doc.image).width(800).url() : null,
    path: doc.path || null,
    externalUrl: doc.externalUrl || null,
    isDeveloped: doc.isDeveloped ?? false,
  }
}

/**
 * Groups an array of card-data items by their Sanity section value.
 * Returns { ai: [...], ecommerce: [...], simple: [...] }
 */
function groupBySection(docs) {
  return docs.reduce(
    (acc, doc) => {
      const key = doc.section || 'simple'
      acc[key] = [...(acc[key] || []), toCardData(doc)]
      return acc
    },
    { ai: [], ecommerce: [], simple: [] }
  )
}

/**
 * Converts the flat mock object into the same grouped shape
 * so Home.jsx can use one consistent data structure.
 */
function mockToGrouped() {
  return {
    ai: [homePageInfoMock.askAboutMe, homePageInfoMock.aiDrivenWebapp],
    ecommerce: [homePageInfoMock.jewelleryStore],
    simple: [
      homePageInfoMock.HtmlToVisualConverter,
      homePageInfoMock.reactForms,
      homePageInfoMock.shoppingConcept,
      homePageInfoMock.scrollableTable,
    ],
  }
}

/**
 * Returns { data, loading, error }
 * Falls back to mock data if Sanity is not yet configured.
 */
export function useProjects() {
  const isSanityConfigured = Boolean(process.env.REACT_APP_SANITY_PROJECT_ID)

  const [data, setData] = useState(isSanityConfigured ? null : mockToGrouped())
  const [loading, setLoading] = useState(isSanityConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSanityConfigured) return

    let cancelled = false

    sanityClient
      ?.fetch(QUERY)
      .then((docs) => {
        if (!cancelled) {
          setData(groupBySection(docs))
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error('[Sanity] Failed to fetch projects:', err)
        if (!cancelled) {
          setData(mockToGrouped())
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [isSanityConfigured])

  return { data, loading, error }
}
