// For each brand service page: which image fields have no picture, and any "[CONFIRM: ...]" notes.
import {createClient} from 'next-sanity'
import {writeFileSync} from 'node:fs'
const client = createClient({projectId: process.env.NEXT_SANITY_PROJECT_ID, dataset: process.env.NEXT_SANITY_DATASET,
  apiVersion: '2024-01-01', token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN, useCdn: false, perspective: 'raw'})
const docs = await client.fetch(`*[_type=="brandServiceLandingPageTemplate" && !(_id match "*brand-service-landing-page-template")]|order(_id)`)
if (process.argv[2]) writeFileSync(process.argv[2], JSON.stringify(docs, null, 1))
for (const d of docs) {
  const miss = {}, have = {}, notes = []
  const walk = (v, p) => {
    if (typeof v === 'string') { const m = v.match(/\[(CONFIRM|TODO|NOTE)[^\]]*\]/gi); if (m) notes.push(p) ; return }
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${p}[${i}]`))
    if (v && typeof v === 'object') {
      if (v._type === 'imageWithAlt' || v._type === 'image' || 'asset' in v) {
        const k = p.replace(/\[\d+\]/g, '[]'); (v.asset ? have : miss)[k] = ((v.asset ? have : miss)[k] || 0) + 1
      }
      for (const [k, x] of Object.entries(v)) if (!k.startsWith('_') && k !== 'asset') walk(x, p ? `${p}.${k}` : k)
    }
  }
  walk(d, '')
  console.log(`\n== ${d._id} (${d.brand})`)
  console.log('  missing:', JSON.stringify(miss))
  console.log('  have   :', JSON.stringify(have))
  if (notes.length) console.log('  notes  :', notes.join(', '))
}
