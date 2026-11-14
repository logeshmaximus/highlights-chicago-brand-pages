import 'server-only'
import {draftMode} from 'next/headers'
import {createClient, type QueryParams} from 'next-sanity'
import {apiVersion, dataset, projectId, readToken} from './env'

export const client = createClient({projectId, dataset, apiVersion, useCdn: false})

// Every published read is cached under this tag; the webhook (/api/revalidate) clears it on publish.
export const BRAND_TAG = 'brand-pages'

/**
 * Published content normally; drafts when the Studio's preview (draft mode) is on.
 * The token is sent in both cases so the dataset can stay private.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  const preview = (await draftMode()).isEnabled
  if (preview) {
    return client.fetch<T>(query, params, {perspective: 'drafts', token: readToken, useCdn: false, cache: 'no-store'})
  }
  return client.fetch<T>(query, params, {perspective: 'published', token: readToken, next: {tags: [BRAND_TAG], revalidate: 3600}})
}

/** Published content only, for build-time work (static paths, sitemap) where there is no request. */
export function publishedFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params, {perspective: 'published', token: readToken, next: {tags: [BRAND_TAG], revalidate: 3600}})
}
