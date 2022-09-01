import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=canonical_urls_in_nextjs]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
