import { transformPost } from '$lib/server/transformations';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postAtAndHashtagSymbols from '$posts/(2022)/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character/meta';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postAtAndHashtagSymbols];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
