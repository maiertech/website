import slugify from '@sindresorhus/slugify';

/** @param {string} text */
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
