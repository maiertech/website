import { tags as allTags, authors } from '$lib/data';
import { getLatestCommit } from '$lib/server/github-api';
import { getPosts } from '$lib/server/posts';
import type { Author, Tag } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

const posts = getPosts();

export const load = (async ({ url }) => {
	const post = resolve(url.pathname, posts);

	if (!post) {
		error(404, 'Not found.');
	}

	// Resolve author and tags.
	const author = post.author ? resolve<Author>(post.author, authors) : undefined;
	const tags = post.tags
		? post.tags.map((tag) => resolve<Tag>(tag, allTags)).filter((tag) => tag !== undefined) // Drop tag if it cannot be resolved.
		: undefined;

	const filepath = `src/routes/(posts)${url.pathname}/+page.markdoc`;

	const latestCommit = await getLatestCommit(filepath);

	// This layout is prerendered, i.e., the latest commit is fetched at build time.
	// Therefore fail the build if a commit cannot be fetched.
	if (!latestCommit) {
		error(500, `Failed to fetch last commit for ${filepath}.`);
	}

	const lastmodDate = latestCommit.commit.author?.date;
	const resolvedPost = { ...post, author, tags, lastmodDate };

	return {
		resolvedPost,
		seo: resolvedPost
	};
}) satisfies LayoutServerLoad;
