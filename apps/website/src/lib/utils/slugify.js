import slugify from '@sindresorhus/slugify';

/**
 * @param {string} text - Text to be slugified.
 * @returns {string} Slug.
 */
export default function createSlug(text) {
	return slugify(text, {
		customReplacements: [
			['@', 'at'],
			['#', 'hash'],
			['’', '']
		],
		decamelize: false
	});
}
