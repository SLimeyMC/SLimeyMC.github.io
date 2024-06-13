import { defineConfig } from 'astro/config';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";

import { browserslistToTargets } from 'lightningcss';

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [wasm(), topLevelAwait(), alpinejs(), expressiveCode({ themes: ["rose-pine", "rose-pine-dawn"] }), mdx()],
  site: "https://slimeymc.github.com",
  vite: {
    plugins: [wasm(), topLevelAwait()],
    css: {
      transformer: "lightningcss"
    },
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
// find why rehypeslug doesnt work