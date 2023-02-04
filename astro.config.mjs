import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-test-b4j.pages.dev/',
  integrations: [mdx(), sitemap(), preact({
    compat: true
  })],
  output: "server",
  adapter: cloudflare(),

  vite: {
    define: {
      'process.env.MICROCMS_SERVICE_DOMAIN': import.meta.env.MICROCMS_SERVICE_DOMAIN,
      'process.env.MICROCMS_API_KEY': import.meta.env.MICROCMS_API_KEY,
    },
  },
});