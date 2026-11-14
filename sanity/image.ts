import {createImageUrlBuilder} from '@sanity/image-url'
import {dataset, projectId} from './env'

const builder = createImageUrlBuilder({projectId, dataset})

export type SanityImage = {asset?: {_ref?: string}; alt?: string; caption?: string; hotspot?: unknown; crop?: unknown} | null | undefined

/** A sized, compressed URL for a Sanity image, or null when the field is empty. */
export function imageUrl(image: SanityImage, width = 1600): string | null {
  if (!image?.asset?._ref) return null
  return builder.image(image).width(width).fit('max').auto('format').quality(80).url()
}
