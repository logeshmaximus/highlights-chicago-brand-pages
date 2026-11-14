import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'
import {BRAND_TAG} from '@/sanity/client'
import {revalidateSecret} from '@/sanity/env'
import {BRAND_PAGE_TYPE} from '@/sanity/queries'

type Payload = {_type?: string; slug?: string; brand?: string}

// Called by the Sanity webhook "Brand pages → Vercel" on create, update and delete of a published page.
// Sanity is set to https://brand-service-page.vercel.app/api/revalidate; next.config.ts rewrites that here.
export async function POST(request: NextRequest) {
  if (!revalidateSecret) return NextResponse.json({message: 'SANITY_REVALIDATE_SECRET is not set'}, {status: 503})
  const {isValidSignature, body} = await parseBody<Payload>(request, revalidateSecret, true)
  if (!isValidSignature) return NextResponse.json({message: 'Invalid signature'}, {status: 401})
  if (body?._type !== BRAND_PAGE_TYPE) return NextResponse.json({message: 'Not a brand page'}, {status: 400})
  // One publish can change the listings (written pages sort first) as well as the page, so refresh them all.
  revalidateTag(BRAND_TAG, 'max')
  return NextResponse.json({revalidated: true, slug: body.slug ?? null})
}
