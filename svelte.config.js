import adapter from '@sveltejs/adapter-node';
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
	kit: {
		adapter: adapter(),
		alias: {
			$notes: 'src/routes/notes',
			$posts: 'src/routes/posts'
		}
	},
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)]
};
