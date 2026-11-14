import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionTitle} from './shared'

// One object type per section of the Paper design "HC · Generac generator brand page",
// in the order the sections appear on the page.

const str = (name: string, title: string, description?: string) => defineField({name, title, type: 'string', description})
const txt = (name: string, title: string, description?: string) => defineField({name, title, type: 'text', rows: 3, description})
const img = (name: string, title: string, description?: string) => defineField({name, title, type: 'imageWithAlt', description})
const strings = (name: string, title: string, description?: string) =>
  defineField({name, title, type: 'array', of: [defineArrayMember({type: 'string'})], description})

const links = (name: string, title: string) => defineField({name, title, type: 'array', of: [defineArrayMember({type: 'linkItem'})]})
const label = (name: string, placeholder: string, title: string) => [str(name, `${title}: label`), str(placeholder, `${title}: placeholder`)]

// 01 · Utility bar + 02 · Main nav
export const siteHeaderSection = defineType({
  name: 'siteHeaderSection',
  title: 'Utility bar and main nav',
  type: 'object',
  fields: [
    str('address', 'Utility bar: address'),
    str('hours', 'Utility bar: hours'),
    str('email', 'Utility bar: email'),
    str('phone', 'Utility bar: phone'),
    img('logo', 'Logo (colour)'),
    links('navLinks', 'Nav links (Home, About Us, Blog, Learning Center)'),
    str('servicesMenuLabel', 'Services menu label'),
    str('phoneButtonLabel', 'Phone button label', 'For example "(773) 262-3333".'),
    str('contactButtonLabel', 'Contact button label', 'For example "Contact us".'),
  ],
})

// 17 · Footer
export const siteFooterSection = defineType({
  name: 'siteFooterSection',
  title: 'Footer',
  type: 'object',
  fields: [
    img('logo', 'Logo (white)'),
    txt('blurb', 'Company blurb'),
    str('aiLinkLabel', 'AI link label', 'For example "Learn about Highlights Chicago with AI".'),
    defineField({
      name: 'columns',
      title: 'Link columns (Company, About Us)',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'footerColumn', fields: [str('title', 'Column title'), links('links', 'Links')], preview: {select: {title: 'title'}}})],
    }),
    str('contactTitle', 'Contact column title'),
    str('addressLabel', 'Address label'),
    txt('address', 'Address'),
    str('phoneLabel', 'Phone label'),
    str('phone', 'Phone'),
    str('emailLabel', 'Email label'),
    str('email', 'Email'),
    defineField({
      name: 'form',
      title: 'Footer quote form',
      type: 'object',
      fields: [
        str('title', 'Title (white part)', 'For example "Request a quick".'),
        str('titleHighlight', 'Title (green part)', 'For example "quote".'),
        txt('intro', 'Intro'),
        ...label('nameLabel', 'namePlaceholder', 'Name'),
        ...label('emailLabel', 'emailPlaceholder', 'Email'),
        ...label('phoneLabel', 'phonePlaceholder', 'Phone'),
        ...label('addressLabel', 'addressPlaceholder', 'Property address'),
        ...label('messageLabel', 'messagePlaceholder', 'Message'),
        str('submitLabel', 'Button label'),
        str('callLabel', '"Or call" text'),
        str('phone', 'Phone'),
      ],
    }),
    str('copyright', 'Copyright line'),
  ],
})

// Booking toggle (fixed bottom-right, shows after the hero)
export const bookingToggle = defineType({
  name: 'bookingToggle',
  title: 'Booking toggle',
  type: 'object',
  fields: [str('label', 'Pill label', 'For example "Book online 24/7".'), str('bookUrl', 'Book online link'), str('callLabel', 'Call option label'), str('phone', 'Phone')],
})

// On this page (bar under the hero)
export const jumpBar = defineType({
  name: 'jumpBar',
  title: 'On this page',
  type: 'object',
  fields: [str('label', 'Label', 'For example "On this page".'), defineField({name: 'links', title: 'Chips', type: 'array', of: [defineArrayMember({type: 'jumpLink'})]})],
})

