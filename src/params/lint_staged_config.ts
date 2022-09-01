import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=lint_staged_config]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
