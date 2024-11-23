import { beforeAll, describe, expect, test } from 'vitest';
import { getPosts } from './posts';

describe('getPosts', () => {
	let posts: ReturnType<typeof getPosts>;

	beforeAll(() => {
		posts = getPosts();
	});

	test('/posts/github-copilot-context exists', () => {
		const post = posts.find((p) => p.path === '/posts/github-copilot-context');
		expect(post).toBeDefined();
		expect(post?.title).toBe('How to provide better context in GitHub Copilot prompts');
		expect(post?.publishedDate).toBe('2024-11-15T00:00:00.00Z');
		// `lastmodDate` may change, so we cannot assert a specific value.
		expect(post?.lastmodDate).toBeDefined();
		expect(post?.author).toEqual({
			id: 'thilo',
			imageUrl: '/assets/portrait-thilo-maier.jpg',
			name: 'Thilo Maier',
			url: 'https://maier.social/@thilo'
		});
	});

	test('posts are sorted by published date in descending order', () => {
		const copilotPostIndex = posts.findIndex((p) => p.path === '/posts/github-copilot-context');
		const seoPostIndex = posts.findIndex(
			(p) => p.path === '/posts/how-to-add-a-basic-seo-component-to-sveltekit'
		);
		expect(copilotPostIndex).toBeLessThan(seoPostIndex); // Copilot post is newer than SEO post.
	});
});