// 03 · Hero + quote form
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero and quote form',
  type: 'object',
  fields: [
    defineField({
      name: 'rating',
      title: 'Rating line above the headline',
      type: 'object',
      fields: [str('googleRating', 'Google rating'), str('googleCountLabel', 'Google review count link', 'For example "494 Google reviews".'), str('googleUrl', 'Google reviews link'), str('yelpRating', 'Yelp rating'), str('yelpUrl', 'Yelp link')],
    }),
    str('headline', 'Headline (white part)', 'For example "Generac generator installation & repair".'),
    str('headlineHighlight', 'Headline (green part)', 'For example "in Chicago".'),
    txt('lede', 'Intro under the headline'),
    img('backgroundImage', 'Background photo', 'Must show the brand’s equipment at a Chicago home. The subject sits behind or between the text; the hero is never made taller to show it.'),
    str('primaryCtaLabel', 'White button label', 'For example "Call (773) 262-3333".'),
    str('secondaryCtaLabel', 'Outline button label', 'For example "Get a free estimate".'),
    defineField({
      name: 'form',
      title: 'Quote form (navy, footer style)',
      type: 'object',
      fields: [
        str('title', 'Form title (white part)', 'For example "Request a free".'),
        str('titleHighlight', 'Form title (green part)', 'For example "estimate".'),
        txt('intro', 'Line under the title'),
        ...label('nameLabel', 'namePlaceholder', 'Name'),
        ...label('phoneLabel', 'phonePlaceholder', 'Phone number'),
        ...label('addressLabel', 'addressPlaceholder', 'Street or cross streets'),
        str('needLabel', '"What do you need?" label'),
        str('needDefault', 'Option shown selected', 'For example "New installation".'),
        strings('needOptions', '"What do you need?" options'),
        str('modelQuestion', 'Model question', 'For example "Which Generac do you have, or want?".'),
        strings('modelChoices', 'Model choice chips'),
        str('submitLabel', 'Green button label', 'For example "Request service".'),
        str('callLabel', '"Or call" text'),
        str('phone', 'Phone number under the button'),
      ],
    }),
    defineField({
      name: 'mobile',
      title: 'Phone-only hero pieces',
      type: 'object',
      fields: [
        defineField({
          name: 'values',
          title: 'Value strip (3)',
          type: 'array',
          of: [defineArrayMember({type: 'object', name: 'heroValue', fields: [str('value', 'Value'), str('label', 'Label')], preview: {select: {title: 'value', subtitle: 'label'}}})],
        }),
        img('photo', 'Equipment photo under the headline', 'Phones have no form in the hero, so this shows the equipment.'),
        str('symptomsTitle', 'Symptom chips title', 'For example "What is the Generac doing?".'),
        strings('symptoms', 'Symptom chips'),
      ],
    }),
  ],
})

// On this page (bar under the hero)
export const jumpLink = defineType({
  name: 'jumpLink',
  title: 'Jump link',
  type: 'object',
  fields: [str('label', 'Chip label'), str('target', 'Section it jumps to', 'Section key, for example "services".')],
  preview: {select: {title: 'label', subtitle: 'target'}},
})

// 05 · Services (vertical tabs + one box split by lines)
export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services we provide',
  type: 'object',
  fields: [
    sectionTitle(),
    defineField({
      name: 'groups',
      title: 'Service groups (the tabs on the left)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceGroup',
          fields: [
            str('name', 'Tab title'),
            str('summary', 'Line under the tab title'),
            defineField({name: 'items', title: 'Items in the box (4 works best)', type: 'array', of: [defineArrayMember({type: 'titleText'})]}),
          ],
          preview: {select: {title: 'name', subtitle: 'summary'}},
        }),
      ],
    }),
  ],
})

