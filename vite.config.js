import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    hmr: {
      clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 5173,
      host: process.env.GITPOD_WORKSPACE_URL
        ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '5173-')
        : '127.0.0.1',
    },
  },
};

export default config;
