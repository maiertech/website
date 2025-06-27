import { transformPost } from '$lib/server/transformations';
import postMoveYourIdeToTheCloud from '$posts/(2021)/move-your-ide-to-the-cloud-introduction-to-github-codespaces/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postFathomAnalytics from '$posts/(2021)/how-to-wire-up-fathom-analytics-in-a-sveltekit-app/meta';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postFathomAnalytics, postMoveYourIdeToTheCloud];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