// 04 · Models serviced
export const modelsSection = defineType({
  name: 'modelsSection',
  title: 'Models we work on',
  type: 'object',
  fields: [
    sectionTitle(),
    defineField({
      name: 'models',
      title: 'Model cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'modelCard',
          fields: [
            img('image', 'Product photo', 'From the manufacturer’s own site, on white. No award badges or marketing stickers.'),
            str('series', 'Green label', 'For example "Generac Guardian".'),
            str('name', 'Card title', 'For example "Home standby generator".'),
            txt('text', 'Description'),
            strings('tags', 'Tags'),
          ],
          preview: {select: {title: 'name', subtitle: 'series', media: 'image'}},
        }),
      ],
    }),
  ],
})

// 06 · Services by model (table)
export const modelMatrixSection = defineType({
  name: 'modelMatrixSection',
  title: 'Services for each model (table)',
  type: 'object',
  fields: [
    sectionTitle(),
    str('firstColumnLabel', 'First column heading', 'For example "Service".'),
    defineField({
      name: 'columns',
      title: 'Model columns',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'matrixColumn', fields: [str('series', 'Green label'), str('name', 'Column title'), str('note', 'Line under the title')], preview: {select: {title: 'name', subtitle: 'series'}}})],
    }),
    defineField({
      name: 'rows',
      title: 'Service rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'matrixRow',
          fields: [str('service', 'Service (first column)'), strings('cells', 'One cell per model column, in the same order')],
          preview: {select: {title: 'service'}},
        }),
      ],
    }),
    defineField({
      name: 'costRow',
      title: 'Typical cost row',
      type: 'object',
      fields: [
        str('label', 'Row label', 'For example "Typical cost".'),
        defineField({
          name: 'cells',
          title: 'One cell per model column',
          type: 'array',
          of: [defineArrayMember({type: 'object', name: 'costCell', fields: [str('note', 'Small line above the price'), defineField({name: 'price', title: 'Price', type: 'sheetPrice'})], preview: {select: {title: 'price.display', subtitle: 'note'}}})],
        }),
      ],
    }),
  ],
})

// 08 · Parts carousel
export const partsSection = defineType({
  name: 'partsSection',
  title: 'Every part we look after (carousel)',
  type: 'object',
  fields: [
    sectionTitle(),
    defineField({
      name: 'parts',
      title: 'Part cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partCard',
          fields: [
            img('image', 'Photo of the part'),
            str('title', 'Title'),
            txt('text', 'What it is'),
            strings('checks', 'Tick lines'),
            str('footerLabel', 'Footer label', 'For example "Transfer switch" or "Repair visit". Leave empty when the footer shows chips.'),
            defineField({name: 'price', title: 'Footer price', type: 'sheetPrice'}),
            strings('chips', 'Footer chips instead of a price', 'For example "Highlights", "ComEd".'),
          ],
          preview: {select: {title: 'title', subtitle: 'price.display', media: 'image'}},
        }),
      ],
    }),
    str('termsNote', 'Note under the carousel'),
  ],
})

