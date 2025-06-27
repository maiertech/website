import { transformPost } from '$lib/server/transformations';
import postComplementZeroEffortTypeSafety from '$posts/(2023)/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety/meta';
import postConfiguringTurborepo from '$posts/(2023)/configuring-turborepo-for-a-sveltekit-monorepo/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postStackBlitzCodeflowBeta from '$posts/(2023)/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code/meta';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [
		postConfiguringTurborepo,
		postComplementZeroEffortTypeSafety,
		postStackBlitzCodeflowBeta
	];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return transformPost(post, event);
		})
	);

	return json(transformedPosts);
};
