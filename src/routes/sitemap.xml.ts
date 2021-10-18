import type { RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';
import categories from '$lib/data/categories';
import tags from '$lib/data/tags';
import pkg from '../../package.json';

// Generate a basic XML sitemap.
// See https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#xml.

function createPage(href: string, lastmod?: string | Date) {
  return `
    <url>
      <loc>${new URL(href, pkg.homepage).href}</loc>
      ${lastmod ? '<lastmod>' + lastmod + '</lastmod>' : ''}
    </url>
  `;
}

export const get: RequestHandler = async function () {
  // Post pages.
  const posts = await getPosts();
  const postPages = posts.map((post) => createPage(post.path, post.updated));

  // Category pages.
  const categoryPages = categories
    // If path is omitted, omit category in sitemap.
    .filter((category) => category.path)
    .map((category) => createPage(category.path));

  // Tag pages.
  const tagPages = tags.map((tag) => createPage(tag.path));

  const pages = [
    createPage('/'),
    createPage('posts'),
    ...postPages,
    ...categoryPages,
    ...tagPages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.join('\n')}
	</urlset>
  `;

  return {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
    body: sitemap,
  };
};