// 09 · Which option fits (comparison cards)
export const comparisonSection = defineType({
  name: 'comparisonSection',
  title: 'Which option fits your home (comparison)',
  type: 'object',
  fields: [
    sectionTitle(),
    defineField({
      name: 'options',
      title: 'Option cards (3)',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'comparisonOption',
          fields: [
            str('title', 'Card title'),
            img('diagram', 'Line drawing in the navy header', 'Optional. The design uses a simple white-line drawing.'),
            defineField({
              name: 'rows',
              title: 'Rows (same labels on every card)',
              type: 'array',
              of: [defineArrayMember({type: 'object', name: 'comparisonRow', fields: [str('label', 'Label'), str('value', 'Value'), defineField({name: 'highlight', title: 'Highlight this row (Best fit)', type: 'boolean', initialValue: false})], preview: {select: {title: 'label', subtitle: 'value'}}})],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
  ],
})

// 10 · What it has to keep running
export const scopeSection = defineType({
  name: 'scopeSection',
  title: 'What it has to keep running',
  type: 'object',
  fields: [
    sectionTitle(),
    str('calloutTitle', 'Navy callout title'),
    txt('calloutText', 'Navy callout text'),
    defineField({
      name: 'scenarios',
      title: 'Scenario cards (3)',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [defineArrayMember({type: 'object', name: 'scopeScenario', fields: [str('title', 'Title'), txt('text', 'Text'), img('diagram', 'House drawing')], preview: {select: {title: 'title', subtitle: 'text'}}})],
    }),
    txt('note', 'Note under the cards'),
  ],
})

// 11 · What we check at the estimate visit
export const estimateChecksSection = defineType({
  name: 'estimateChecksSection',
  title: 'What we check at the free estimate',
  type: 'object',
  fields: [
    sectionTitle(),
    img('photo', 'Photo on the left'),
    str('badgeNumber', 'Badge number', 'For example "10".'),
    str('badgeLabel', 'Badge label', 'For example "checks".'),
    defineField({
      name: 'checks',
      title: 'Checks (10)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'estimateCheck',
          fields: [
            str('title', 'Title'),
            txt('text', 'Why it matters'),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: ['map-pin', 'flame', 'panel', 'gauge', 'meter', 'list-checks', 'fan', 'route', 'pad', 'wrench']},
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    str('routesTitle', 'Routes heading', 'For example "If your panel can’t take the generator".'),
    defineField({
      name: 'routes',
      title: 'Routes (3)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'panelRoute',
          fields: [
            str('title', 'Title'),
            txt('text', 'Text'),
            defineField({name: 'tone', title: 'Card colour', type: 'string', options: {list: ['green', 'blue', 'navy']}}),
          ],
          preview: {select: {title: 'title', subtitle: 'tone'}},
        }),
      ],
    }),
    str('noteLine1', 'Note, first line'),
    str('noteLine2', 'Note, second line', 'The words "cost table" link to the cost section.'),
  ],
})

// 07 · Recent work / installation carousel
export const installationsSection = defineType({
  name: 'installationsSection',
  title: 'What an installation looks like (photo carousel)',
  type: 'object',
  fields: [sectionTitle(), defineField({name: 'slides', title: 'Photos (caption goes on the image)', type: 'array', of: [defineArrayMember({type: 'imageWithAlt'})]})],
})

// 09 · Price (variable prices from the permit sheet)
export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'What it costs with us',
  type: 'object',
  fields: [
    sectionTitle(),
    defineField({
      name: 'fees',
      title: 'Fee cards (3 across)',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'feeCard', fields: [str('label', 'Label'), defineField({name: 'price', title: 'Price', type: 'sheetPrice'}), txt('note', 'Note')], preview: {select: {title: 'label', subtitle: 'price.display'}}})],
    }),
    defineField({
      name: 'table',
      title: 'Price table',
      type: 'object',
      fields: [
        str('jobHeading', 'Left column heading', 'For example "Common Generac jobs".'),
        str('priceHeading', 'Right column heading', 'For example "Price".'),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [defineArrayMember({type: 'object', name: 'priceRow', fields: [str('job', 'Job'), str('driver', 'What the price depends on'), defineField({name: 'price', title: 'Price', type: 'sheetPrice'})], preview: {select: {title: 'job', subtitle: 'price.display'}}})],
        }),
        str('note', 'Note under the table'),
        str('seeAllLabel', 'Phone "See all" button', 'For example "See all 5 prices". Phones show 3 rows first.'),
      ],
    }),
    defineField({
      name: 'included',
      title: 'Navy card: with every price',
      type: 'object',
      fields: [
        str('title', 'Title'),
        strings('items', 'Tick lines'),
        str('incentivesTitle', 'Incentives label'),
        txt('incentivesText', 'Incentives text'),
        str('incentivesLinkLabel', 'Incentives link label'),
        defineField({name: 'incentivesLinkUrl', title: 'Incentives link', type: 'url'}),
        str('ctaLabel', 'Button label'),
      ],
    }),
    defineField({
      name: 'medians',
      title: 'Typical-price tiles',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'medianTile', fields: [str('value', 'Value'), str('label', 'Label')], preview: {select: {title: 'value', subtitle: 'label'}}})],
    }),
    txt('source', 'Source line'),
  ],
})

