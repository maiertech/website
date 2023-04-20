import tags from '$lib/data/tags';

/** @param {string} tag  */
export function resolve(tag) {
	return tags.find((t) => t.id === tag);
}
