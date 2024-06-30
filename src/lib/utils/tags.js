import tags from '$lib/data/tags';
import { tagSchema } from '@maiertech/sveltekit-helpers';
import { z } from 'zod';

/**
 * @param {string} tag - A tag id.
 * @returns {z.infer<typeof tagSchema> | undefined} The resolved tag or undefined if tag not found.
 */
export function resolve_tag(tag) {
	return tags.find((t) => t.id === tag);
}

/**
 * @param {string[]} tags - Array of tag ids.
 * @returns {z.infer<typeof tagSchema>[]} Array of resolved tags (no element is undefined).
 */
export function resolve_tags(tags) {
	return tags
		.map((tag) => resolve_tag(tag))
		.filter(
			/** @type {(tag: z.infer<typeof tagSchema> | undefined) => tag is z.infer<typeof tagSchema>} */
			(tag) => tag !== undefined
		);
}
