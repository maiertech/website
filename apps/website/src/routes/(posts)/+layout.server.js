import { GitHubCommitSchema } from '$lib/schemas/index.js';
import { resolve as resolve_author } from '$lib/utils/authors';
import { get_latest_commit } from '$lib/utils/gh-api';
import { resolve as resolve_post } from '$lib/utils/posts';
import { resolve_tags } from '$lib/utils/tags';
import { resolve_topics } from '$lib/utils/topics';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = true;

// Array returned from GitHub API can be empty.
const Schema = z.array(GitHubCommitSchema.optional());

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	// Resolve post.
	const post = resolve_post(url.pathname);

	if (!post) {
		throw error(404, 'Not found.');
	}

	// Resolve author, topics, and tags.
	const author = resolve_author(post.author);
	const topics = post.topics ? resolve_topics(post.topics) : undefined;
	const tags = post.tags ? resolve_tags(post.tags) : undefined;

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

	const resolved_post = { ...post, author, topics, tags, lastmod_date };

	return {
		resolved_post,
		seo: resolved_post
	};
}
