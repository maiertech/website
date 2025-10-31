import { resolvePost } from '$lib/server/resolvers';
import postDisposableWorkspaces from '$posts/(2021)/a-better-development-workflow-with-disposable-workspaces/meta';
import postGitHubCliSshConfig from '$posts/(2021)/how-to-use-github-cli-to-configure-ssh-authentication-to-github/meta';
import postFathomAnalytics from '$posts/(2021)/how-to-wire-up-fathom-analytics-in-a-sveltekit-app/meta';
import postMoveYourIdeToTheCloud from '$posts/(2021)/move-your-ide-to-the-cloud-introduction-to-github-codespaces/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Nested prerendering breaks build on Railway.
// export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	const posts = [
		postDisposableWorkspaces,
		postGitHubCliSshConfig,
		postFathomAnalytics,
		postMoveYourIdeToTheCloud
	];

	const resolvedPosts = await Promise.all(
		posts.map((post) => {
			return resolvePost({ postMeta: post });
		})
	);

	return json(resolvedPosts);
};
