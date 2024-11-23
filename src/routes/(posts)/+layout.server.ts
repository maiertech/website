import { getPosts } from '$lib/server/data';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

const posts = getPosts();

export const load = (async ({ url }) => {
	const post = resolve(url.pathname, posts);

	if (!post) {
		error(404, 'Not found.');
	}

	return {
		post,
		seo: post
	};
}) satisfies LayoutServerLoad;
