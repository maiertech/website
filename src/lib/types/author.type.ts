/**
 * An author key from the frontmatter is transformed into an Author.
 */
export type Author = {
  /** Author key used in frontmatter. */
  key: string;
  name: string;
  twitter?: string;
};
