import { useState, useEffect } from 'react'
import { optimizedImageUrl } from '../lib/sanityClient'
import { fetchCached } from '../lib/sanityCache'

const QUERY = `*[_type == "aboutMe"][0] {
  greeting,
  name,
  role,
  tagline,
  accentLine,
  location,
  subtitle,
  bio,
  photo,
  "resumeUrl": resumeFile.asset->url
}`

const FALLBACK = {
  greeting: 'hello!',
  name: 'Vamsi Vinay Kumar',
  role: 'full-stack engineer · ai-first',
  tagline: 'A full-stack engineer who ships products AI-first',
  accentLine: 'I BUILD FAST, AI-FIRST, AND END-TO-END.',
  location: 'Hyderabad, India',
  subtitle: 'Founder @ Livil · Engineering @ SigFig',
  bio: 'Senior engineer (6+ yrs · React · TypeScript · Node) who builds and ships end-to-end — frontend, backend and infra. I work AI-first: Claude & Claude Code are how I design schemas, write services and move fast. Founder of Livil, a real-time social-music app I architected and shipped solo to Google Play (44 releases). Ex-Standard Chartered, now @ SigFig shipping LLM-powered financial features. IIT Kharagpur.',
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

    fetchCached(QUERY)
      .then((doc) => {
        if (!cancelled && doc) {
          setData({
            greeting: doc.greeting || FALLBACK.greeting,
            name: doc.name || FALLBACK.name,
            role: doc.role || FALLBACK.role,
            tagline: doc.tagline || FALLBACK.tagline,
            accentLine: doc.accentLine || FALLBACK.accentLine,
            location: doc.location || FALLBACK.location,
            subtitle: doc.subtitle || FALLBACK.subtitle,
            bio: doc.bio || FALLBACK.bio,
            photoUrl: doc.photo ? optimizedImageUrl(doc.photo, { width: 800 }) : null,
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
