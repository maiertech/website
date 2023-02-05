import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=active_and_focus_pseudo_classes]/+page.svx';

/** @param {string} param */
export function match(param) {
	return matchSlug(param, metadata);
}
