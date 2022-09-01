import type { Link, OriginImage } from '$models/content.model';

export interface Frontmatter {
	title: string; // Page and SEO title.
	description: string; // SEO description.
}

export interface TaggedFrontmatter extends Frontmatter {
	published: string; // Published date in local system time.
	modified: string;
	tags?: string[];
}

export interface PostFrontmatter extends TaggedFrontmatter {
	author: string;
	topics?: string[];
	links?: Link[];
	images?: OriginImage[];
	unpublish?: boolean;
}
