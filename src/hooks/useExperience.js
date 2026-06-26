import { useState, useEffect } from 'react'
import { optimizedImageUrl } from '../lib/sanityClient'
import { fetchCached } from '../lib/sanityCache'
import sigfigLogo from '../assets/experience/sigfig-logo.png'
import standardCharteredLogo from '../assets/experience/standard-chartered-logo.png'
import iitKharagpurLogo from '../assets/experience/iit-kharagpur-logo.png'

const FALLBACK_LOGOS = {
  SigFig: sigfigLogo,
  'Standard Chartered Bank': standardCharteredLogo,
  'IIT Kharagpur': iitKharagpurLogo,
}

const QUERY = `*[_type == "experience"][0] {
  sectionLabel,
  heading,
  headingAccent,
  subHeading,
  narrative,
  companies[] {
    companyName,
    logo,
    totalDuration,
    roles[] {
      roleTitle,
      dateRange
    }
  }
}`

const FALLBACK = {
  sectionLabel: 'What shaped me',
  heading: 'Years of',
  headingAccent: 'building with intent',
  subHeading: 'Context over chronology',
  narrative:
    'My path didn\u2019t follow a straight line \u2014 it deepened. At Standard Chartered, I learned what enterprise software actually demands: large-scale migrations, test coverage that earns trust, and shipping calmly inside regulated environments. At SigFig, that rigor met product velocity \u2014 leading teams, wiring LLM-powered features into production, and treating AI as a daily engineering tool rather than a slide-deck promise. Each stop taught me something the last one couldn\u2019t.',
  companies: [
    {
      companyName: 'SigFig',
      logoUrl: sigfigLogo,
      totalDuration: '4 yrs',
      roles: [
        { roleTitle: 'Software Development Engineer 2', dateRange: 'Dec 2023 to Present' },
        { roleTitle: 'Software Development Engineer 1', dateRange: 'Jun 2022 to Nov 2023' },
      ],
    },
    {
      companyName: 'Standard Chartered Bank',
      logoUrl: standardCharteredLogo,
      totalDuration: '3 yrs',
      roles: [{ roleTitle: 'Development Architect', dateRange: 'Jun 2019 to Jun 2022' }],
    },
    {
      companyName: 'IIT Kharagpur',
      logoUrl: iitKharagpurLogo,
      totalDuration: '4 yrs',
      roles: [
        { roleTitle: 'B.Tech · Manufacturing Science & Engineering', dateRange: '2015 to 2019' },
      ],
    },
  ],
}

function mapCompanies(companies = []) {
  return companies.map((company) => ({
    companyName: company.companyName,
    logoUrl: company.logo
      ? optimizedImageUrl(company.logo, { width: 160 })
      : FALLBACK_LOGOS[company.companyName] || null,
    totalDuration: company.totalDuration || '',
    roles: (company.roles || []).map((role) => ({
      roleTitle: role.roleTitle,
      dateRange: role.dateRange,
    })),
  }))
}

export function useExperience() {
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
            subHeading: doc.subHeading || FALLBACK.subHeading,
            narrative: doc.narrative || FALLBACK.narrative,
            companies: doc.companies?.length ? mapCompanies(doc.companies) : FALLBACK.companies,
          })
        }
        if (!cancelled) setLoading(false)
      })
      .catch((err) => {
        console.error('[Sanity] Failed to fetch experience:', err)
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isSanityConfigured])

  return { data, loading }
}