// 10 · Who does the work
export const trustSection = defineType({
  name: 'trustSection',
  title: 'Who does the work',
  type: 'object',
  fields: [
    sectionTitle(),
    img('photo', 'Photo'),
    str('address', 'Address on the photo'),
    defineField({name: 'points', title: 'Points', type: 'array', of: [defineArrayMember({type: 'titleText'})]}),
    defineField({
      name: 'facts',
      title: 'Fact tiles',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'factTile', fields: [str('label', 'Small label'), str('value', 'Big value'), str('suffix', 'Small text after the value', 'For example "/5".'), str('text', 'Line under it')], preview: {select: {title: 'value', subtitle: 'label'}}})],
    }),
  ],
})

// 11 · Reviews
export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Reviews',
  type: 'object',
  fields: [
    sectionTitle(),
    str('googleRating', 'Google rating'),
    str('googleCount', 'Google review count line'),
    str('yelpRating', 'Yelp rating'),
    str('yelpCount', 'Yelp review count line'),
    str('reviewLinkLabel', 'Link label on each card', 'For example "View on Google".'),
    defineField({
      name: 'reviews',
      title: 'Review cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'reviewCard',
          fields: [str('name', 'Reviewer', 'First name and last initial, for example "Ryan F.".'), str('sourceId', 'Review row', 'hc-N: row N of assets/google-reviews.csv in the brand-page skill.'), str('date', 'Review date', 'YYYY-MM-DD from the review file.'), str('source', 'Source and date', 'For example "Google review, Jul 2024".'), txt('quote', 'Quote, word for word', 'At most 14 consecutive words copied exactly, ending in … if cut.'), defineField({name: 'url', title: 'Link to the review', type: 'url', description: 'The review’s own link from the review file.'})],
          preview: {select: {title: 'name', subtitle: 'quote'}},
        }),
      ],
    }),
  ],
})

// 12 · How it works
export const processSection = defineType({
  name: 'processSection',
  title: 'How it works (4 steps)',
  type: 'object',
  fields: [sectionTitle(), img('photo', 'Photo'), defineField({name: 'steps', title: 'Steps', type: 'array', of: [defineArrayMember({type: 'titleText'})]})],
})

// 13 · Areas + map
export const areasSection = defineType({
  name: 'areasSection',
  title: 'Where we work',
  type: 'object',
  fields: [
    sectionTitle(),
    str('mapLinkLabel', 'Map link label'),
    str('mapLinkUrl', 'Map link'),
    str('shopName', 'Shop name on the map card'),
    str('shopAddress', 'Shop address'),
    str('shopHours', 'Shop line', 'For example "West Ridge · Open 24 hours, 7 days".'),
    str('directionsLabel', 'Directions button label'),
    str('directionsUrl', 'Directions link'),
    strings('mapPins', 'Neighbourhoods pinned on the map'),
    strings('mapLabels', 'Other map labels', 'For example "Lake Michigan", "Palatine".'),
    defineField({name: 'regions', title: 'Region cards', type: 'array', of: [defineArrayMember({type: 'titleText'})]}),
  ],
})

