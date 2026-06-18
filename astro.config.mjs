// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://theoutstandingequestrian.com',

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/nav-preview') &&
        !page.includes('/thank-you') &&
        !page.includes('/api/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
});
