import { defineConfig } from 'astro/config';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";

import { rehypeHeadingIds } from '@astrojs/markdown-remark'

import { browserslistToTargets } from 'lightningcss';

import expressiveCode from "astro-expressive-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings ]
  }
});
// find why rehypeslug doesnt work