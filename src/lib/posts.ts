import type PostFrontmatter from './types/post-frontmatter.type';
import type { PostMetadata } from './types/post-metadata.type';
import { join } from 'path';
import authors from '$lib/authors';
import categories from '$lib/categories';
import tags from '$lib/tags';

export async function getPosts(tag?: string): Promise<PostMetadata[]> {
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
          path: join('/', segments[3], segments[4]),
        };
      }
    )
  );

  // If a tag is provided filter posts by tag.
  if (tag) {
    posts = posts.filter(({ frontmatter }) => frontmatter?.tags.includes(tag));
  }

  // Sort posts by date descending (newest first).
  posts.sort((a, b) =>
    new Date(a.frontmatter.date) > new Date(b.frontmatter.date) ? -1 : 1
  );

  const normalizedPosts = posts.map(({ frontmatter, path }) =>
    normalize(frontmatter, path)
  );

  return normalizedPosts;
}

export function normalize(
  frontmatter: PostFrontmatter,
  path: string
): PostMetadata {
  const post = {
    title: frontmatter.title,
    author: authors.find(({ key }) => frontmatter.author === key),
    date: frontmatter.date,
    description: frontmatter.description,
    category: categories.find(({ key }) => frontmatter.category === key),
    tags: frontmatter?.tags
      .map((tag) => tags.find(({ key }) => tag === key))
      .filter((tag) => tag),
    path,
  };
  return post;
}
