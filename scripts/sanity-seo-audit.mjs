// SEO audit of every brand service page in Sanity: meta title/description, slug, canonical, and any
// noindex / nofollow / robots value anywhere in the document (there should be none).
import {createClient} from 'next-sanity'
const c = createClient({projectId: process.env.NEXT_SANITY_PROJECT_ID, dataset: process.env.NEXT_SANITY_DATASET,
  apiVersion: '2024-01-01', token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN, useCdn: false, perspective: 'raw'})
const docs = await c.fetch(`*[_type=="brandServiceLandingPageTemplate"]|order(_id)`)
const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const bad = []
for (const d of docs) {
  const hits = []
  const walk = (v, p) => {
    if (typeof v === 'string') { if (/no-?index|no-?follow|robots/i.test(v)) hits.push(`${p}: ${v.slice(0, 80)}`); return }
    if (typeof v === 'boolean' && /index|robots|hidden/i.test(p)) hits.push(`${p}=${v}`)
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${p}[${i}]`))
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (/index|robots|follow/i.test(k)) hits.push(`key ${p}.${k}`); if (!k.startsWith('_')) walk(x, p ? `${p}.${k}` : k) }
  }
  walk(d, '')
  const s = d.seo || {}, slug = d.slug?.current, path = `/brands/${slugify(d.brand || '')}/${slug}`
  const canon = s.canonicalUrl || ''
  const issues = []
  if (!s.metaTitle) issues.push('no meta title'); else if (s.metaTitle.length > 60) issues.push(`meta title ${s.metaTitle.length} chars`)
  if (!s.metaDescription) issues.push('no meta description'); else if (s.metaDescription.length > 160) issues.push(`meta description ${s.metaDescription.length} chars`)
  if (!slug) issues.push('no slug')
  if (canon && !canon.endsWith(path)) issues.push(`canonical ${canon} does not match ${path}`)
  if (hits.length) issues.push(...hits.map((h) => `robots-like value: ${h}`))
  console.log(`${d._id.padEnd(62)} ${path}`)
  console.log(`   title(${(s.metaTitle||'').length}) desc(${(s.metaDescription||'').length}) canonical: ${canon || '(empty, site uses its own path)'}${s.shareImage || s.ogImage ? ' shareImage:set' : ''}`)
  if (issues.length) { console.log('   ISSUES: ' + issues.join(' | ')); bad.push(d._id) }
  const extra = Object.keys(s).filter((k) => !['metaTitle', 'metaDescription', 'canonicalUrl'].includes(k))
  if (extra.length) console.log('   other seo fields: ' + extra.join(', '))
}
console.log(`\n${docs.length} documents, ${bad.length} with issues`)
