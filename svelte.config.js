import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  preprocess: [
    // See https://github.com/sveltejs/svelte-preprocess.
    sveltePreprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapter(),
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
