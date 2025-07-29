import { VERCEL_URL } from '$env/static/private';
import type { RssItem } from '$lib/types';
import { getFullOrigin } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

const fullOrigin = getFullOrigin(VERCEL_URL);

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/posts/rss');
	const rssItems = (await response.json()) as RssItem[];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Thilo Maier (posts)</title>
    <description>RSS feed for Thilo Maier's posts.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <link>${fullOrigin}/posts/rss.xml</link>
    <atom:link href="${fullOrigin}/posts/rss.xml" rel="self" type="application/rss+xml"></atom:link>
    ${rssItems
			.map(
				(item) => `
      <item>
        <title>${item.title}</title>
        <description>${item.description}</description>
        <link>${item.link}</link>
        <pubDate>${item.pubDate}</pubDate>
        ${item.enclosure ? `<enclosure url="${item.enclosure.url}" length="${item.enclosure.length}" type="${item.enclosure.type}"></enclosure>` : ''}
        <guid>${item.link}</guid>
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
