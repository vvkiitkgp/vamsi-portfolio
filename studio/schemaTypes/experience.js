import { defineField, defineType } from 'sanity'

const roleFields = [
  defineField({
    name: 'roleTitle',
    title: 'Role Title',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'dateRange',
    title: 'Date Range',
    type: 'string',
    description: 'e.g. "Jun 2022 to Present"',
    validation: (Rule) => Rule.required(),
  }),
]

export const experience = defineType({
  name: 'experience',
  title: 'Experience Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'Small eyebrow above the heading, e.g. "What shaped me"',
      initialValue: 'What shaped me',
    }),
    defineField({
      name: 'heading',
      title: 'Heading (primary)',
      type: 'string',
      description: 'First part of the main heading, e.g. "Years of"',
      initialValue: 'Years of',
    }),
    defineField({
      name: 'headingAccent',
      title: 'Heading (accent)',
      type: 'string',
      description: 'Accent-colored part of the heading, e.g. "building with intent"',
      initialValue: 'building with intent',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      description: 'Uppercase line below the heading',
      initialValue: 'Context over chronology',
    }),
    defineField({
      name: 'narrative',
      title: 'Narrative',
      type: 'text',
      rows: 6,
      description: 'Story-first paragraph on the left column',
    }),
    defineField({
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'company',
          title: 'Company',
          fields: [
            defineField({
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Company Logo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'totalDuration',
              title: 'Total Duration',
              type: 'string',
              description: 'e.g. "4 yrs" or "1 yr 6 mo"',
            }),
            defineField({
              name: 'roles',
              title: 'Roles',
              type: 'array',
              of: [{ type: 'object', name: 'role', title: 'Role', fields: roleFields }],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: { title: 'companyName', subtitle: 'totalDuration', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Experience Section' }),
  },
})
