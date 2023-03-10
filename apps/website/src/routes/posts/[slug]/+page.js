import posts from '$lib/data/posts';
import { AuthorSchema, TagSchema, TopicSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

/**
 * @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').TopicsSchema>} Topics
 * @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').TagsSchema>} Tags
 */

export async function load({ fetch, params }) {
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) {
		throw error(404, 'Not found.');
	}

	// Resolve author.
	const response = await fetch(`/api/authors/${post.author}`);
	if (!response.ok) {
		throw error(500, `Failed to fetch info for author ID ${post.author}.`);
	}
	const result = AuthorSchema.safeParse(await response.json());
	if (!result.success) {
		throw error(500, `Author info for ID ${post.author} failed validation.`);
	}
	const author = result.data;

	// Resolve topics.

	/** @type {Topics | undefined} */
	let topics;

	if (post.topics) {
		topics = await Promise.all(
			post.topics.map((topic) => {
				return fetch(`/api/topics/${topic}`).then((response) => {
					if (!response.ok) {
						throw error(500, `Failed to fetch info for topic ID ${topic}.`);
					}
					return response.json().then((body) => {
						const result = TopicSchema.safeParse(body);
						if (!result.success) {
							throw error(500, `Topic info for ID '${topic}' failed validation.`);
						}
						return result.data;
					});
				});
			})
		);
	}

	// Resolve tags.

	/** @type {Tags | undefined} */
	let tags;

	if (post.tags) {
		tags = await Promise.all(
			post.tags.map((tag) => {
				return fetch(`/api/tags/${tag}`).then((response) => {
					if (!response.ok) {
						throw error(500, `Failed to fetch info for tag ID ${tag}.`);
					}
					return response.json().then((body) => {
						const result = TagSchema.safeParse(body);
						if (!result.success) {
							throw error(500, `Tag info for ID '${tag}' failed validation.`);
						}
						return result.data;
					});
				});
			})
		);
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
