import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=stackblitz_codeflow]/+page.svx';

/** @param {string} param */
export function match(param) {
	return matchSlug(param, metadata);
}
