import { defineField, defineType } from 'sanity'

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'greeting',
      title: 'Greeting',
      type: 'string',
      description: 'Small label shown above the name, e.g. "hello!"',
      initialValue: 'hello!',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title (legacy)',
      type: 'string',
      description: 'Legacy field — no longer shown on the redesigned hero.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (eyebrow)',
      type: 'string',
      description: 'Small line above the name, e.g. "A frontend engineer who sweats the details".',
    }),
    defineField({
      name: 'accentLine',
      title: 'Accent Line',
      type: 'string',
      description: 'Uppercase highlight line above the name, e.g. "I usually build from curiosity, frustration & detail."',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Shown as a chip, e.g. "Hyderabad, India".',
    }),
    defineField({
      name: 'subtitle',
      title: 'Experience / Company chip',
      type: 'string',
      description: 'Shown as a chip, e.g. "Engineering @ SigFig · Ex-Standard Chartered".',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
      description: 'Upload the latest resume PDF. This will be shown and downloaded on the Resume page.',
      options: { accept: '.pdf' },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
