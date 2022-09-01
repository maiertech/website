import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=disposable_workspaces]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
