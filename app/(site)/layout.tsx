import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import Script from 'next/script'
import {VisualEditing} from 'next-sanity/visual-editing'
import {siteUrl, isLive} from '@/sanity/env'
import {siteHeader} from '@/lib/site-nav.mjs'
import {hcFooter} from '@/lib/ui.mjs'

const BASE = '/brands/'
// Changes with every deploy, so browsers never keep an old copy of the stylesheets and scripts.
const V = (process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now())).slice(0, 8)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {default: 'Electrical brands in Chicago | Highlights Chicago', template: '%s | Highlights Chicago'},
  robots: isLive ? {index: true, follow: true} : {index: false, follow: false},
  icons: {icon: `${BASE}icons/highlights-chicago-32.png`, apple: `${BASE}icons/highlights-chicago-180.png`},
}

// Stylesheets from the Highlights Chicago Design System v3 build (the same files as the live /services pages),
// plus the shared header and the brand page sections.
const CSS = ['inter.css', 'ds.css', 'site.css', 'preview.css', 'site-nav.css', 'brand-page.css']

export default async function SiteLayout({children}: {children: React.ReactNode}) {
  const preview = (await draftMode()).isEnabled
  return (
    <html lang="en">
      <head>
        {CSS.map((f) => <link key={f} rel="stylesheet" href={`${BASE}assets/css/${f}?v=${V}`} />)}
      </head>
      <body className="inter_c15e96cb-module__0bjUvq__variable">
        {preview && (
          <div className="bp-preview-bar" role="note">
            Preview: you are seeing drafts. <a href={`${BASE}api/draft-mode/disable`}>Leave preview</a>
          </div>
        )}
        <div className="collection-page">
          <div dangerouslySetInnerHTML={{__html: siteHeader({logoSrc: `${BASE}images/v3/logos/highlights-chicago-logo.webp`, brandsHref: '/brands', current: 'brands'})}} />
          <main id="main">{children}</main>
          <div dangerouslySetInnerHTML={{__html: hcFooter(BASE)}} />
        </div>
        <Script src={`${BASE}assets/js/site-nav.js?v=${V}`} strategy="afterInteractive" />
        <Script src={`${BASE}assets/js/site.js?v=${V}`} strategy="afterInteractive" />
        {preview && <VisualEditing />}
      </body>
    </html>
  )
}
