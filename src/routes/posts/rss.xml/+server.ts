import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { ResolvedPost } from '@maiertech/sveltekit-helpers';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/posts/latest');
	const posts = (await response.json()) as ResolvedPost[];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Thilo Maier (posts)</title>
    <description>RSS feed for Thilo Maier's posts.</description>
    <link>${PUBLIC_URL_ORIGIN}</link>
    <language>en-US</language>
    <generator>${PUBLIC_URL_ORIGIN}</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${PUBLIC_URL_ORIGIN}/posts/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
			.map(
				(post) => `
      <item>
        <title>${post.title}</title>
        <description>${post.description}</description>
        <link>${PUBLIC_URL_ORIGIN}${post.path}</link>
        <pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
        <guid>${PUBLIC_URL_ORIGIN}${post.path}</guid>
      </item>
    `
			)
			.join('')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
