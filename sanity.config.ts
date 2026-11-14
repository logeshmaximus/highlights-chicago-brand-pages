'use client'

// The Brand Service Pages Studio, built into the site at /brands/studio. Same project and schema as
// hc-brand-service-pages.sanity.studio, plus a Presentation tab that shows each page as it will look,
// drafts included, next to the editor.
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'

const projectId = process.env.NEXT_SANITY_PROJECT_ID || 'x6yq02oi'
const dataset = process.env.NEXT_SANITY_DATASET || 'production'

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const pagePath = (brand?: string, slug?: string) => (brand && slug ? `/brands/${slugify(brand)}/${slug}` : '/brands')

export default defineConfig({
  name: 'default',
  title: 'Brand Service Pages',
  projectId,
  dataset,
  basePath: '/brands/studio',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {initial: '/brands', previewMode: {enable: '/brands/api/draft-mode/enable', disable: '/brands/api/draft-mode/disable'}},
      resolve: {
        mainDocuments: defineDocuments([
          {route: '/brands/:brand/:slug', filter: `_type == "brandServiceLandingPageTemplate" && slug.current == $slug`},
        ]),
        locations: {
          brandServiceLandingPageTemplate: defineLocations({
            select: {title: 'title', brand: 'brand', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.title || 'Brand page', href: pagePath(doc?.brand, doc?.slug)},
                {title: 'All brands', href: '/brands'},
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
