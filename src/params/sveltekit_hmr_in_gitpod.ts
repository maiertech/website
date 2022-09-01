import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=sveltekit_hmr_in_gitpod]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
