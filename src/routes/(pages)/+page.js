import topics from '$lib/data/topics';
import { resolve as resolve_author } from '$lib/utils/authors';
import { top_posts } from '$lib/utils/posts';
import { resolve_tags } from '$lib/utils/tags';
import { resolve_topics } from '$lib/utils/topics';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
	const posts = top_posts(3).map((post) => {
		return {
			...post,
			author: resolve_author(post.author),
			topics: post.topics ? resolve_topics(post.topics) : undefined,
			tags: post.tags ? resolve_tags(post.tags) : undefined
		};
	});
	return {
		seo: {
			title: 'Thilo Maier',
			description:
				"Hi, I'm Thilo. I am a developer based in Rotterdam, NL. I build web apps with SvelteKit and Svelte and keep improving my developer happiness."
		},
		topics,
		posts
	};
}
