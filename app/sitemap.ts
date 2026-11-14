import type {MetadataRoute} from 'next'
import {getPublishedPageList} from '@/lib/data'
import {buildBrands, slugify} from '@/lib/brands.mjs'
import {siteUrl} from '@/sanity/env'

// /brands/sitemap.xml: the brands page, every brand page and every published brand service page.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPageList()
  const brands = buildBrands(pages)
  return [
    {url: `${siteUrl}/brands`},
    ...brands.map((b: {slug: string}) => ({url: `${siteUrl}/brands/${b.slug}`})),
    ...pages.map((p) => ({url: `${siteUrl}/brands/${slugify(p.brand)}/${p.slug}`, lastModified: p._updatedAt})),
  ]
}
