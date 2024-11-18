import { describe, test, expect } from 'vitest';
import { getLatestCommit } from './github-api';

describe('getLatestCommit', () => {
	test('fetch last commit for file that exists', async () => {
		const response = await getLatestCommit('README.md');
		expect(response.ok).toBe(true);

		const data = await response.json();
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBe(1);

		const commit = data[0];
		expect(commit).toHaveProperty('commit');
		expect(commit.commit).toHaveProperty('author');
	});

	test('fetch last commit for file that does not exist', async () => {
		const response = await getLatestCommit('path/to/non/existent/file.txt');
		expect(response.ok).toBe(true); // Returns empty array, not 404.

		const data = await response.json();
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBe(0);
	});
});
