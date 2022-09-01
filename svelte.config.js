import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkCodeTitles from 'remark-code-titles';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
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
      $posts: 'src/routes/posts',
    },
  },

  vitePlugin: {
    experimental: {
      inspector: true,
    },
  },
};

export default config;
