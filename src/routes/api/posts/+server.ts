import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { PostType } from '@maiertech/sveltekit-helpers';

export const prerender = true;

// Return all posts.
export const GET: RequestHandler = async ({ fetch }) => {
	let posts: PostType[] = [];

	// TODO: Add more posts.

	// Fetch 2023 posts.
	const response = await fetch('/api/posts/2023');
	posts = [...((await response.json()) as PostType[]), ...posts];

	return json(posts);
};
