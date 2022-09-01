import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=route_matching_in_sveltekit]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
