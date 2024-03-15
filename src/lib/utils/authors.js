import authors from '$lib/data/authors';

/**
 * @param {string} author - Author ID.
 * @returns {import('$lib/types').Author | undefined} Resolved author.
 */
export function resolve(author) {
	return authors.find((a) => a.id === author);
}
