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
          clientPort: process.env.HMR_HOST ? 443 : 3000,
          host: process.env.HMR_HOST
            ? process.env.HMR_HOST.substring('https://'.length)
            : 'localhost',
        },
      },
    },
  },
};

export default config;
