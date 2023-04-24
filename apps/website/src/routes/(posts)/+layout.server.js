import { GHCommitSchema } from '$lib/schemas/index.js';
import { resolve as resolve_author } from '$lib/utils/authors';
import { get_latest_commit } from '$lib/utils/gh-api';
import { resolve as resolve_post } from '$lib/utils/posts';
import { resolve as resolve_tag } from '$lib/utils/tags';
import { resolve as resolve_topic } from '$lib/utils/topics';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = true;

// Array returned from GitHub API can be empty.
const Schema = z.array(GHCommitSchema.optional());

export async function load({ url }) {
	// Resolve post.
	const post = resolve_post(url.pathname);

	if (!post) {
		throw error(404, 'Not found.');
	}

	// Resolve author, topics, and tags.
	const author = resolve_author(post.author);

	const topics = post.topics
		? post.topics
				.map((topic) => resolve_topic(topic))
				.filter(
					/**
					 * Filter undefined. Type guard ensures that topic is inferred correctly.
					 * @type {import('$lib/types').NotUndefined<import('$lib/types').Topic>}
					 */
					function is_topic(topic) {
						return Boolean(topic);
					}
				)
		: undefined;
	const tags = post.tags
		? post.tags
				.map((tag) => resolve_tag(tag))
				.filter(
					/**
					 * Filter undefined. Type guard ensures that tag is inferred correctly.
					 * @type {import('$lib/types').NotUndefined<import('$lib/types').Tag>}
					 */
					function is_tag(tag) {
						return Boolean(tag);
					}
				)
		: undefined;

	const response = await get_latest_commit(
		`apps/website/src/routes/(posts)${url.pathname}/+page.svelte`
	);

	if (!response.ok) {
		throw error(500, `Failed to fetch lastest commit for post ${post.path}.`);
	}

	const result = Schema.safeParse(await response.json());
	if (!result.success) {
		throw error(500, `Latest commit for post ${post.path} failed validation.`);
	}

	const [data] = result.data;
	const lastmod_date = data ? data.commit.author.date : undefined;

	return { ...post, author, topics, tags, lastmod_date };
}
