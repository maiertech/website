import tags from '$lib/data/tags';

/** @param {string} tag  */
export function resolve_tag(tag) {
	return tags.find((t) => t.id === tag);
}

/** @param {string[]} tags */
export function resolve_tags(tags) {
	return tags
		.map((tag) => resolve_tag(tag))
		.filter(
			/**
			 * Filter undefined. Type guard ensures that tag is inferred correctly.
			 * @type {import('$lib/types').NotUndefined<import('$lib/types').Tag>}
			 */
			function is_tag(tag) {
				return Boolean(tag);
			}
		);
}
