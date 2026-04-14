import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'vamsi-portfolio',
  title: 'Vamsi Portfolio CMS',

  // Replace with your actual Project ID from sanity.io/manage
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'j72orlzb',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
