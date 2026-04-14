import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'info',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'AI Integrated Projects', value: 'ai' },
          { title: 'E-Commerce', value: 'ecommerce' },
          { title: 'Simple Function Projects', value: 'simple' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the section.',
    }),
    defineField({
      name: 'path',
      title: 'Internal Route',
      type: 'string',
      description: 'e.g. /ask-anything — leave blank for external links.',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Opens in a new tab. Overrides the internal route if both are set.',
    }),
    defineField({
      name: 'isDeveloped',
      title: 'Is Live / Developed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'section',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Section + Order',
      name: 'sectionOrder',
      by: [
        { field: 'section', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})
