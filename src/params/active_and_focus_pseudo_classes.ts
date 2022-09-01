import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=active_and_focus_pseudo_classes]/+page.svx';

export function match(param: string) {
  return matchSlug(param, metadata);
}
