import type { Tag } from './tag.type';
import type { Link } from './link.type';

/**
 * PostFrontmatter is transformed into PostMetadata.
 *  */
export type PostMetadata = {
  title: string;
  author: string;
  /** Formatted date. */
  date: string;
  description: string;
  category: Tag;
  tags: Tag[];
  links?: Link[];
};
