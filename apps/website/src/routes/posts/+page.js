import { PostSchema } from '$lib/schemas';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ fetch }) {
	// Fetch all posts.
	const response = await fetch('/api/posts');

	if (!response.ok) {
		throw error(500, 'Failed to fetch posts.');
	}

	// Validate posts.
	const result = z.array(PostSchema).safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Posts failed validation.');
	}

	const posts = result.data;

	return {
		title: 'All posts',
		description: 'All posts are sorted by published date, the newest first.',
		posts
	};
}
