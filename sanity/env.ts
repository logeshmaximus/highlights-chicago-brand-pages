// Environment for the Brand Service Pages Sanity project. Names match .env.example (no NEXT_PUBLIC_ names).
// The project id, dataset and API version are public identifiers; next.config.ts passes them to the
// browser for the Studio. The token and the revalidate secret stay on the server.

function usable(value: string | undefined): string | undefined {
  if (!value || /^(paste|PASTE_|your_)/i.test(value)) return undefined
  return value
}

export const projectId = process.env.NEXT_SANITY_PROJECT_ID || 'x6yq02oi'
export const dataset = process.env.NEXT_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_SANITY_API_VERSION || '2025-01-01'
export const siteUrl = (process.env.NEXT_SITE_URL || 'https://brand-service-page.vercel.app').replace(/\/$/, '')
export const studioUrl = process.env.NEXT_SANITY_STUDIO_URL || '/brands/studio'
export const readToken = usable(process.env.SANITY_API_READ_TOKEN)
export const revalidateSecret = usable(process.env.SANITY_REVALIDATE_SECRET)

// Pages may be indexed only once the app is served from the live domain.
export const isLive = /(^|\.)highlightschicago\.com$/i.test(siteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, ''))
