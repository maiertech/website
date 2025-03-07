import { describe, expect, test } from 'vitest';
import { getLatestCommit } from './github';

describe('getLatestCommit', () => {
	test('fetch last commit for file that exists', async () => {
		const latestCommit = await getLatestCommit('README.md');
		expect(latestCommit.commit.author).toHaveProperty('date');
	});

	test('fetch last commit for file that does not exist', async () => {
		const latestCommit = await getLatestCommit('path/to/non/existent/file.txt');
		expect(latestCommit).toBeUndefined();
	});
});
