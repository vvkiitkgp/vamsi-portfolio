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
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "ui developer · react"',
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
