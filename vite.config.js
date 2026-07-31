import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mainSrc = readFileSync(join(__dirname, 'src', 'main.js'), 'utf8')
const productSlugs = [...new Set([...mainSrc.matchAll(/slug:'([^']+)'/g)].map(m => m[1]))]

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        club: '/club.html',
        national: '/national.html',
        retro: '/retro.html',
        kids: '/kids.html',
      }
    }
  },
  plugins: [
    Sitemap({
      hostname: 'https://www.makelelejersey.com',
      dynamicRoutes: [
        '/category/club', '/category/national', '/category/retro', '/category/kids',
        '/category/others', '/category/long-sleeve', '/category/common',
        '/collection', '/custom-kits', '/reviews', '/faq',
        ...productSlugs.map(s => '/product/' + s),
        ...Object.keys({
          'premier-league':1, 'laliga':1, 'bundesliga':1, 'serie-a':1, 'ligue1':1,
          'saudi-pro-league':1, 'eredivisie':1, 'primeira-liga':1, 'super-lig':1,
          'argentine-primera':1, 'world-cup':1, 'championship':1, 'brazilian-serie-a':1
        }).map(l => '/league/' + l),
      ]
    })
  ]
})
