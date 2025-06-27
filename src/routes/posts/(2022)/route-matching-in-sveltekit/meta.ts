import type { PostMetaType } from '@maiertech/sveltekit-helpers';

const meta: PostMetaType = {
	title: 'Route matching in SvelteKit',
	author: 'thilo',
	publishedDate: '2022-02-13',
	description:
		"This post explains how SvelteKit's filesystem-based router matches routes to files, detailing the rules and precedence for route matching.",
	tags: ['svelte'],
	path: '/posts/route-matching-in-sveltekit',
	filepath: 'src/routes/posts/(2022)/route-matching-in-sveltekit/+page.svelte'
};

export default meta;
