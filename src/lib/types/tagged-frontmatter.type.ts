import type Frontmatter from './frontmatter.type';

/**
 * Frontmatter for tagged content, e.g. posts.
 * Defined as interface, because there can be additional fields in frontmatter.
 */
export default interface TaggedFrontmatter extends Frontmatter {
  /** Original post date in local system time. */
  date: string;
  /** Date of last update in local system time. */
  updated: string;
  /** A tag in frontmatter is a string key. */
  tags?: string[];
}
