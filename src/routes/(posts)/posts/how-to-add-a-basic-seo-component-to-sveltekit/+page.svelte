<script>
	import { Image } from '$lib/components';
	import Highlight, { HighlightSvelte } from 'svelte-highlight';
	import { javascript, xml } from 'svelte-highlight/languages';
	import seoDataFlowImage from './seo-data-flow.png';

	export let data;
</script>

<p>
	SvelteKit does not come with a built-in SEO component. The
	<a href="https://kit.svelte.dev/docs/seo#manual-setup">SvelteKit SEO docs</a> provide guidance on the
	minimal requirements for an SEO component. But they do not go into implementation details. In this
	post, I will show you how to build a basic SEO component and which data it should provide to search
	engines.
</p>

<h2>SEO meta tags</h2>

<p>
	You need to put SEO data into the <code>&lt;head&gt;</code> element of each page as
	<a href="https://ahrefs.com/blog/seo-meta-tags/">meta tags</a>. Some meta tags are the same for
	each page and SvelteKit adds them for you in src/app.html, e.g., meta charset and meta viewport:
</p>

<figure>
	<Highlight language={xml} code={data.examples['src/app.html']} />
	<figcaption>src/app.html</figcaption>
</figure>

<p>
	Other meta tags are page-specific, and you need to figure out a way to set them for each page.
	Svelte comes with a special element
	<a href="https://svelte.dev/docs#template-syntax-svelte-head"><code>&lt;svelte:head&gt;</code></a>
	which makes it possible to add meta tags to pages dynamically. The SvelteKit SEO docs recommend adding
	at least the <em>title</em> and <em>description</em> meta tags. But I recommend adding a third
	one: <em>canonical URL</em>.
</p>

<h2>What is a canonical URL?</h2>

<p>
	A canonical URL is a <code>&lt;link&gt;</code> tag added to the <code>&lt;head&gt;</code> of an HTML
	page. It looks like this:
</p>

<figure>
	<Highlight
		language={xml}
		code={`<link rel="canonical" href="https://maier.tech/posts/how-to-add-a-basic-seo-component-to-sveltekit" />`}
	/>
</figure>

<p>
	When a search engine detects duplicate content, be it within a website or across websites, it has
	to figure out which instance it considers to be the original. Search engines rank what they
	consider to be the canonical version higher than duplicates. In other words, duplicate content
	gets an SEO penalty. The link tag provides search engines with a hint of what they should consider
	the canonical version.
</p>

<p>There are two common scenarios for duplicate content:</p>

<ol>
	<li>
		When you syndicate content, i.e., you cross-publish it to other websites. E.g., some developers
		publish their posts on their personal website and cross-post to
		<a href="https://hashnode.com/">Hashnode</a> to reach a bigger audience. If they want SEO traffic
		to be directed to their personal website, they have to ensure that search engines consider that URL
		the canonical version.
	</li>
	<li>
		Accidental duplication, e.g., your website can be reached at https://example.com and
		https://www.example.com. Or when deploy previews get indexed by search engines accidentally.
	</li>
</ol>

<p>Adding a canonical link tag can help you manage these two scenarios.</p>

<h2>Building a basic SEO component</h2>

<p>
	Before I show you how to build a basic SEO component, let me address the question if you should
	use an SEO component package. There is
	<a href="https://github.com/oekazuma/svelte-meta-tags">svelte-meta-tags</a> by Kazuma Oe and
	<a href="https://github.com/spences10/svead">Svead</a> by Scott Spences. They are both viable
	options, but they are essentially just a <code>&lt;svelte:head&gt;</code> with props.
</p>

<p>
	SEO requirements vary based on your content and target audience. E.g., for a blog, you may want to
	support <a href="https://ogp.me/">Open Graph metadata</a> but also
	<a href="https://developers.google.com/search/docs/appearance/structured-data/article"
		>structured data with JSON-LD Article</a
	>. A one-size-fits-all SEO component like the one from svelte-meta-tags has a complicated API
	because it covers many use cases. I think it is better to start with a small custom SEO component,
	study Google's
	<a href="https://developers.google.com/search/docs/appearance"
		>Ranking and search appearance docs</a
	>, and add more SEO data on the fly when you need it.
</p>

<p>So, here is my basic SEO component:</p>

<figure>
	<HighlightSvelte code={data.examples['seo-default-data.svelte']} />
	<figcaption>Basic SEO component for a SvelteKit app.</figcaption>
</figure>

