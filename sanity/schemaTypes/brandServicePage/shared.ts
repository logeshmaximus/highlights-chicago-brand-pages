import {defineField, defineType} from 'sanity'

// Small building blocks reused by every section of the brand service page.

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'What the photo shows, in plain words. Read out by screen readers.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption on the image',
      type: 'string',
      description: 'Optional. Shown on the photo, for example in the installation carousel.',
    }),
  ],
})

export const titleText = defineType({
  name: 'titleText',
  title: 'Title and text',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})

export const sheetPrice = defineType({
  name: 'sheetPrice',
  title: 'Price',
  type: 'object',
  description:
    'Variable price from the permit and cost sheet: the median reported construction value on City of Chicago permits, not a quote.',
  fields: [
    defineField({name: 'display', title: 'Shown on the page', type: 'string', description: 'For example "Typical $4,700" or "$15,000".'}),
    defineField({name: 'sheetRow', title: 'Sheet row it comes from', type: 'string', description: 'Internal. For example "200 amp service upgrade (2,862 costed permits)".'}),
    defineField({name: 'showTerms', title: 'Show "Terms and conditions apply" under it', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'display', subtitle: 'sheetRow'}},
})

export const linkItem = defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'href', title: 'Link (URL or path)', type: 'string'}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

export const sectionTitle =(description?: string) =>
  defineField({
    name: 'title',
    title: 'Section heading',
    type: 'string',
    description: description ?? 'Company voice, plain words. No intro paragraph goes next to it.',
    validation: (rule) => rule.required(),
  })
