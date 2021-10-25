/**
 * A frontmatter must have a title.
 * Defined as interface, because there can be additional fields in a frontmatter.
 */
export default interface Frontmatter {
  title: string;
  /** SEO description. */
  description: string;
}
