import authors from '$data/authors';
import tags from '$data/tags';
import topics from '$data/topics';
import slugify from '$lib/utils/slugify';
import type { Images, Post } from '$models/content.model';
import type { PostFrontmatter } from '$models/frontmatter.model';
import { createSrc, createSrcset } from './imgix';

/**
 * Transform post frontmatter into post metadata:
 * 1. Validate author.
 * 2. Resolve topics.
 * 3. Resolve tags.
 * 4. Process URLs of origin images.
 */
export function normalize(frontmatter: PostFrontmatter, path: string): Post {
	// 1. Validate author.
	const author = authors.find(({ id }) => frontmatter.author === id);
	if (!author) throw `Invalid author ID '${frontmatter.author}' in post '${frontmatter.title}'`;

	// 2. Resolve topics.
	const resolvedTopics = frontmatter?.topics?.map((frontmatterTopic) => {
		const topic = topics.find(({ id }) => frontmatterTopic === id);
		if (!topic) throw `Invalid topic ID '${frontmatterTopic}' in post '${frontmatter.title}'`;
		return topic;
	});

	// 3. Resolve tags.
	const resolvedTags = frontmatter?.tags?.map((frontmatterTag) => {
		const tag = tags.find(({ id }) => frontmatterTag === id);
		if (!tag) throw `Invalid tag ID '${frontmatterTag}' in post '${frontmatter.title}'`;
		return tag;
	});

	// 4. Process URLs of origin images.
	const images: Images = {};
	frontmatter?.images
		?.map(({ id, url }) => ({
			id,
			src: createSrc(url),
			srcset: createSrcset(url)
		}))
		.forEach(({ id, src, srcset }) => {
			images[id] = { src, srcset };
		});

	const post = {
		title: frontmatter.title,
		author,
		published: frontmatter.published,
		modified: frontmatter.modified,
		description: frontmatter.description,
		topics: resolvedTopics,
		tags: resolvedTags,
		links: frontmatter.links,
		images,
		path
	};
	return post;
}

/**
 * Comparator for posts. Sort by
 * 1. published date desc
 * 2. modified date desc
 * 3. title asc
 */
function PublishedDateCompare(a: Post, b: Post): number {
	return (
		b.published.localeCompare(a.published) ||
		b.modified.localeCompare(a.modified) ||
		a.title.localeCompare(b.title)
	);
}

/**
 * Comparator for posts. Sort by
 * 1. modified date desc
 * 2. published date desc
 * 3. title asc
 */
function ModifiedDateCompare(a: Post, b: Post): number {
	return (
		b.modified.localeCompare(a.modified) ||
		b.published.localeCompare(a.published) ||
		a.title.localeCompare(b.title)
	);
}

export async function getPosts({
	topic,
	tag,
	compare = 'published'
}: {
	topic?: string;
	tag?: string;
	compare?: 'published' | 'modified';
}): Promise<Post[]> {
	let posts: { frontmatter: PostFrontmatter; path: string }[];

	// Read frontmatters from all post Markdown files.
	posts = await Promise.all(
		// import.meta.glob returns an object that looks like this:
		// {
		//   './dir/foo.js': () => import('./dir/foo.js'),
		//   './dir/bar.js': () => import('./dir/bar.js')
		// }
		//
		// import.meta.glob triggers Mardown processing and Object.entries flattens object into array.
		Object.entries(import.meta.glob('/src/routes/posts/**/*.{md,svx}')).map(
			async ([, resolver]) => {
				const { metadata } = (await resolver()) as {
					metadata: PostFrontmatter;
				};
				return {
					frontmatter: metadata,
					path: `/posts/${slugify(metadata.title)}`
				};
			}
		)
	);

	// Remove posts with an unpublish flag in frontmatter.
	posts = posts.filter(({ frontmatter }) => !frontmatter.unpublish);

	// Remove posts with publish date in the future.
	const today = new Date();
	posts = posts.filter(({ frontmatter }) => new Date(frontmatter.published) <= today);

	// If a topic is provided, filter posts by topic.
	if (topic) {
		posts = posts.filter(({ frontmatter }) =>
			frontmatter.topics ? frontmatter.topics.includes(topic) : false
		);
	}

	// If a tag is provided, filter posts by tag.
	if (tag) {
		posts = posts.filter(({ frontmatter }) =>
			frontmatter.tags ? frontmatter.tags.includes(tag) : false
		);
	}

	const normalizedPosts = posts.map(({ frontmatter, path }) => normalize(frontmatter, path));

	switch (compare) {
		case 'modified':
			normalizedPosts.sort(ModifiedDateCompare);
			break;
		default:
			normalizedPosts.sort(PublishedDateCompare);
	}

	return normalizedPosts;
}