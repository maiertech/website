import { matchSlug } from '$lib/utils/matchers';
import {
  metadata,
  slug,
} from '../routes/posts/[slug=match_word_joiner_character]/index.svx';

export function match(param: string) {
  return matchSlug(param, slug, { hide: metadata.hide });
}
