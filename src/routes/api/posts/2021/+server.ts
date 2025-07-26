import { resolvePost } from '$lib/server/resolvers';
import postDisposableWorkspaces from '$posts/(2021)/a-better-development-workflow-with-disposable-workspaces/meta';
import postGitHubCliSshConfig from '$posts/(2021)/how-to-use-github-cli-to-configure-ssh-authentication-to-github/meta';
import postFathomAnalytics from '$posts/(2021)/how-to-wire-up-fathom-analytics-in-a-sveltekit-app/meta';
import postMoveYourIdeToTheCloud from '$posts/(2021)/move-your-ide-to-the-cloud-introduction-to-github-codespaces/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Needs to be set explicitly because we prerender endpoint `/sitemap.xml`.
export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [
		postDisposableWorkspaces,
		postGitHubCliSshConfig,
		postFathomAnalytics,
		postMoveYourIdeToTheCloud
	];

	const transformedPosts = await Promise.all(
		posts.map((post) => {
			return resolvePost({ postMeta: post, event });
		})
	);

	return json(transformedPosts);
};
