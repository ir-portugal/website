import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { siteConfig } from './src/config/site';

export default defineConfig({
  site: process.env.SITE_URL ?? siteConfig.siteUrl,
  base: process.env.BASE_PATH ?? '/',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
