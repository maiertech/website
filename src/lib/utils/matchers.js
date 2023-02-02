import slugify from '$lib/utils/slugify';

/**
 * @param {string} param
 * @param { import('$models/frontmatter.model').PostFrontmatter} frontmatter
 * @returns boolean
 */
export function matchSlug(param, frontmatter) {
	// Don't match route when unpublish is set to true.
	if (frontmatter.unpublish) return false;

	return param === slugify(frontmatter.title);
}
