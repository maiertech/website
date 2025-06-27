import type { PostMetaType } from '@maiertech/sveltekit-helpers';

const meta: PostMetaType = {
	title: 'Using the @ and # symbols in tweets with a word joiner character',
	author: 'thilo',
	publishedDate: '2022-08-30',
	description:
		'Twitter interprets strings starting with @ and # as mention and hashtag. It misinterprets Svelte-related strings, e.g., @const and #if. In this post, you will learn how to fix this.',
	tags: ['content-creation'],
	path: '/posts/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character',
	filepath:
		'src/routes/posts/(2022)/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character/+page.svelte'
};

export default meta;
