import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), expressiveCode(), mdx()]
});