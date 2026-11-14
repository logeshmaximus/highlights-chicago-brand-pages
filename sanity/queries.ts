import {groq} from 'next-sanity'

export const BRAND_PAGE_TYPE = 'brandServiceLandingPageTemplate'

// Every brand page (published, or drafts in preview), for the listings and the sitemap.
// The internal template document is not a page.
export const PAGE_LIST_QUERY = groq`*[_type == "${BRAND_PAGE_TYPE}" && defined(slug.current) && !(_id in ["brand-service-landing-page-template", "drafts.brand-service-landing-page-template"])]{
  brand, title, service, "slug": slug.current, _updatedAt
}`

export const PAGE_QUERY = groq`*[_type == "${BRAND_PAGE_TYPE}" && slug.current == $slug && !(_id in ["brand-service-landing-page-template", "drafts.brand-service-landing-page-template"])][0]`
