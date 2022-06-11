import type { Link } from '$models/content.model';

export interface Frontmatter {
  title: string; // Page and SEO title.
  description: string; // SEO description.
}

export interface TaggedFrontmatter extends Frontmatter {
  published: string; // Published date in local system time.
  modified: string; // Last modification date in local system time.
  tags?: string[]; // Tag IDs.
}

export interface PostFrontmatter extends TaggedFrontmatter {
  author: string; // Author ID.
  category: string; // Category ID.
  links: Link[]; // Supplementary links.
}
