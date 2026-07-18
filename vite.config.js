import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: './',
  plugins: [
    Sitemap({ hostname: 'https://www.makelelejersey.com' })
  ]
})
