import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import codeTitles from 'remark-code-titles';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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

      remarkPlugins: [codeTitles],
      rehypePlugins: [],
    }),
  ],

  kit: {
    adapter: adapter(),
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
