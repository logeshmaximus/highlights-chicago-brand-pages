import type {NextConfig} from 'next'

// The live site serves these pages at www.highlightschicago.com/brands through a Cloudflare Worker that
// forwards /brands* to this Vercel app unchanged, so every route, asset and link lives under /brands.
const siteUrl = process.env.NEXT_SITE_URL || ''
const isLive = /(^|\.)highlightschicago\.com$/i.test(siteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, ''))

const nextConfig: NextConfig = {
  basePath: '/brands',
  poweredByHeader: false,
  reactStrictMode: true,
  // The Studio runs in the browser and needs the project id and dataset there. They are public identifiers,
  // not secrets, so they are passed through by name instead of using NEXT_PUBLIC_ variables.
  env: {
    NEXT_SANITY_PROJECT_ID: process.env.NEXT_SANITY_PROJECT_ID,
    NEXT_SANITY_DATASET: process.env.NEXT_SANITY_DATASET,
    NEXT_SANITY_API_VERSION: process.env.NEXT_SANITY_API_VERSION,
  },
  images: {remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}]},
  async redirects() {
    return [
      // The bare Vercel address and /studio (outside the basePath) go to the brands page and the Studio.
      {source: '/', destination: '/brands', permanent: false, basePath: false},
      {source: '/studio', destination: '/brands/studio', permanent: false, basePath: false},
      {source: '/studio/:path*', destination: '/brands/studio/:path*', permanent: false, basePath: false},
    ]
  },
  // The Sanity webhook calls /api/revalidate on the Vercel address; vercel.json rewrites that to
  // /brands/api/revalidate (Next.js cannot rewrite outside its basePath).
  async headers() {
    const noindex = [{key: 'X-Robots-Tag', value: 'noindex, nofollow'}]
    // Until NEXT_SITE_URL is the live domain, nothing is indexed anywhere.
    if (!isLive) return [{source: '/:path*', headers: noindex}]
    return [
      // Live: a page is indexable only when it reaches us through the Cloudflare Worker on
      // www.highlightschicago.com, which adds "x-hc-proxy: brands". The same page opened on the
      // vercel.app address stays noindex, so Google never indexes a duplicate copy.
      {source: '/:path*', missing: [{type: 'header', key: 'x-hc-proxy', value: 'brands'}], headers: noindex},
      // The Studio and the API routes are never indexed, whichever address serves them.
      {source: '/studio/:path*', headers: noindex},
      {source: '/studio', headers: noindex},
      {source: '/api/:path*', headers: noindex},
    ]
  },
}

export default nextConfig
