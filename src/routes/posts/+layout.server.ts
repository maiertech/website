import { ORIGIN } from '$env/static/private';
import { sorted as posts } from '$lib/server/collections/posts.js';
import { latest as latestVideos } from '$lib/server/collections/videos.js';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const index = posts.findIndex((post) => post.path === url.pathname);

	if (index === -1) {
		error(404, 'Post not found.');
	}

	const post = posts[index];
	const prev = index < posts.length - 1 ? posts[index + 1] : undefined; // The higher the index the older the post.
	const next = index > 0 ? posts[index - 1] : undefined;

	const recommendedVideos = latestVideos.slice(0, 3);

	return {
		origin: ORIGIN,
		post,
		prev,
		next,
		recommendedVideos,
		seo: {
			title: post.title,
			description: post.description,
			ogImageUrl: post.ogImageUrl
		}
	};
};
