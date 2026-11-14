import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getBrands} from '@/lib/data'
import {buildBrands} from '@/lib/brands.mjs'
import {brandBody, brandIntroText} from '@/lib/collections.mjs'

type Props = {params: Promise<{brand: string}>}

export function generateStaticParams() {
  return buildBrands([]).map((b: {slug: string}) => ({brand: b.slug}))
}

async function findBrand(slug: string) {
  return (await getBrands()).find((b: {slug: string}) => b.slug === slug)
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const b = await findBrand((await params).brand)
  if (!b) return {}
  return {
    title: {absolute: `${b.name} services in Chicago | Highlights Chicago`},
    description: String(brandIntroText(b)).slice(0, 158),
    alternates: {canonical: `/brands/${b.slug}`},
  }
}

// /brands/<brand>: that brand's services, written pages first.
export default async function BrandPage({params}: Props) {
  const b = await findBrand((await params).brand)
  if (!b) notFound()
  return <div dangerouslySetInnerHTML={{__html: brandBody(b)}} />
}
