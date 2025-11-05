import type { LayoutServerLoad } from './$types';
import { ORIGIN } from '$env/static/private';
import { all as posts } from '$lib/server/collections/posts';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const post = posts.find((post) => post.path === url.pathname);

	return {
		origin: ORIGIN,
		post,
		seo: post
			? { title: post.title, description: post.description, ogImageUrl: post.ogImageUrl }
			: undefined
	};
};
