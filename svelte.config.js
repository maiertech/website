import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import remarkCodeTitles from 'remark-code-titles';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout: {
        posts: './src/routes/posts/_layout.mdsvex.svelte',
        _: './src/routes/_layout.mdsvex.svelte',
      },
      smartypants: {
        dashes: 'oldschool',
      },
      remarkPlugins: [remarkCodeTitles],
      rehypePlugins: [],
    }),
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $data: 'src/data',
      $models: 'src/models',
    },
    prerender: {
      default: true,
    },
  },

  vitePlugin: {
    experimental: {
      inspector: true,
    },
  },
};

export default config;
