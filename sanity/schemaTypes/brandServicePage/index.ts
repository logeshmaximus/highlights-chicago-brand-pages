import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageWithAlt, linkItem, sheetPrice, titleText} from './shared'
import {sectionTypes} from './sections'

// Brand service landing page template. One document per brand page
// (for example "Generac Generator Installation & Repair in Chicago").
// Fields follow the Paper design "HC · Generac generator brand page" section by section, top to bottom.

const section = (name: string, title: string, type: string, group: string) => defineField({name, title, type, group})

export const brandServiceLandingPageTemplate = defineType({
  name: 'brandServiceLandingPageTemplate',
  title: 'Brand service page',
  type: 'document',
  groups: [
    {name: 'page', title: 'Page and SEO', default: true},
    {name: 'chrome', title: 'Header and footer'},
    {name: 'top', title: 'Hero'},
    {name: 'explain', title: 'Services and models'},
    {name: 'decide', title: 'Choosing and sizing'},
    {name: 'cost', title: 'Cost'},
    {name: 'trust', title: 'Trust and reviews'},
    {name: 'close', title: 'FAQ and closing'},
    {name: 'library', title: 'Library'},
  ],
  fields: [
    defineField({name: 'title', title: 'Document name', type: 'string', group: 'page', description: 'Internal name in the studio list.', validation: (rule) => rule.required()}),
    defineField({name: 'brand', title: 'Brand', type: 'string', group: 'page', description: 'For example "Generac".', validation: (rule) => rule.required()}),
    defineField({name: 'service', title: 'Service', type: 'string', group: 'page', description: 'For example "Generator Installation & Repair".'}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', group: 'page', options: {source: (doc: any) => `${doc.brand ?? ''} ${doc.service ?? ''}`}, validation: (rule) => rule.required()}),
    defineField({name: 'breadcrumb', title: 'Breadcrumb', type: 'array', group: 'page', of: [defineArrayMember({type: 'string'})], description: 'For example Home › Brands › Generac › Generac Generator Installation & Repair.'}),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'page',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta title', type: 'string', validation: (rule) => rule.max(60).warning()}),
        defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(160).warning()}),
      ],
    }),

    section('header', '01–02 · Utility bar and main nav', 'siteHeaderSection', 'chrome'),
    section('footer', '17 · Footer', 'siteFooterSection', 'chrome'),
    section('bookingToggle', 'Booking toggle (bottom-right pill)', 'bookingToggle', 'chrome'),

    section('hero', '03 · Hero and quote form', 'heroSection', 'top'),
    section('jumpBar', 'On this page (bar under the hero)', 'jumpBar', 'top'),

    section('services', '04 · Services we provide', 'servicesSection', 'explain'),
    section('models', '05 · Models we work on', 'modelsSection', 'explain'),
    section('modelMatrix', '06 · Services for each model', 'modelMatrixSection', 'explain'),
    section('parts', '07 · Every part we look after', 'partsSection', 'explain'),

    section('comparison', '08 · Which option fits your home', 'comparisonSection', 'decide'),
    section('scope', '09 · What it has to keep running', 'scopeSection', 'decide'),
    section('estimateChecks', '10 · What we check at the free estimate', 'estimateChecksSection', 'decide'),
    section('installations', '11 · What an installation looks like', 'installationsSection', 'decide'),

    section('pricing', '12 · What it costs with us', 'pricingSection', 'cost'),

    section('trust', '13 · Who does the work', 'trustSection', 'trust'),
    section('reviews', '14 · Reviews', 'reviewsSection', 'trust'),
    section('process', '15 · How it works', 'processSection', 'trust'),
    section('areas', '16 · Where we work', 'areasSection', 'trust'),

    section('faq', '17 · FAQ', 'faqSection', 'close'),
    section('closing', '18 · Closing call to action', 'closingSection', 'close'),
    section('otherBrands', '19 · Other brands and equipment', 'otherBrandsSection', 'close'),

    section('library', '20 · Chicago electrical library', 'librarySection', 'library'),
  ],
  preview: {
    select: {title: 'title', brand: 'brand', service: 'service', media: 'hero.backgroundImage'},
    prepare: ({title, brand, service, media}) => ({title, subtitle: [brand, service].filter(Boolean).join(' · '), media}),
  },
})

export const brandServicePageTypes = [imageWithAlt, titleText, sheetPrice, linkItem, ...sectionTypes, brandServiceLandingPageTemplate]
