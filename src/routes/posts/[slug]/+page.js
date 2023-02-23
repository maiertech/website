import posts from '$lib/data/posts';
import { AuthorsSchema, TagsSchema, TopicsSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

export const prerender = 'auto';

/**
 * @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').TopicsSchema>} Topics
 * @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').TagsSchema>} Tags
 */

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) {
		throw error(404, 'Not found.');
	}

	// Resolve authors.

	const response = await fetch('/api/authors', {
		method: 'POST',
		body: JSON.stringify([post.author])
	});

	if (!response.ok) {
		throw error(500, 'Failed to fetch authors.');
	}

	// Validate authors.
	const result = AuthorsSchema.safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Authors failed validation.');
	}

	const [author] = result.data;

	// Resolve topics.

	/** @type {Topics | undefined} */
	let topics;

	if (post.topics) {
		const response = await fetch('/api/topics', {
			method: 'POST',
			body: JSON.stringify(post.topics)
		});

		if (!response.ok) {
			throw error(500, 'Failed to fetch topics.');
		}

		// Validate topics.
		const result = TopicsSchema.safeParse(await response.json());

		if (!result.success) {
			throw error(500, 'Topics failed validation.');
		}

		topics = result.data;
	}

	// Resolve tags.

	/** @type {Tags | undefined} */
	let tags;

	if (post.tags) {
		const response = await fetch('/api/tags', { method: 'POST', body: JSON.stringify(post.tags) });

		if (!response.ok) {
			throw error(500, 'Failed to fetch tags.');
		}

		// Validate tags.
		const result = TagsSchema.safeParse(await response.json());

		if (!result.success) {
			throw error(500, 'Tags failed validation.');
		}

		tags = result.data;
	}

	/** @type {{ default: import('svelte').ComponentType}} */
	let module;
	try {
		module = await import(`../../../lib/content/posts/${post.id}/index.md`);
	} catch (e) {
		throw error(500, 'Post failed to load.');
	}

	return {
		PostContent: module.default,
		// Use post instead of frontmatter, since post includes id and slug.
		metadata: post,
		author,
		topics,
		tags
	};
}
