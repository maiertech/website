import type { Author } from './author.type';
import type { Tag } from './tag.type';
import type { Link } from './link.type';

/**
 * PostFrontmatter is transformed into PostMetadata.
 *  */
export type PostMetadata = {
  title: string;
  /** Resolved author. */
  author: Author;
  date: Date;
  description: string;
  category: Tag;
  tags: Tag[];
  links?: Link[];
  /** path is optional. In a post page path is not needed and can be retrieved from store. In a list of posts path is needed. */
  path?: string;
};
