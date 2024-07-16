import { tags as allTags } from '$lib/data';
import { resolve } from '@maiertech/sveltekit-helpers';

/**
 * @param {string[]} tags - Array of tag ids.
 * @returns {import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').tagSchema>[]} Array of resolved tags (no element is undefined).
 */
export function resolve_tags(tags) {
	return tags.map((tag) => resolve(tag, allTags)).filter((tag) => tag !== undefined);
}
