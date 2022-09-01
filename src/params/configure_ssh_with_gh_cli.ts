import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=configure_ssh_with_gh_cli]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
