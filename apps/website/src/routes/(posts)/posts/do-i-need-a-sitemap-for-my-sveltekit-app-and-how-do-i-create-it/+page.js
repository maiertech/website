export function load() {
	return { examples };
}

const examples = {
	'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://maier.tech/</loc>
		<lastmod>2023-02-28</lastmod>
	</url>
</urlset>`,
	'src/routes/sitemap.xml/+server.js structure': `export async function GET({ fetch, setHeaders }) {
	setHeaders({
	  'Content-Type': 'application/xml'
	});

	const response = await fetch('/api/posts');

	// ...

	const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// Add an entry for each post.
</urlset>\`;

	return new Response(sitemap);
}`,
	'create_entry.js': `function create_entry(path, lastmod) {
	return \`<url>
    <loc>\${new URL(path, ORIGIN).href}</loc>
    \${lastmod ? \`<lastmod>\${lastmod}</lastmod>\` : ''}
  </url>\`;
}`,
	'src/routes/sitemap.xml/+server.js final': `export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});

	const response = await fetch('/api/posts');

	if (!response.ok) {
		throw error(500, 'Failed to fetch posts.');
	}

	const raw_posts = await response.json();

	const posts = raw_posts.map((post) => create_entry(post.path, post.lastmod));

	const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${posts.join('\\n')}
</urlset>\`;

	return new Response(sitemap);
}`
};
