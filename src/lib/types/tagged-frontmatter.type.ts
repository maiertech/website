import type Frontmatter from './frontmatter.type';

/**
 * Frontmatter for tagged content, e.g. posts.
 * Defined as interface, because there can be additional fields in frontmatter.
 */
export default interface TaggedFrontmatter extends Frontmatter {
  /** Published date in local system time. */
  published: string;
  /** Modified date of last modification in local system time. */
  modified: string;
  /** A tag in frontmatter is a string key. */
  tags?: string[];
}
