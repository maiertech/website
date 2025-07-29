import { resolvePost } from '$lib/server/resolvers';
import postDroppingRequestsInSvelteKit from '$posts/(2025)/dropping-requests-in-sveltekit/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postDroppingRequestsInSvelteKit];

	const resolvedPosts = await Promise.all(
		posts.map((post) => {
			return resolvePost({ postMeta: post, event });
		})
	);

	return json(resolvedPosts);
};
