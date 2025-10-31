import { resolvePost } from '$lib/server/resolvers';
import postCopilotContext from '$posts/(2024)/github-copilot-context/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Nested prerendering breaks build on Railway.
// export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	const posts = [postCopilotContext];

	const resolvedPosts = await Promise.all(
		posts.map((post) => {
			return resolvePost({ postMeta: post });
		})
	);

	return json(resolvedPosts);
};
