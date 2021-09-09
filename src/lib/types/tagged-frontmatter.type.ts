import type Frontmatter from './frontmatter.type';

/**
 * Frontmatter for tagged content, e.g. posts.
 * Defined as interface, because there can be additional fields in frontmatter.
 */
export default interface TaggedFrontmatter extends Frontmatter {
  /** Date in local system time. */
  date: Date;
  /** A tag in frontmatter is a string key. */
  tags?: string[];
}
