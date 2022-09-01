import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=codespaces_outage]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
