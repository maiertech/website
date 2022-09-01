import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=gatsby_route_api]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
