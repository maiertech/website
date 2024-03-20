import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			images: {
				// Restrict image generation to specific widths (Open Props breakpoints).
				sizes: [240, 360, 480, 768, 1024, 1440, 1920],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: ['www.maier.tech'],
				remotePatterns: [
					{
						protocol: 'https',
						// Must match preview URLs, e.g., website-git-maiertech-issue818-maiertech.vercel.app.
						hostname: '^website-.*-maiertech\\.vercel\\.app$'
					}
				]
			}
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Seems like SvelteKit crawler checks image URLs during prerendering.
				// But the Vercel image optimization API is not availalbe during a build.
				// Ignore image URLs starting with `/_vercel/image`.
				if (path == '/_vercel/image') {
					return;
				}

				// Throw an error in all other cases.
				throw new Error(message);
			}
		}
		// csrf: {
		// 	// Set environment variable NO_CHECK_ORIGIN=1 on Gitpod or StackBlitz:
		// 	// https://github.com/sveltejs/kit/issues/8314
		// 	checkOrigin: process.env.NO_CHECK_ORIGIN ? false : true
		// }
	}
};
