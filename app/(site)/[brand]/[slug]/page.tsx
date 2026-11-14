import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {BrandServicePage} from '@/components/landing/BrandServicePage'
import {getBrands, getPublishedPageList} from '@/lib/data'
import {slugify} from '@/lib/brands.mjs'
import {sanityFetch} from '@/sanity/client'
import {imageUrl} from '@/sanity/image'
import {PAGE_QUERY} from '@/sanity/queries'

type Props = {params: Promise<{brand: string; slug: string}>}
/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>

// The page's brand segment comes from its Brand field, e.g. "Briggs & Stratton" -> briggs-and-stratton.
const brandSlugOf = (doc: Doc) => slugify(String(doc.brand || ''))

export async function generateStaticParams() {
  return (await getPublishedPageList()).map((p) => ({brand: slugify(p.brand), slug: p.slug}))
}

async function loadPage(params: Props['params']) {
  const {brand, slug} = await params
  const doc = await sanityFetch<Doc | null>(PAGE_QUERY, {slug})
  if (!doc || brandSlugOf(doc) !== brand) return null
  return doc
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const doc = await loadPage(params)
  if (!doc) return {}
  const path = `/brands/${brandSlugOf(doc)}/${doc.slug?.current}`
  const ogImage = imageUrl(doc.hero?.backgroundImage, 1200)
  return {
    title: {absolute: doc.seo?.metaTitle || doc.title},
    description: doc.seo?.metaDescription,
    alternates: {canonical: path},
    openGraph: {title: doc.seo?.metaTitle || doc.title, description: doc.seo?.metaDescription, url: path, images: ogImage ? [ogImage] : undefined},
  }
}

// /brands/<brand>/<page>: the brand service page written in Sanity.
export default async function BrandServiceRoute({params}: Props) {
  const doc = await loadPage(params)
  if (!doc) notFound()
  const brands = await getBrands()
  const brandLinks = brands.map((b: {name: string; slug: string}) => ({name: b.name, href: `/brands/${b.slug}`}))
  return <BrandServicePage doc={doc} brandHref={`/brands/${brandSlugOf(doc)}`} brandLinks={brandLinks} />
}