// 14 · FAQ
export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  fields: [
    sectionTitle('Keyword title, for example "Generac generator installation & repair in Chicago: FAQs". No "FAQs · 12 questions" label.'),
    img('callCardImage', 'Call card photo'),
    str('callCardTitle', 'Call card title', 'For example "Didn’t find the question?".'),
    str('callCardButton', 'Call card button'),
    str('googleRating', 'Proof card: Google rating'),
    str('googleCount', 'Proof card: Google review count'),
    str('licence', 'Proof card: licence number'),
    str('licenceLabel', 'Proof card: licence label'),
    defineField({
      name: 'items',
      title: 'Questions (12; the first one shows open)',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'faqItem', fields: [str('question', 'Question'), defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4})], preview: {select: {title: 'question', subtitle: 'answer'}}})],
    }),
    defineField({name: 'mobileCount', title: 'Questions shown on phones before "See all"', type: 'number', initialValue: 8}),
    str('seeAllLabel', 'Phone "See all" button', 'For example "See all 12 questions".'),
  ],
})

// 15 · Closing CTA
export const closingSection = defineType({
  name: 'closingSection',
  title: 'Closing call to action',
  type: 'object',
  fields: [
    sectionTitle(),
    txt('text', 'Text'),
    img('backgroundImage', 'Background photo'),
    str('checklistTitle', 'Checklist title'),
    strings('checklist', 'Checklist lines'),
    str('primaryCtaLabel', 'Call button'),
    str('secondaryCtaLabel', 'Estimate button'),
  ],
})

// 16 · Other equipment and brands
export const otherBrandsSection = defineType({
  name: 'otherBrandsSection',
  title: 'Other brands and equipment',
  type: 'object',
  fields: [
    sectionTitle(),
    defineField({
      name: 'brands',
      title: 'Brand logo cards',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'brandLink', fields: [str('name', 'Brand'), img('logo', 'Logo'), defineField({name: 'link', title: 'Link', type: 'string'})], preview: {select: {title: 'name', media: 'logo'}}})],
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment photo cards',
      type: 'array',
      of: [defineArrayMember({type: 'object', name: 'equipmentLink', fields: [str('title', 'Title'), str('text', 'Line under it'), img('image', 'Photo'), defineField({name: 'link', title: 'Link', type: 'string'})], preview: {select: {title: 'title', subtitle: 'text', media: 'image'}}})],
    }),
  ],
})

// 18 · Chicago electrical library
export const librarySection = defineType({
  name: 'librarySection',
  title: 'Chicago electrical library',
  type: 'object',
  fields: [
    sectionTitle(),
    str('guideWord', 'Word before the guide number', 'For example "Guide", shown as "Guide 01" and "Guide 01 / 04".'),
    str('inThisGuideLabel', 'Label above the guide links', 'For example "In this guide".'),
    defineField({
      name: 'guides',
      title: 'Guides (4 tabs; the first one shows open)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'libraryGuide',
          fields: [
            str('tabLabel', 'Tab label'),
            str('title', 'Guide title (on the photo)'),
            img('image', 'Header photo'),
            txt('intro', 'Intro'),
            defineField({
              name: 'stats',
              title: 'Stat tiles (4)',
              type: 'array',
              description: 'Figures only from the permit and building data sheet.',
              of: [defineArrayMember({type: 'object', name: 'libraryStat', fields: [str('value', 'Value'), str('label', 'Label')], preview: {select: {title: 'value', subtitle: 'label'}}})],
            }),
            defineField({name: 'sections', title: 'Sections (also the "In this guide" links)', type: 'array', of: [defineArrayMember({type: 'titleText'})]}),
          ],
          preview: {select: {title: 'tabLabel', subtitle: 'title'}},
        }),
      ],
    }),
  ],
})

export const sectionTypes = [
  siteHeaderSection, siteFooterSection, bookingToggle, jumpBar, heroSection, jumpLink, servicesSection, modelsSection, modelMatrixSection, partsSection, comparisonSection,
  scopeSection, estimateChecksSection, installationsSection, pricingSection, trustSection, reviewsSection,
  processSection, areasSection, faqSection, closingSection, otherBrandsSection, librarySection,
]
