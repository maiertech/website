import tags from '$lib/data/tags';
import topics from '$lib/data/topics';
import { BASE_URL } from '$lib/data/site';
import posts from '$lib/data/posts';

// Generate a basic XML sitemap.
// See https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#xml.

function createPage(href: string, lastmod?: string | Date) {
	return `
    <url>
      <loc>${new URL(href, BASE_URL).href}</loc>
      ${lastmod ? '<lastmod>' + lastmod + '</lastmod>' : ''}
    </url>
  `;
}

export const GET = async function () {
	const postPages = posts.map((post) => createPage(post.slug, post.modified));
	const topicPages = topics.map((topic) => createPage(topic.path));
	const tagPages = tags.map((tag) => createPage(tag.path));

	const pages = [createPage('/'), createPage('posts'), ...postPages, ...topicPages, ...tagPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.join('\n')}
	</urlset>
  `;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
