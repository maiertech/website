import path from 'node:path';
import { fileURLToPath } from 'node:url';
import contentCollections from '@content-collections/vite';
import adapter from '@sveltejs/adapter-node';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { codeToHtml } from 'shiki';
import { defineConfig } from 'vite';

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
		highlighter: async (code: string, lang: string | null | undefined) => {
			const html = escapeSvelte(
				await codeToHtml(code, {
					lang: lang ?? 'text',
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

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex(mdsvexOptions)],
			compilerOptions: {
				// Force runes mode for the project, except for libraries and .md files processed by mdsvex.
				// Can be removed in Svelte 6.
				runes: ({ filename }) => {
					if (filename.split(/[/\\]/).includes('node_modules')) return undefined;
					if (filename.endsWith('.md')) return undefined;
					return true;
				}
			},
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
		}),
		contentCollections()
	]
});
