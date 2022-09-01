import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=sveltekit_and_fathom_analytics]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
