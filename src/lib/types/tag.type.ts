/**
 * A tag key from the frontmatter is transformed into a Tag.
 */
export type Tag = {
  /** Tag key used in frontmatter. */
  key: string;
  /** Label used for displaying a tag. */
  label: string;
  /** Tag title. */
  title: string;
  /** Tag description. */
  description: string;
  /** Path to tag page. */
  path: string;
  /** Set to false to suppress tag page generation and linking. */
  suppress?: boolean;
};
