import { authors, posts } from '$lib/data';
import { gitHubCommitSchema } from '$lib/schemas';
import { get_latest_commit } from '$lib/utils/gh-api';
import { resolve } from '@maiertech/sveltekit-helpers';
import { resolve_tags } from '$lib/utils/tags';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = true;

// Array returned from GitHub API can be empty.
const schema = z.array(gitHubCommitSchema.optional());

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	// Resolve post.
	const post = resolve(
		url.pathname,
		// Add ID to each post so `resolve` can find the post.
		posts.map((post) => ({ ...post, id: post.path }))
	);

	if (!post) {
		error(404, 'Not found.');
	}

	// Resolve author and tags.
	const author = post.author ? resolve(post.author, authors) : undefined;
	const tags = post.tags ? resolve_tags(post.tags) : undefined;

	let lastmodDate = undefined;

	const response = await get_latest_commit(
		`apps/website/src/routes/(posts)${url.pathname}/+page.svelte`
	);

	// `lastmod_date` is an enhancement.
	// Don't throw errors when it cannot be retrieved to not break posts.

	if (response.ok) {
		const result = schema.safeParse(await response.json());
		if (result.success) {
			const [data] = result.data;
			lastmodDate = data ? data.commit.author.date : undefined;
		}
	}

	const resolvedPost = { ...post, id: post.path, author, tags, lastmodDate };

	return {
		resolvedPost,
		seo: resolvedPost
	};
}
