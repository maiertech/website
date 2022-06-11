import authors from '$data/authors';
import categories from '$data/categories';
import tags from '$data/tags';

import type { PostFrontmatter } from '$models/frontmatter.model';
import type { Post } from '$models/content.model';

/**
 * Figure out keys of suppressed categories.
 */
const suppressedCategories = categories
  .filter((category) => category.suppress)
  .map((category) => category.id);

/**
 * Transform post frontmatter into post metadata.
 */
export function normalize(frontmatter: PostFrontmatter, path: string): Post {
  const author = authors.find(({ id }) => frontmatter.author === id);

  if (!author)
    throw `Invalid author ID '${frontmatter.author}' in post '${frontmatter.title}'`;

  const category = categories.find(({ id }) => frontmatter.category === id);

  if (!category)
    throw `Invalid category ID '${frontmatter.category}' in post '${frontmatter.title}'`;

  const resolvedTags = frontmatter?.tags?.map((frontmatterTag) => {
    const tag = tags.find(({ id }) => frontmatterTag === id);
    if (!tag)
      throw `Invalid tag key '${frontmatterTag}' in post '${frontmatter.title}'`;
    return tag;
  });

  const post = {
    title: frontmatter.title,
    author,
    published: frontmatter.published,
    modified: frontmatter.modified,
    description: frontmatter.description,
    category,
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
  category,
  tag,
  compare = 'published',
}: {
  category?: string;
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
      async ([path, processMarkdown]) => {
        const { metadata } = await processMarkdown();
        const segments = path.split('/');
        return {
          frontmatter: metadata,
          path: `/${segments[3]}/${segments[4]}`,
        };
      }
    )
  );

  // If a category is provided, filter posts by category.
  if (category) {
    posts = posts.filter(
      ({ frontmatter }) => frontmatter.category === category
    );
  }
  // If no category is provided, filter out posts in suppressed categories.
  else {
    posts = posts.filter(
      ({ frontmatter }) => !suppressedCategories.includes(frontmatter.category)
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
