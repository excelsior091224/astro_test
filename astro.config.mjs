import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  output: "server",
  //adapter: cloudflare({ mode: "directory" }),
  adapter: cloudflare(),
  vite: {
    define: {
        "import.meta.env.MICROCMS_SERVICE_DOMAIN": import.meta.env.MICROCMS_SERVICE_DOMAIN,
        "import.meta.env.MICROCMS_API_KEY":import.meta.env.MICROCMS_API_KEY,
    },
  },
});