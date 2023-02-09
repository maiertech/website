import type { SvelteComponent } from 'svelte';

// Content types.

export type Author = {
	readonly id: string;
	name: string;
	mastodon?: string;
	twitter?: string;
};

type Image = {
	src: string;
	srcset: string;
};

export type Link = {
	title: string;
	href: string;
};

type OriginImage = {
	id: string;
	url: string;
};

export type Post = {
	title: string;
	/** Resolved author. */
	author: Author;
	/** Published date in local system time. */
	published: string;
	modified: string;
	description: string;
	/** Resolved topics. */
	topics?: Topic[];
	/** Resolved tags. */
	tags?: Tag[];
	links?: Link[];
	images?: { [id: string]: Image };
	path: string;
};

export type SocialIcon = {
	readonly id: string;
	title: string;
	href: string;
	component: typeof SvelteComponent;
	onclick?: () => void;
};

export type Tag = {
	readonly id: string;
	label: string;
	/** SEO description. */
	description: string;
	/** Path to tag page. */
	path: string;
};

export type Topic = {
	readonly id: string;
	label: string;
	title: string;
	/** SEO description. */
	description: string;
	/** Path to topic page. */
	path: string;
};

// Frontmatter types.

interface Frontmatter {
	/** Page and SEO title. */
	title: string;
	/** SEO description. */
	description: string;
}

interface TaggedFrontmatter extends Frontmatter {
	/** Published date in local system time. */
	published: string;
	modified: string;
	tags?: string[];
}

interface PostFrontmatter extends TaggedFrontmatter {
	author: string;
	topics?: string[];
	links?: Link[];
	images?: OriginImage[];
	unpublish?: boolean;
}
