import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=bootstrap_a_svelte_project]/+page.svx';

/** @param {string} param */
export function match(param) {
	return matchSlug(param, metadata);
}
