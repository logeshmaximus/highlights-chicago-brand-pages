// Lists every image asset in the dataset with the alt texts it is used with, to reuse real photos.
import {createClient} from 'next-sanity'
import {writeFileSync} from 'node:fs'
const client = createClient({projectId: process.env.NEXT_SANITY_PROJECT_ID, dataset: process.env.NEXT_SANITY_DATASET,
  apiVersion: '2024-01-01', token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN, useCdn: false, perspective: 'raw'})
const assets = await client.fetch(`*[_type=="sanity.imageAsset"]{_id,originalFilename,"w":metadata.dimensions.width,"h":metadata.dimensions.height,url}`)
const docs = await client.fetch(`*[_type=="brandServiceLandingPageTemplate"]`)
const uses = {}
const walk = (v, p, id) => {
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${p}[${i}]`, id))
  if (v && typeof v === 'object') {
    if (v.asset?._ref) (uses[v.asset._ref] ||= []).push(`${id.replace(/^drafts\.|bsp-/g, '')} ${p}: ${v.alt || ''}`)
    for (const [k, x] of Object.entries(v)) if (!k.startsWith('_') && k !== 'asset') walk(x, p ? `${p}.${k}` : k, id)
  }
}
docs.forEach((d) => walk(d, '', d._id))
const out = assets.map((a) => ({...a, uses: uses[a._id] || []}))
writeFileSync(process.argv[2], JSON.stringify(out, null, 1))
console.log(assets.length, 'assets;', out.filter((a) => a.uses.length).length, 'in use')
