import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '$env/static/private';

const octokit = new Octokit({
	auth: GITHUB_TOKEN
});

/**
 * Get latest commit for path in repository maiertech/website.
 * @returns Promise with the latest commit data.
 */
export async function getLatestCommit(path: string) {
	const {
		data: [latestCommit]
	} = await octokit.repos.listCommits({
		owner: 'maiertech',
		repo: 'website',
		path,
		per_page: 1
	});

	return latestCommit;
}
