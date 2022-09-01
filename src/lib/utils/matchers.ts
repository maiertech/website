import slugify from '$lib/utils/slugify';
import type { PostFrontmatter } from '$models/frontmatter.model';

export function matchSlug(
  param: string,
  frontmatter: PostFrontmatter
): boolean {
  // Don't match route when unpublish is set to true.
  if (frontmatter.unpublish) return false;

  return param === slugify(frontmatter.title);
}
