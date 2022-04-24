import type PostFrontmatter from './types/post-frontmatter.type';
import type { PostMetadata } from './types/post-metadata.type';
import authors from '$lib/data/authors';
import categories from '$lib/data/categories';
import tags from '$lib/data/tags';

const suppressedCategories = categories
  .filter((category) => category.suppress)
  .map((category) => category.key);

// Transform post frontmatter into post metadata.
export function normalize(
  frontmatter: PostFrontmatter,
  path: string
): PostMetadata {
  const author = authors.find(({ key }) => frontmatter.author === key);
  if (!author)
    throw `Invalid author key '${frontmatter.author}' in post '${frontmatter.title}'`;
  const category = categories.find(({ key }) => frontmatter.category === key);
  if (!category)
    throw `Invalid category key '${frontmatter.category}' in post '${frontmatter.title}'`;
  const post = {
    title: frontmatter.title,
    author,
    published: frontmatter.published,
    modified: frontmatter.modified,
    description: frontmatter.description,
    category,
    tags: frontmatter?.tags?.map((frontmatterTag) => {
      const tag = tags.find(({ key }) => frontmatterTag === key);
      if (!tag)
        throw `Invalid tag key '${frontmatterTag}' in post '${frontmatter.title}'`;
      return tag;
    }),
    links: frontmatter.links,
    path,
  };
  return post;
}

function compare(a: PostMetadata, b: PostMetadata): number {
  return (
    // desc
    b.modified.localeCompare(a.modified) ||
    // desc
    b.published.localeCompare(a.published) ||
    // asc
    a.title.localeCompare(b.title)
  );
}

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
  // If no category is provided filter out posts in suppressed categories.
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

  normalizedPosts.sort(compare);

  return normalizedPosts;
}
