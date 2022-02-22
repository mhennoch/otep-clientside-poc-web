import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['example/**/*.{vue,html,jsx,tsx}', 'viewer/**/*.{vue,html,jsx,tsx}', 'index.html'],
  },
})