<p>
	The component is also just a <code>&lt;svelte:head&gt;</code> with props: <code>title</code>
	(required), <code>description</code> (required) and <code>canonical_url</code> (optional). They
	are passed in as <code>data</code> object. This component works with SvelteKit only because it
	imports SvelteKit's <code>page</code> store, which provides access to the current path. I decorate
	the SEO title on all pages, except the root page, with a <code>decorate</code> function. E.g., I could
	append my name:
</p>

<figure>
	<Highlight language={javascript} code={data.examples['src/lib/utils/decorate.js']} />
	<figcaption>src/lib/utils/decorate.js</figcaption>
</figure>

<p>
	Decorating the SEO title is an opportunity to add a lightweight branding when you appear in search
	results. But there is no guarantee that search engines use the decorated SEO title in their search
	results. They might also use the text of the <code>&lt;h1&gt;</code> element.
</p>

<p>
	The <em>description</em> meta tag is just text with a and short description of the page. Keep it very
	short. There is no room for bla bla in search results. Just in general, consider SEO meta tags to be
	suggestions for search engines how to rank and display you in search results, not instructions.
</p>

<p>
	The canonical link tag of the SEO component covers the two scenarios mentioned before. First, it
	sets a default canonical URL as insurance against an SEO penalty caused by accidental duplicate
	content. The origin of the default canonical URL comes from the environment variable
	<code>PUBLIC_CANONICAL_ORIGIN</code>, e.g., https://maier.tech, and is intentionally hard-wired.
</p>

<p>
	If you provide property <code>canonical_url</code>, it will override the default canonical URL.
	This is useful when you syndicate content from another website and that other website is the
	canonical website.
</p>

<h2>How to retrieve SEO data</h2>

<p>
	Now that we have a basic SEO component, we need to figure out how to retrieve the title and
	description for each page and pass it into the SEO component. If your site has only a few pages,
	you can add the SEO component to each page and hard-wire title and description.
</p>

<p>
	But for more complex sites, the SEO component is placed in a layout. The layout is unaware of
	which page it wrapts. Therefore, we have to find a way to get page data into a layout. Let's recap
	Sveltekit's
	<a href="https://kit.svelte.dev/docs/load">load functions</a>:
</p>

<ul>
	<li>
		For <code>+page.svelte</code>, a load function can be placed in <code>+page.js</code> or
		<code>+page.server.js</code> (or their TypeScript equivalents).
	</li>
	<li>
		For <code>+layout.svelte</code>, a load function can be placed in <code>+layout.js</code> or
		<code>+layout.server.js</code> (or their TypeScript equivalents).
	</li>
</ul>

<p>
	SEO data is page-specific and needs to be retrieved at the page level in
	<code>+page.js</code> or <code>+page.server.js</code>. But the SEO component is rendered as part
	of the layout. So, how can we get page-specific SEO data into a layout? Let's look at the
	following diagram:
</p>

<figure>
	<Image
		src={seoDataFlowImage}
		alt="Diagram of how data from load functions can be shared between a page and a layout top down or bottom up."
	/>
	<figcaption>How SvelteKit's load functions share data.</figcaption>
</figure>

<p>
	The diagram shows a <code>+page.svelte</code> and its corresponding <code>+page.js</code>, which
	contains the load function. This load function has to return SEO data and any other data required
	to render the page. However, the SEO data is required in <code>+layout.svelte</code>, which
	renders the SEO component. We have to share the data retrieved in <code>+page.js</code>
	<em>upwards</em>.
</p>

<p>
	By default, SvelteKit shares data returned from load functions <em>downwards</em>, i.e., the data
	passed from <code>+layout.js</code> to <code>+layout.svelte</code> is merged into the data passed
	from <code>+page.js</code> to <code>+page.svelte</code>.
</p>

<p>
	For the opposite direction, SvelteKit uses the <code>page</code> store. Therefore, we can access
	the data returned from <code>+page.js</code> with <code>$page.data</code> inside
	<code>+layout.svelte</code>.
</p>

<p>
	To wrap up this post, let's look at two code examples. The first one shows a minimal load function
	for a page:
</p>

<figure>
	<Highlight language={javascript} code={data.examples['src/routes/+page.js']} />
	<figcaption>src/routes/+page.js</figcaption>
</figure>

<p>
	This load function returns only a title and description. The second code example shows how to
	retrieve the title and description from <code>$page.data</code> in a layout further up in the component
	hierarchy:
</p>

<figure>
	<HighlightSvelte code={data.examples['src/routes/+layout.svelte']} />
	<figcaption>src/routes/+layout.svelte</figcaption>
</figure>
