import { sanityClient } from './sanityClient'

const cache = new Map()

/**
 * Deduplicates in-flight and completed Sanity fetches for the lifetime of the session.
 */
export function fetchCached(query, params = {}) {
  if (!sanityClient) {
    return Promise.reject(new Error('Sanity client is not configured'))
  }

  const key = `${query}::${JSON.stringify(params)}`
  if (cache.has(key)) {
    return cache.get(key)
  }

  const promise = sanityClient
    .fetch(query, params)
    .then((data) => {
      cache.set(key, Promise.resolve(data))
      return data
    })
    .catch((err) => {
      cache.delete(key)
      throw err
    })

  cache.set(key, promise)
  return promise
}
