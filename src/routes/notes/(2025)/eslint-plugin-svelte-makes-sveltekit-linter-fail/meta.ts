import type { NoteMeta } from '@maiertech/sveltekit-helpers';

export default {
	title: 'eslint-plugin-svelte makes SvelteKit linter fail',
	description:
		'eslint-plugin-svelte v3.12.x breaks the SvelteKit linter (svelte/no-navigation-without-resolve); pinned to v3.11.0 as a workaround.',
	publishedDate: '2025-09-21',
	link: 'https://github.com/sveltejs/eslint-plugin-svelte/issues/1353',
	path: '/notes/eslint-plugin-svelte-makes-sveltekit-linter-fail'
} satisfies NoteMeta;
