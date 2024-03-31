import { GitHubCommitSchema } from '$lib/schemas/index.js';
import { resolve as resolve_author } from '$lib/utils/authors';
import { get_latest_commit } from '$lib/utils/gh-api';
import { resolve as resolve_post } from '$lib/utils/posts';
import { resolve_tags } from '$lib/utils/tags';
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
		error(404, 'Not found.');
	}

	// Resolve author and tags.
	const author = post.author ? resolve_author(post.author) : undefined;
	const tags = post.tags ? resolve_tags(post.tags) : undefined;

	let lastmod_date = undefined;

	const response = await get_latest_commit(
		`apps/website/src/routes/(posts)${url.pathname}/+page.svelte`
	);

	// `lastmod_date` is an enhancement.
	// Don't throw errors when it cannot be retrieved to not break posts.

	if (response.ok) {
		const result = Schema.safeParse(await response.json());
		if (result.success) {
			const [data] = result.data;
			lastmod_date = data ? data.commit.author.date : undefined;
		}
	}

	const resolved_post = { ...post, id: post.path, author, tags, lastmod_date };

	return {
		resolved_post,
		seo: resolved_post
	};
}
