// Lists every brand service page in Sanity (published and drafts) with what is missing.
// Run: node --env-file=.env.local scripts/sanity-list.mjs   (the token is read from the env file, never printed)
import {createClient} from 'next-sanity'
const client = createClient({
  projectId: process.env.NEXT_SANITY_PROJECT_ID, dataset: process.env.NEXT_SANITY_DATASET,
  apiVersion: '2024-01-01', token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false, perspective: 'raw',
})
const docs = await client.fetch(`*[_type=="brandServiceLandingPageTemplate" && !(_id match "*brand-service-landing-page-template")]{_id,brand,title,"slug":slug.current}|order(_id)`)
for (const d of docs) console.log(d._id.padEnd(70), '|', d.brand, '|', d.slug)
console.log(docs.length, 'documents')
