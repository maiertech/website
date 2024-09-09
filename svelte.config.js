import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { markdoc } from 'svelte-markdoc-preprocess';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * @param {string} path Relative path to a file.
 * @returns {string} Absolute path to that file.
 */
function absolute(path) {
	return join(dirname(fileURLToPath(import.meta.url)), path);
}

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		vitePreprocess(),
		markdoc({
			generateSchema: true,
			// layouts: {
			// 	default: absolute('./src/lib/markdoc/layouts/default.svelte'),
			// 	docs: absolute('./src/lib/markdoc/layouts/docs.svelte')
			// }
			nodes: absolute('./src/lib/markdoc/nodes.svelte'),
			tags: absolute('./src/lib/markdoc/tags.svelte')
		})
	],

	extensions: ['.markdoc', '.svelte'],

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
						// Must match preview URLs, e.g., website-git-835-eliminate-postcss-maierlabs.vercel.app.
						hostname: '^website-.*-maierlabs\\.vercel\\.app$'
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
	}
};
