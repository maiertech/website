import type { SvelteComponent } from 'svelte';

export type Author = {
  readonly id: string;
  name: string;
  twitter?: string;
};

export type Image = {
  src: string;
  srcset: string;
};

export type Images = { [id: string]: Image };

export type Link = {
  title: string;
  href: string;
};

// PostFrontmatter is transformed into Post.
export type Post = {
  title: string;
  author: Author; // Resolved author.
  published: string; // Published date in local system time.
  modified: string; // Last modified date in local system time.
  description: string;
  category: Tag;
  tags?: Tag[];
  links?: Link[];
  path: string;
};

export type Repl = {
  readonly id: string;
  title: string;
  href: string;
};

export type SocialIcon = {
  id: string;
  title: string;
  href: string;
  component: typeof SvelteComponent;
  onclick?: () => void;
};

// A tag key from the frontmatter is transformed into a Tag.
export type Tag = {
  id: string; // Tag ID from frontmatter.
  label: string; // Display label.
  title: string; // Tag page title.
  description: string;
  path: string; // Path to tag page.
  suppress?: boolean; // Suppress tag page generation when false.
};
