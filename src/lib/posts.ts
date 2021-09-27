import type PostFrontmatter from './types/post-frontmatter.type';
import type { PostMetadata } from './types/post-metadata.type';
import orderBy from 'lodash.orderby';
import authors from '$lib/data/authors';
import categories from '$lib/data/categories';
import tags from '$lib/data/tags';

export async function getPosts(
  category?: string,
  tag?: string
): Promise<PostMetadata[]> {
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

  // If a tag is provided, filter posts by tag.
  if (tag) {
    posts = posts.filter(({ frontmatter }) => frontmatter?.tags.includes(tag));
  }

  // Sort posts by `updated` desc, `date` desc, `title` asc.
  posts = orderBy(posts, ['updated', 'date', 'title'], ['desc', 'desc', 'asc']);

  const normalizedPosts = posts.map(({ frontmatter, path }) =>
    normalize(frontmatter, path)
  );

  return normalizedPosts;
}

export function normalize(
  frontmatter: PostFrontmatter,
  path?: string
): PostMetadata {
  const post = {
    title: frontmatter.title,
    author: authors.find(({ key }) => frontmatter.author === key),
    date: frontmatter.date,
    updated: frontmatter.updated,
    description: frontmatter.description,
    category: categories.find(({ key }) => frontmatter.category === key),
    tags: frontmatter?.tags
      .map((tag) => tags.find(({ key }) => tag === key))
      .filter((tag) => tag),
    links: frontmatter.links,
    path,
  };
  return post;
}
