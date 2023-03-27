import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkCodeTitles from 'remark-code-titles';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: {
				dashes: 'oldschool'
			},
			remarkPlugins: [remarkCodeTitles],
			rehypePlugins: []
		})
	],

	kit: {
		adapter: adapter(),
		csrf: {
			// Set environment variable NO_CHECK_ORIGIN=1 on Gitpod or StackBlitz:
			// https://github.com/sveltejs/kit/issues/8314
			checkOrigin: process.env.NO_CHECK_ORIGIN ? false : true
		}
	},

	vitePlugin: {
		experimental: {
			inspector: true
		}
	}
};

export default config;
