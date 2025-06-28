import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { PostType } from '@maiertech/sveltekit-helpers';

export const prerender = true;

// Return latest posts (up to 20).
export const GET: RequestHandler = async ({ fetch }) => {
	let posts: PostType[] = [];

	// Fetch 2023 posts.
	let response = await fetch('/api/posts/2023');
	posts = [...((await response.json()) as PostType[]), ...posts];

	// Fetch 2024 posts.
	response = await fetch('/api/posts/2024');
	posts = [...((await response.json()) as PostType[]), ...posts];

	return json(posts.slice(0, 10));
};
