import { GITHUB_TOKEN } from '$env/static/private';

/**
 * Get latest commit for path in repository maiertech/maier.tech.
 * @param {string} path - File path.
 * @returns {Promise<Response>} Promise with Response from GitHub API.
 */
export function get_latest_commit(path) {
	return fetch(
		`https://api.github.com/repos/maiertech/maier.tech/commits?${new URLSearchParams({
			path,
			page: '1',
			per_page: '1'
		})}`,
		{
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${GITHUB_TOKEN}`,
				'X-GitHub-Api-Version': '2022-11-28'
			}
		}
	);
}
