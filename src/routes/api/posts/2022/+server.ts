import { resolvePost } from '$lib/server/resolvers';
import postExploreD3ArrayMethods from '$posts/(2022)/exploring-frequently-used-methods-of-d3-array/meta';
import postGrokingFocusPseudoClasses from '$posts/(2022)/groking-active-focus-and-focus-visible-pseudo-classes/meta';
import postSvelteKitBreakingChanges from '$posts/(2022)/handling-breaking-changes-in-sveltekit-pre-1-0/meta';
import postSvelteKitHmrOnGitpod from '$posts/(2022)/how-to-make-sveltekit-hmr-work-with-gitpod/meta';
import postRecordingScreencasts from '$posts/(2022)/recording-screencasts-on-a-hidpi-display/meta';
import postRouteMatching from '$posts/(2022)/route-matching-in-sveltekit/meta';
import postThreeWaysToBootstrapSvelteProject from '$posts/(2022)/three-ways-to-bootstrap-a-svelte-project/meta';
import postAtAndHashtagSymbols from '$posts/(2022)/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Needs to be set explicitly because we prerender endpoint `/sitemap.xml`.
// export const prerender = true;

export const GET: RequestHandler = async (event) => {
	// Sort order: latest first.
	const posts = [
		postSvelteKitBreakingChanges,
		postAtAndHashtagSymbols,
		postThreeWaysToBootstrapSvelteProject,
		postExploreD3ArrayMethods,
		postGrokingFocusPseudoClasses,
		postRecordingScreencasts,
		postRouteMatching,
		postSvelteKitHmrOnGitpod
	];

	const resolvedPosts = await Promise.all(
		posts.map((post) => {
			return resolvePost({ postMeta: post, event });
		})
	);

	return json(resolvedPosts);
};
