import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=husky_pitfalls]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
