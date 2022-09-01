import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=invisible_spaces_in_tweets]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
