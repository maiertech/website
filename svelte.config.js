import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

/** @type {import('shiki').Highlighter | null} */
let cachedHighlighter = null;

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.svx'],
	layout: {
		_: './src/lib/mdsvex/layouts/default.svelte'
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// Create only one highlighter instance.
			if (!cachedHighlighter) {
				cachedHighlighter = await createHighlighter({
					themes: ['min-light', 'min-dark'],
					langs: ['bash', 'html', 'javascript', 'json', 'markdown', 'svelte', 'text', 'typescript']
				});
			}
			await cachedHighlighter.loadLanguage(lang);
			const html = escapeSvelte(
				cachedHighlighter.codeToHtml(code, {
					lang,
					themes: { light: 'min-light', dark: 'min-dark' }
				})
			);
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: ['.svelte', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			images: {
				// Restrict image generation to specific widths (Tailwind CSS breakpoints).
				sizes: [640, 768, 1024, 1280, 1536],
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
				// Seems like the SvelteKit crawler checks image URLs during prerendering.
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
