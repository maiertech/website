import authors from '$data/authors';
import topics from '$data/topics';
import tags from '$data/tags';

import type { PostFrontmatter } from '$models/frontmatter.model';
import type { Post } from '$models/content.model';

/**
 * Transform post frontmatter into post metadata.
 */
export function normalize(frontmatter: PostFrontmatter, path: string): Post {
  // Check if author ID is valid.
  const author = authors.find(({ id }) => frontmatter.author === id);

  if (!author)
    throw `Invalid author ID '${frontmatter.author}' in post '${frontmatter.title}'`;

  const resolvedTopics = frontmatter?.topics?.map((frontmatterTopic) => {
    const topic = topics.find(({ id }) => frontmatterTopic === id);
    if (!topic)
      throw `Invalid topic ID '${frontmatterTopic}' in post '${frontmatter.title}'`;
    return topic;
  });

  const resolvedTags = frontmatter?.tags?.map((frontmatterTag) => {
    const tag = tags.find(({ id }) => frontmatterTag === id);
    if (!tag)
      throw `Invalid tag ID '${frontmatterTag}' in post '${frontmatter.title}'`;
    return tag;
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
    path,
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
  compare = 'published',
}: {
  topic?: string;
  tag?: string;
  compare?: 'published' | 'modified';
}): Promise<Post[]> {
  let posts: { frontmatter: PostFrontmatter; path: string }[];

  // Read frontmatters from all post Markdown files.
  posts = await Promise.all(
    // import.meta.glob returns object { 'path': () => import('path') }.
    // Object.entries flattens object into array.
    // `import` is Vite's import function, which also triggers Markdown processing.
    Object.entries(import.meta.glob('/src/routes/posts/**/*.md')).map(
      async ([path, resolver]) => {
        const { metadata } = (await resolver()) as {
          metadata: PostFrontmatter;
        };
        const segments = path.split('/');
        return {
          frontmatter: metadata,
          path: `/${segments[3]}/${segments[4]}`,
        };
      }
    )
  );

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

  const normalizedPosts = posts.map(({ frontmatter, path }) =>
    normalize(frontmatter, path)
  );

  switch (compare) {
    case 'modified':
      normalizedPosts.sort(ModifiedDateCompare);
      break;
    default:
      normalizedPosts.sort(PublishedDateCompare);
  }

  return normalizedPosts;
}
