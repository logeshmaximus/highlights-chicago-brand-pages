import type {Metadata} from 'next'
import {getBrands} from '@/lib/data'
import {hubBody} from '@/lib/collections.mjs'

export const metadata: Metadata = {
  title: {absolute: 'Electrical brands in Chicago | Highlights Chicago'},
  description: 'Generators, EV chargers, batteries, panels, fans and smart devices by brand, wired by Highlights Chicago, a City of Chicago licensed electrical contractor.',
  alternates: {canonical: '/brands'},
}

// /brands: every brand, the ones with written pages first.
export default async function BrandsPage() {
  const brands = await getBrands()
  return <div dangerouslySetInnerHTML={{__html: hubBody(brands)}} />
}
