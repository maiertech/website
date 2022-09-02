import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=sveltekit_breaking_changes]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
