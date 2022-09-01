import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=exploring_d3_array]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
