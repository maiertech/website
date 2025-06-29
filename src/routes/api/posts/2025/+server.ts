import { transformPost } from '$lib/server/transformations';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postDroppingRequestsInSvelteKit from '$posts/(2025)/dropping-requests-in-sveltekit/meta';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postDroppingRequestsInSvelteKit];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
