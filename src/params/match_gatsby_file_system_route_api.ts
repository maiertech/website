import { matchSlug } from '$lib/utils/matchers';
import {
  metadata,
  slug,
} from '../routes/posts/[slug=match_gatsby_file_system_route_api]/index.svx';

export function match(param: string) {
  return matchSlug(param, slug, { hide: metadata.hide });
}
