import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'j72orlzb',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
