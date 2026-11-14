// Cloudflare Worker: serves www.highlightschicago.com/brands* from the brand pages Vercel app.
// Route: www.highlightschicago.com/brands*   (Zone: highlightschicago.com)
// Optional route: www.highlightschicago.com/robots.txt  (adds the brands sitemap line, see below)
//
// The Vercel app is built with basePath /brands, so paths are forwarded unchanged:
//   www.highlightschicago.com/brands/nest/...  ->  brand-service-page.vercel.app/brands/nest/...
// Every forwarded request carries "x-hc-proxy: brands"; the app only lets pages be indexed when that
// header is present, so the vercel.app copy is never indexed.

const ORIGIN = 'https://brand-service-page.vercel.app'
const LIVE = 'https://www.highlightschicago.com'
const BRANDS_SITEMAP = `${LIVE}/brands/sitemap.xml`

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/robots.txt') return robots(request)

    // The route "/brands*" also matches paths like /brandsxyz; those belong to the main site.
    if (!(url.pathname === '/brands' || url.pathname.startsWith('/brands/'))) return fetch(request)

    // The Studio and the API routes stay on the Vercel address only.
    if (/^\/brands\/studio(\/|$)/.test(url.pathname)) return Response.redirect(`${ORIGIN}${url.pathname}${url.search}`, 302)
    if (/^\/brands\/api(\/|$)/.test(url.pathname)) return new Response('Not found', {status: 404})

    const headers = new Headers(request.headers)
    headers.set('x-hc-proxy', 'brands')
    headers.set('x-forwarded-host', url.host)
    headers.set('x-forwarded-proto', 'https')
    headers.delete('cookie') // the main site's cookies are not needed by the brand pages

    const upstream = await fetch(`${ORIGIN}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'manual',
    })

    const response = new Response(upstream.body, upstream)
    // Redirects from the app must keep visitors on the live domain.
    const location = response.headers.get('location')
    if (location && location.startsWith(ORIGIN)) response.headers.set('location', LIVE + location.slice(ORIGIN.length))
    response.headers.delete('set-cookie')
    return response
  },
}

// Adds "Sitemap: https://www.highlightschicago.com/brands/sitemap.xml" to the live robots.txt
// when it is not there yet. Only runs if the optional robots.txt route is added.
async function robots(request) {
  const res = await fetch(request)
  if (!res.ok) return res
  const text = await res.text()
  const body = text.includes(BRANDS_SITEMAP) ? text : `${text.trimEnd()}\nSitemap: ${BRANDS_SITEMAP}\n`
  const out = new Response(body, res)
  out.headers.delete('content-length')
  return out
}
