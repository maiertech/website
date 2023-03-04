import { describe, test, expect, vi } from 'vitest';
import posts from './index';

const post = posts.find((p) => p.id === 'bootstrap-a-svelte-project');

vi.mock('$app/paths', () => ({
	base: '/path/to/app'
}));

describe('post', () => {
	test('post properties', () => {
		expect(post).toHaveProperty('id', 'bootstrap-a-svelte-project');
		expect(post).toHaveProperty('title', 'Three ways to bootstrap a Svelte project');
		expect(post).toHaveProperty('slug', 'three-ways-to-bootstrap-a-svelte-project');
		expect(post).toHaveProperty('author', 'thilo');
		expect(post).toHaveProperty('published', '2022-07-01T00:00:00.000Z');
		expect(post).toHaveProperty('modified');
		expect(post).toHaveProperty('description');
		expect(post).toHaveProperty('topics', ['svelte']);
		expect(post?.tags).toEqual(['codesandbox', 'stackblitz', 'vite']);
	});
});
