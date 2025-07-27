import type { ResolvedPost } from '@maiertech/sveltekit-helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// No need to set `export const prerender = true;`.
// Prerendering is triggered by `/`, which uses this endpoint and iself is prerendered.

// Return latest posts (up to 10).
export const GET: RequestHandler = async ({ fetch }) => {
	let posts: ResolvedPost[] = [];

	// Fetch 2023 posts.
	let response = await fetch('/api/posts/2023');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	// Fetch 2024 posts.
	response = await fetch('/api/posts/2024');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	// Fetch 2025 posts.
	response = await fetch('/api/posts/2025');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	return json(posts.slice(0, 10));
};
