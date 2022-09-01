import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=bootstrap_svelte_projects]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
