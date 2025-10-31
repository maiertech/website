import { resolvePost } from '$lib/server/resolvers';
import postComplementZeroEffortTypeSafety from '$posts/(2023)/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety/meta';
import postConfiguringTurborepo from '$posts/(2023)/configuring-turborepo-for-a-sveltekit-monorepo/meta';
import postCookieSettingsForStackblitz from '$posts/(2023)/cookie-settings-for-stackblitz-webcontainers/meta';
import postDoINeedASitemap from '$posts/(2023)/do-i-need-a-sitemap-for-my-sveltekit-app-and-how-do-i-create-it/meta';
import postCustomizingGitpodWorkspaces from '$posts/(2023)/five-ways-to-customize-a-gitpod-workspace/meta';
import postBasicSeoComponent from '$posts/(2023)/how-to-add-a-basic-seo-component-to-sveltekit/meta';
import postStackBlitzCodeflowBeta from '$posts/(2023)/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Nested prerendering breaks build on Railway.
// export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	const posts = [
		postBasicSeoComponent,
		postCustomizingGitpodWorkspaces,
		postConfiguringTurborepo,
		postComplementZeroEffortTypeSafety,
		postDoINeedASitemap,
		postCookieSettingsForStackblitz,
		postStackBlitzCodeflowBeta
	];

	const resolvedPosts = await Promise.all(
		posts.map((post) => {
			return resolvePost({ postMeta: post });
		})
	);

	return json(resolvedPosts);
};
