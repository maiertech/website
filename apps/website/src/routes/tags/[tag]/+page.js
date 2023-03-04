import { PostsSchema, TagSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const { tag } = params;

	// Resolve tag.
	let response = await fetch(`/api/tags/${tag}`);

	if (!response.ok) {
		throw error(404, 'Not found.');
	}

	let result_tag = TagSchema.safeParse(await response.json());

	if (!result_tag.success) {
		throw error(500, `Tag ${tag} failed validation.`);
	}

	const resolved_tag = result_tag.data;

	// Fetch posts for tag.
	response = await fetch(`/api/posts/filter?${new URLSearchParams({ tag: resolved_tag.id })}`);

	if (!response.ok) {
		throw error(500, `Failed to fetch posts for tag ${resolved_tag.label}.`);
	}

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
