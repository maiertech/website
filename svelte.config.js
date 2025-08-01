import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHighlighter } from 'shiki';

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
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter({
			images: {
				// Restrict image generation to widths used by `VercelImage`.
				sizes: [160, 320, 480, 640, 768, 1024, 1280, 1536, 1920, 2560],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300
			}
		}),
		alias: {
			$notes: 'src/routes/notes',
			$posts: 'src/routes/posts'
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// The SvelteKit crawler checks image URLs during prerendering.
				// However, the Vercel image optimization API is not available during a build.
				// Suppress crawl error handling for URLs starting with `/_vercel/image`.
				if (path.startsWith('/_vercel/image')) {
					return;
				}

				// Handle other errors.
				throw new Error(message);
			}
		}
	}
};
