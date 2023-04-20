import authors from '$lib/data/authors';

/** @param {string} author  */
export function resolve(author) {
	return authors.find((a) => a.id === author);
}
