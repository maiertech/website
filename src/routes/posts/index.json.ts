import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  // Caching files to avoid reading the same files several times from the file system would break local dev.

  const posts = await Promise.all(
    // import.meta.glob returns object { 'path': () => import('path') }.
    // Object.entries flattens object into array.
    // `import` is Vite's import function, which also triggers Markdown processing.
    Object.entries(import.meta.glob('/src/routes/posts/**/*.md')).map(
      async ([path, processMarkdown]) => {
        const { metadata } = await processMarkdown();
        const segments = path.split('/');
        return { ...metadata, path: `/${segments[3]}/${segments[4]}` };
      }
    )
  );

  posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return {
    status: 200,
    body: { posts },
  };
};
