import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name of the current file.
const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('shiki').Highlighter | null} */
const highlighter = await createHighlighter({
	themes: ['min-light', 'min-dark'],
	langs: [
		'bash',
		'html',
		'javascript',
		'json',
		'markdown',
		'svelte',
		'text',
		'typescript',
		'yaml',
		'xml'
	]
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.svx'],
	layout: {
		// Default layout with custom components used when rendering Markdown.
		// As of mdsvex v0.12.6, the layout paths must be absolute
		_: path.resolve(dirname, 'src/lib/mdsvex/layouts/default.svelte')
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
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
				// Restrict image generation to specific widths (defaults used by `VercelImage`).
				sizes: [160, 320, 480, 640, 768, 1024, 1280, 1536, 1920, 2560],
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
