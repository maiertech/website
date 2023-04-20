<script>
	import Image from '$lib/components/image.svelte';
	import Highlight from 'svelte-highlight';
	import { javascript, xml } from 'svelte-highlight/languages';

	export let data;
	const { examples } = data;
</script>

<p>
	Last week I refactored parts of this website and broke the endpoint that creates
	<a data-sveltekit-reload href="/sitemap.xml">this sitemap</a>. I decided to read up on sitemaps
	before fixing the route. Here is what I learned.
</p>

<h2>Google's take on sitemaps</h2>

<p>
	Web developers often assume that Google might only index their site regularly with a sitemap. But
	is this true? In the
	<a
		href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview#do-i-need-a-sitemap"
		>Google Search Console docs</a
	>, Google answers the question "Do I need a sitemap?" with it depends. Google recommends a sitemap
	when
</p>

<ul>
	<li>you launch a new site, and no or few external links point to your site or</li>
	<li>your site is large, and not all pages are linked and discoverable by Google's crawler.</li>
</ul>

<p>You do not need a sitemap if</p>

<ul>
	<li>your site is small (up to 500 relevant pages) or</li>
	<li>your site is linked correctly, and Google can find all relevant pages by crawling it.</li>
</ul>

<p>
	My website <a href="/">maier.tech</a> is small, and all pages are discoverable by a crawler. As recommended
	by Google, I submitted a sitemap in May 2021 as an initial SEO boost. You can see when Google last
	read a sitemap in the Google Search Console. For my site maier.tech it was almost two years ago:
</p>

<figure>
	<Image
		ratio={1868 / 544}
		alt="Screenshot of submitted sitemaps in the Google Search Console. Sitemap submission date: May 21, 2021. Sitemap last read: June 28, 2021."
		url="https://share.mailbox.org/ajax/share/059cb3a003a6d60851f7ccb3a6d6403c84328f7c08a553af/1/8/MjQz/MjQzLzM1OQ?dl=true"
		loading="lazy"
	/>
	<figcaption>For small sites, a sitemap is only initially relevant.</figcaption>
</figure>

<h2>Different types of sitemaps</h2>

<p>
	Google supports <a
		href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml"
		>different types of sitemaps</a
	>. If your site already has an RSS feed, you can submit the feed URL as a sitemap and call it a
	day. But the most common sitemap type is XML. A simple XML sitemap that indexes only the homepage
	looks like this:
</p>

<figure>
	<Highlight language={xml} code={examples['sitemap.xml']} />
	<figcaption>sitemap.xml</figcaption>
</figure>

<p>
	Every indexed page goes in a <code>&lt;url&gt;</code> tag. The <code>&lt;loc&gt;</code> tag
	contains the URL of the indexed page. The
	<code>&lt;lastmod&gt;</code> tag contains the last modified date. You may have encountered posts
	mentioning two more tags, <code>&lt;priority&gt;</code> and <code>&lt;changefreq&gt;</code>. There
	is no need to worry about choosing values for these two tags.
	<a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml"
		>Google ignores both</a
	>
	(<a
		href="https://blogs.bing.com/webmaster/february-2023/The-Importance-of-Setting-the-lastmod-Tag-in-Your-Sitemap"
		>and so does Bing</a
	>).
</p>

<h2>Creating a sitemap with SvelteKit</h2>

<p>
	<a href="https://kit.svelte.dev/docs/seo#manual-setup-sitemaps">SvelteKit's SEO docs</a> show an
	example of a sitemap implemented as an endpoint in <code>src/routes/sitemap.xml/+server.js</code>.
	The <code>GET</code> handler assembles an XML string to which you add relevant routes. There is no
	need to add all routes, only those you want to be indexed by Google. The catch is that you need to
	figure out how to retrieve the entries for your sitemap. There is no copy-paste blueprint for how to
	create a sitemap with SvelteKit. But I will walk you through the steps.
</p>

<h3>Create endpoints to retrieve relevant pages</h3>

<p>
	I created an endpoint
	<a href="https://github.com/maiertech/maier.tech/blob/main/src/routes/api/posts/%2Bserver.js"
		><code>src/api/posts/+server.js</code></a
	> that returns a list of all posts. I manage my posts in Markdown files; the endpoint reads the frontmatters
	and returns them. If I managed my posts in a CMS, the endpoint would retrieve them via an API call
	to the CMS. Add an endpoint for each type of content you want to include in your sitemap.
</p>

<h3>Create a sitemap endpoint</h3>

<p>
	Create endpoint <code>src/routes/sitemap.xml/+server.js</code> and add an async <code>GET</code> handler
	with the following structure:
</p>

<figure>
	<Highlight language={javascript} code={examples['src/routes/sitemap.xml/+server.js structure']} />
	<figcaption>Structure of src/routes/sitemap.xml/+server.js.</figcaption>
</figure>

<p>
	Since this endpoint returns XML, I set the content type to <code>application/xml</code>. Then I
	fetch all posts from my endpoint <code>/api/posts</code>. At the end of the handler, I create the
	XML string, wrap it in a response object and return it.
</p>

To make creating entries easier, I use this helper function:

<Highlight language={javascript} code={examples['create_entry.js']} />

<p>
	<code>path</code> is a relative path, and <code>lastmod</code> is a date string in ISO format. I
	get both from my <code>/api/posts</code> endpoint. <code>ORIGIN</code> is an environment variable
	containing my site's origin "https://maier.tech". Google expects absolute URLs in a sitemap. And
	since a SvelteKit app cannot determine its public URL, I use the <code>ORIGIN</code> variable to assemble
	absolute URLs.
</p>

<p>Let's add error handling to wrap up the handler:</p>

<figure>
	<Highlight language={javascript} code={examples['src/routes/sitemap.xml/+server.js final']} />
	<figcaption>src/routes/sitemap.xml/+server.js with error handling.</figcaption>
</figure>

<p>
	The above code is a simplified version of my <a
		href="https://github.com/maiertech/maier.tech/blob/main/src/routes/sitemap.xml/%2Bserver.js"
		>actual endpoint</a
	>, which you can explore on GitHub. My actual endpoint adds caching, validation, and prerendering.
</p>

<h2>Alternative sitemap creation</h2>

<p>
	If your SvelteKit site uses
	<a href="https://kit.svelte.dev/docs/adapter-static">adapter-static</a>, you can use package
	<a href="https://github.com/bartholomej/svelte-sitemap">svelte-sitemap</a>. With this package,
	instead of implementing an endpoint for a sitemap, you can configure the <code>postbuild</code>
	hook in
	<code>package.json</code> to scan all routes in the <code>build</code> directory and create
	<code>build/sitemap.xml</code>. This approach only works with adapter-static since svelte-sitemap
	cannot determine all possible routes for other adapters.
</p>
