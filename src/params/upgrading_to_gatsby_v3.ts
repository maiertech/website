import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=upgrading_to_gatsby_v3]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
