/**
 * A tag key from the frontmatter is transformed into a Tag.
 */
export type Tag = {
  /** Tag key used in frontmatter. */
  key: string;
  /** Label used for displaying a tag. */
  label: string;
  /** Tag page title. */
  title: string;
  /** Path to tag page. */
  path: string;
};
