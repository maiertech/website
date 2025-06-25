import { json } from '@sveltejs/kit';
import postConfiguringTurborepo from '$posts/(2023)/configuring-turborepo-for-a-sveltekit-monorepo/meta';
import type { RequestHandler } from './$types';
import { post as transformPost } from '$lib/transformations';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postConfiguringTurborepo];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
