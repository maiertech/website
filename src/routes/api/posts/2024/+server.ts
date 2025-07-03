import { transformPost } from '$lib/server/transformations';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postCopilotContext from '$posts/(2024)/github-copilot-context/meta';

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postCopilotContext];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
