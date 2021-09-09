import type TaggedFrontmatter from './tagged-frontmatter.type';
import type { Link } from './link.type';

/**
 * Frontmatter of a post.
 */
export default interface PostFrontmatter extends TaggedFrontmatter {
  author: string;
  description: string;
  /** A category in frontmatter is a string key. */
  category: string;
  links: Link[];
}
