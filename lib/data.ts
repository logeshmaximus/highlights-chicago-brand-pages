import 'server-only'
import {publishedFetch, sanityFetch} from '@/sanity/client'
import {PAGE_LIST_QUERY} from '@/sanity/queries'
import {buildBrands} from './brands.mjs'

export type PageListItem = {brand: string; title?: string; service?: string; slug: string; _updatedAt?: string}

/** The brand pages in Sanity: published ones normally, drafts too in the Studio preview. */
export async function getPageList(): Promise<PageListItem[]> {
  try {
    return (await sanityFetch<PageListItem[]>(PAGE_LIST_QUERY)) || []
  } catch (error) {
    // The listings still render (with no page marked written) if Sanity cannot be reached.
    console.error('Brand page list could not be loaded from Sanity', error)
    return []
  }
}

/** Every brand from the sheet, with the Sanity pages marked live, in written-first order. */
export async function getBrands() {
  return buildBrands(await getPageList())
}

/** Published brand pages only (no preview), for static paths and the sitemap. */
export async function getPublishedPageList(): Promise<PageListItem[]> {
  try {
    return (await publishedFetch<PageListItem[]>(PAGE_LIST_QUERY)) || []
  } catch (error) {
    console.error('Published brand page list could not be loaded from Sanity', error)
    return []
  }
}
