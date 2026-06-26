import { useState, useEffect } from 'react'
import { fetchCached } from '../lib/sanityCache'

const QUERY = `*[_type == "projectsSection"][0] {
  sectionLabel,
  heading,
  headingAccent,
  narrative
}`

const FALLBACK = {
  sectionLabel: 'Built from real motivation',
  heading: 'Projects I Keep',
  headingAccent: 'Returning To',
  narrative:
    'A few projects that stayed with me because the workflow, the product question, or the itch to ship something better kept pulling me back.',
}

export function useProjectsSection() {
  const isSanityConfigured = Boolean(process.env.REACT_APP_SANITY_PROJECT_ID)

  const [data, setData] = useState(FALLBACK)
  const [loading, setLoading] = useState(isSanityConfigured)

  useEffect(() => {
    if (!isSanityConfigured) return

    let cancelled = false

    fetchCached(QUERY)
      .then((doc) => {
        if (!cancelled && doc) {
          setData({
            sectionLabel: doc.sectionLabel || FALLBACK.sectionLabel,
            heading: doc.heading || FALLBACK.heading,
            headingAccent: doc.headingAccent || FALLBACK.headingAccent,
            narrative: doc.narrative || FALLBACK.narrative,
          })
        }
        if (!cancelled) setLoading(false)
      })
      .catch((err) => {
        console.error('[Sanity] Failed to fetch projectsSection:', err)
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isSanityConfigured])

  return { data, loading }
}
