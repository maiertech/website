import { transformPost } from '$lib/server/transformations';
import postComplementZeroEffortTypeSafety from '$posts/(2023)/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety/meta';
import postConfiguringTurborepo from '$posts/(2023)/configuring-turborepo-for-a-sveltekit-monorepo/meta';
import postCustomizingGitpodWorkspaces from '$posts/(2023)/five-ways-to-customize-a-gitpod-workspace/meta';
import postBasicSeoComponent from '$posts/(2023)/how-to-add-a-basic-seo-component-to-sveltekit/meta';
import postStackBlitzCodeflowBeta from '$posts/(2023)/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [
		postBasicSeoComponent,
		postCustomizingGitpodWorkspaces,
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
