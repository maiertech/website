import { describe, test, expect } from 'vitest';
import { convertToUrl, getPosts } from './bluesky';

describe('getPosts', () => {
	test('fetch posts', async () => {
		const posts = await getPosts();
		expect(posts[0].post.author.displayName).toBeDefined();
		expect(posts[0].post.record).toBeDefined();
	});
});

describe('convertToUrl', () => {
	test('convert a Bluesky URI to a URL', () => {
		const uri = 'at://did:plc:sdvm256ktltt3ifqdijdhh4t/app.bsky.feed.post/3lbayulsl5h2c';
		const url = convertToUrl(uri);
		expect(url).toBe(
			'https://bsky.app/profile/did:plc:sdvm256ktltt3ifqdijdhh4t/post/3lbayulsl5h2c'
		);
	});
});
