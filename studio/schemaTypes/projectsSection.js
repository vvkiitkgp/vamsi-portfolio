import { defineField, defineType } from 'sanity'

export const projectsSection = defineType({
  name: 'projectsSection',
  title: 'Projects Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'Small eyebrow above the heading, e.g. "Built from real motivation"',
      initialValue: 'Built from real motivation',
    }),
    defineField({
      name: 'heading',
      title: 'Heading (primary)',
      type: 'string',
      description: 'First part of the main heading, e.g. "Projects I Keep"',
      initialValue: 'Projects I Keep',
    }),
    defineField({
      name: 'headingAccent',
      title: 'Heading (accent)',
      type: 'string',
      description: 'Accent-colored part of the heading, e.g. "Returning To"',
      initialValue: 'Returning To',
    }),
    defineField({
      name: 'narrative',
      title: 'Narrative',
      type: 'text',
      rows: 5,
      description: 'Intro paragraph above the project grids',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Projects Section' }),
  },
})
