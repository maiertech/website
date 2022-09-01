import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=introduction_to_codespaces]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
