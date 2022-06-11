import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import remarkCodeTitles from 'remark-code-titles';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  experimental: {
    inspector: true,
  },

  extensions: ['.svelte', '.md'],

  preprocess: [
    // See https://github.com/sveltejs/svelte-preprocess.
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
    vite: {
      server: {
        hmr: {
          clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 3000,
          host: process.env.GITPOD_WORKSPACE_URL
            ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-')
            : 'localhost',
        },
      },
    },
  },
};

export default config;
