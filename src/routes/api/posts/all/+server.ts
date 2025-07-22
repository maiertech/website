import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ResolvedPost } from '@maiertech/sveltekit-helpers';

// Needs to be set explicitly because we prerender endpoint `/sitemap.xml`.
export const prerender = true;

// Return all posts.
export const GET: RequestHandler = async ({ fetch }) => {
	let posts: ResolvedPost[] = [];

	// Fetch 2021 posts.
	let response = await fetch('/api/posts/2021');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	// Fetch 2022 posts.
	response = await fetch('/api/posts/2022');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	// Fetch 2023 posts.
	response = await fetch('/api/posts/2023');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	// Fetch 2024 posts.
	response = await fetch('/api/posts/2024');
	posts = [...((await response.json()) as ResolvedPost[]), ...posts];

	return json(posts);
};
