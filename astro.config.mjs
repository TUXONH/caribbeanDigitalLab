import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://caribbeandigitallab.com',
  output: 'static',
  integrations: [
    preact(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
