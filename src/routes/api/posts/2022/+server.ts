import { transformPost } from '$lib/server/transformations';
import postRouteMatching from '$posts/(2022)/route-matching-in-sveltekit/meta';
import postThreeWaysToBootstrapSvelteProject from '$posts/(2022)/three-ways-to-bootstrap-a-svelte-project/meta';
import postAtAndHashtagSymbols from '$posts/(2022)/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [postThreeWaysToBootstrapSvelteProject, postAtAndHashtagSymbols, postRouteMatching];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
