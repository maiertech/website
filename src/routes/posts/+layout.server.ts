import { ORIGIN } from '$env/static/private';
import { sorted as posts } from '$lib/server/collections/posts.js';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const post = posts.find((post) => post.path === url.pathname);

	if (!post) {
		error(404, 'Post not found.');
	}

	return {
		origin: ORIGIN,
		post,
		seo: post
			? { title: post.title, description: post.description, ogImageUrl: post.ogImageUrl }
			: undefined
	};
};
