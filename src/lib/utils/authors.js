import authors from '$lib/data/authors';
import { AuthorSchema } from '@maiertech/sveltekit-helpers';
import { z } from 'zod';

/**
 * @param {string} author - Author ID.
 * @returns {z.infer<typeof AuthorSchema> | undefined} Resolved author.
 */
export function resolve(author) {
	return authors.find((a) => a.id === author);
}
