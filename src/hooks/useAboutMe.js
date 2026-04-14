import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../lib/sanityClient'

const QUERY = `*[_type == "aboutMe"][0] {
  greeting,
  name,
  role,
  bio,
  photo,
  "resumeUrl": resumeFile.asset->url
}`

const FALLBACK = {
  greeting: 'hello!',
  name: "I'm Vamsi",
  role: 'ui developer · react',
  bio: 'Senior Frontend Engineer with 6+ years in React, TypeScript & GraphQL. Started at Standard Chartered Bank architecting corporate banking migrations, then moved to SigFig leading teams that ship LLM-powered financial features. IIT Kharagpur grad — Cursor & Claude are my daily tools.',
  photoUrl: null,
  resumeUrl: null,
}

export function useAboutMe() {
  const isSanityConfigured = Boolean(process.env.REACT_APP_SANITY_PROJECT_ID)

  const [data, setData] = useState(FALLBACK)
  const [loading, setLoading] = useState(isSanityConfigured)

  useEffect(() => {
    if (!isSanityConfigured) return

    let cancelled = false

    sanityClient
      ?.fetch(QUERY)
      .then((doc) => {
        if (!cancelled && doc) {
          setData({
            greeting: doc.greeting || FALLBACK.greeting,
            name: doc.name || FALLBACK.name,
            role: doc.role || FALLBACK.role,
            bio: doc.bio || FALLBACK.bio,
            photoUrl: doc.photo ? urlFor(doc.photo).width(1200).url() : null,
            resumeUrl: doc.resumeUrl || null,
          })
        }
        if (!cancelled) setLoading(false)
      })
      .catch((err) => {
        console.error('[Sanity] Failed to fetch aboutMe:', err)
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isSanityConfigured])

  return { data, loading }
}
