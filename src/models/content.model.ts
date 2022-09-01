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

export type OriginImage = {
	id: string;
	url: string;
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
	modified: string;
	description: string;
	topics?: Topic[]; // Resolved topics.
	tags?: Tag[]; // Resolved tags.
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
	id: string;
	label: string;
	description: string; // SEO description.
	path: string; // Path to tag page.
};

export type Topic = {
	id: string;
	label: string;
	title: string;
	description: string; // SEO description.
	path: string; // Path to topic page.
};
