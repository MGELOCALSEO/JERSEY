import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

const productSlugs = [
  'manchester-united-home-25-26', 'arsenal-home-25-26', 'real-madrid-home-25-26',
  'super-eagles-home-25-26', 'fc-barcelona-home-25-26', 'chelsea-home-25-26',
  'fc-barcelona-away-25-26', 'bayern-munchen-home-25-26', 'liverpool-home-25-26',
  'real-madrid-away-25-26', 'fc-barcelona-third-25-26', 'arsenal-third-25-26',
  'super-eagles-away-25-26', 'argentina-home-25-26', 'argentina-away-messi-25-26',
  'england-home-25-26', 'england-away-25-26', 'france-home-25-26', 'france-away-25-26',
  'spain-home-25-26', 'spain-away-25-26',
  'manchester-united-home-98-99', 'manchester-united-home-07-08', 'arsenal-home-05-06',
  'chelsea-home-12-13', 'fc-barcelona-home-10-11', 'liverpool-home-17-18',
  'real-madrid-home-98-99', 'ac-milan-home-06-07',   'nigeria-home-94-95',
  'brazil-world-cup-1970', 'argentina-world-cup-1986', 'netherlands-euro-1988',
  'germany-world-cup-1990', 'france-world-cup-1998', 'italy-world-cup-1990',
  'italy-world-cup-2006',
  'manchester-united-home-25-26-kids', 'arsenal-home-25-26-kids', 'fc-barcelona-home-25-26-kids',
  'real-madrid-home-25-26-kids', 'chelsea-home-25-26-kids', 'liverpool-home-25-26-kids',
];

export default defineConfig({
  base: '/',
  plugins: [
    Sitemap({
      hostname: 'https://www.makelelejersey.com',
      dynamicRoutes: [
        '/category/club', '/category/national', '/category/retro', '/category/kids',
        '/collection', '/custom-kits', '/reviews', '/faq',
        ...productSlugs.map(s => '/product/' + s),
      ]
    })
  ]
})
