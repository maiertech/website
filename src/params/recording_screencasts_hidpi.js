import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=recording_screencasts_hidpi]/+page.svx';

/** @param {string} param */
export function match(param) {
	return matchSlug(param, metadata);
}
