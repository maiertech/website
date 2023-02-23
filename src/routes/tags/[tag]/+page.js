import { PostsSchema, TagsSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

export const prerender = 'auto';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const { tag } = params;

	// Resolve tag.
	let response = await fetch('/api/tags', { method: 'POST', body: JSON.stringify([tag]) });

	if (!response.ok) {
		throw error(404, 'Not found.');
	}

	// Validate tag.
	let result_tag = TagsSchema.safeParse(await response.json());

	if (!result_tag.success) {
		throw error(500, `Tag ${tag} failed validation.`);
	}

	const [resolved_tag] = result_tag.data;

	// Fetch posts for tag.
	response = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify({ tags: [resolved_tag.id] })
	});

	if (!response.ok) {
		throw error(500, `Failed to fetch posts for tag ${resolved_tag.label}.`);
	}

	// Validate posts.
	const result_posts = PostsSchema.safeParse(await response.json());

	if (!result_posts.success) {
		throw error(500, `Posts for tag ${resolved_tag.label} failed validation.`);
	}

	const posts = result_posts.data;

	if (posts.length === 0) {
		throw error(404, 'Not found.');
	}

	return { title: resolved_tag.label, posts };
}
