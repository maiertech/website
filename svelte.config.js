import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkCodeTitles from 'remark-code-titles';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			smartypants: {
				dashes: 'oldschool'
			},
			remarkPlugins: [remarkCodeTitles],
			rehypePlugins: []
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$data: 'src/data',
			$posts: 'src/routes/posts'
		},
		csrf: {
			checkOrigin: false
		}
	},

	vitePlugin: {
		experimental: {
			inspector: true
		}
	}
};

export default config;
