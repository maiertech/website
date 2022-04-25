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
    prerender: {
      default: true,
    },
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
    // vite: {
    //   server: {
    //     hmr: {
    //       clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 3000,
    //       host: process.env.GITPOD_WORKSPACE_URL
    //         ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-')
    //         : 'localhost',
    //     },
    //   },
    // },
    // vite: {
    //   server: {
    //     hmr: {
    //       clientPort: 443,
    //       host: '3000-maiertech-maiertech-pqqa6r5vt44.ws-us42.gitpod.io',
    //     },
    //   },
    // },
  },
};

debugger;

export default config;
