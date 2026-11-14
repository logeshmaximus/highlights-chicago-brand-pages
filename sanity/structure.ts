import type {StructureResolver} from 'sanity/structure'

// The template document: the blank example new brand pages are copied from. It is not a page on the site.
export const TEMPLATE_ID = 'brand-service-landing-page-template'
const TYPE = 'brandServiceLandingPageTemplate'

// Studio sidebar:
//   Brand service pages  - every real brand page (drafts and published), without the template
//   BS template          - the template document on its own
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Brand service pages')
        .schemaType(TYPE)
        .child(
          S.documentTypeList(TYPE)
            .title('Brand service pages')
            .filter('_type == $type && !(_id in [$id, $draftId])')
            .params({type: TYPE, id: TEMPLATE_ID, draftId: `drafts.${TEMPLATE_ID}`}),
        ),
      S.divider(),
      S.listItem()
        .title('BS template')
        .schemaType(TYPE)
        .child(S.document().schemaType(TYPE).documentId(TEMPLATE_ID).title('BS template')),
    ])
