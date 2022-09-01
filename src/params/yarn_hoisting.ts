import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=yarn_hoisting]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
