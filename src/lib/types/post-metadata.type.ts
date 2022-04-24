import type { Author } from './author.type';
import type { Tag } from './tag.type';
import type { Link } from './link.type';

/**
 * PostFrontmatter is transformed into PostMetadata.
 */
export type PostMetadata = {
  title: string;
  /** Resolved author. */
  author: Author;
  /** Published date in local system time. */
  published: string;
  /** Modified date of last modificiation in local system time. */
  modified: string;
  description: string;
  category: Tag;
  tags?: Tag[];
  links?: Link[];
  path: string;
};
