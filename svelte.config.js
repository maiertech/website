import adapter from '@sveltejs/adapter-node';
import { escapeSvelte, mdsvex } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { codeToHtml } from 'shiki';

// Get the directory name of the current file.
const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		// Default layout with custom components used when rendering Markdown.
		// As of Mdsvex v0.12.6, the layout paths must be absolute.
		_: path.resolve(dirname, 'src/lib/mdsvex/layouts/default.svelte')
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				await codeToHtml(code, {
					lang,
					themes: {
						light: 'github-light',
						dark: 'github-dark'
					},
					transformers: [
						{
							pre(node) {
								this.addClassToHast(node, 'pre');
							}
						}
					]
				})
			);
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
export default {
	compilerOptions: {
		// Force runes mode for the project, except for libraries and .md files processed by mdsvex
		// (which generate legacy $$props syntax). Can be removed in svelte 6.
		runes: ({ filename }) => {
			if (filename.split(/[/\\]/).includes('node_modules')) return undefined;
			if (filename.endsWith('.md')) return undefined;
			return true;
		}
	},
	preprocess: [mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		alias: {
			'content-collections': './.content-collections/generated'
		},
		prerender: {
			handleHttpError: ({ status, message }) => {
				// Suppress 404 errors for posts with `published: false` during prerendering.
				if (status === 404) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};
