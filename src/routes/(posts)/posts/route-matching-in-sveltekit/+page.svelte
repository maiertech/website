<script>
	import { Card } from '$lib/components';
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import Highlight from 'svelte-highlight';
	import { bash } from 'svelte-highlight/languages';
</script>

<p>
	<strong>
		This post is outdated for SvelteKit 1.x. It covers SvelteKit's router before SvelteKit
		1.0.0-next.406.
	</strong>
</p>

<p>The <a href="https://kit.svelte.dev/docs#routing">SvelteKit docs</a> state that</p>

<blockquote>
	<p>
		At the heart of SvelteKit is a filesystem-based router. This means that the structure of your
		application is defined by the structure of your codebase — specifically, the contents of
		<code>src/routes</code>.
	</p>
</blockquote>

<p>
	In this post, we will explore how SvelteKit's
	<a href="https://kit.svelte.dev/docs#routing">filesystem-based router</a> matches a requested
	route to a page or an endpoint. SvelteKit transforms each route file in <code>src/routes</code> into
	a page or an endpoint. Conversely, SvelteKit needs to match a requested route to a route file. This
	is called route matching.
</p>

<p>
	A filesystem-based router makes route matching straightforward: the route can be interpreted as
	the subpath in <code>src/routes</code> and often there is only one matching route file. But what happens
	when there are multiple matching route files? How does SvelteKit decide which route file it uses to
	render a page or endpoint?
</p>

<p>
	In this post, we look at a SvelteKit example and explore the rules that SvelteKit applies to
	decide which page or endpoint to serve. You will make the most out of this post if you follow
	along:
</p>

<StackBlitzEmbed
	project="maiertech/sveltekit-example-route-matching"
	options={{ openFile: 'src/routes/index.svelte' }}
/>

<h2>Duplicate route files are not permitted</h2>

<p>
	When you have the example up and running, click route <code>/green</code> in the preview.
	SvelteKit matches this request to page <code>src/routes/green.svelte</code>. This is the
	filesystem-based router at work, which takes the route and looks for the corresponding route file
	in <code>src/routes</code>.
</p>

<p>
	Now click route <code>/red</code>. This time SvelteKit matches the request to page
	<code>src/routes/red/index.svelte</code>, which is equivalent to
	<code>src/routes/red.svelte</code>.
</p>

<p>
	Create file <code>src/routes/red.svelte</code> in the example and copy the content of file
	<code>src/routes/red/index.svelte</code>. You should see this error message in the terminal:
</p>

<figure>
	<Highlight
		language={bash}
		code={`$ svelte-kit dev
> Duplicate route files: src/routes/red`}
	/>
</figure>

<Card>
	<p><strong>Rule 1: Duplicate route files are not permitted.</strong></p>
	<p>
		You cannot have both <code>src/routes/red/index.svelte</code> and
		<code>src/routes/red.svelte</code>. SvelteKit won't let you.
	</p>
</Card>

<p>Delete <code>src/routes/red.svelte</code> and run</p>

<figure>
	<Highlight language={bash} code={`npm run dev`} />
</figure>

<p>to restart the development server.</p>

<h2>Matching against path segments</h2>

<p>
	The SvelteKit router matches strings of route segments to path segments. Path segments inside
	<code>src/routes</code> can be static (<code>.../static/...</code>) or dynamic (
	<code>.../[dynamic]/...</code>) with square brackets. Dynamic path segments match any string.
	Static path segments require an exact match. The second rule describes the order in which
	SvelteKit matches route segments to path segments:
</p>

<Card>
	<p>
		<strong>Rule 2: SvelteKit matches route segments to path segments left to right.</strong>
	</p>
</Card>

<p>
	Let's revisit the <code>/red</code> route from before. Now that we know what dynamic path segments
	are, we realize that there were three more candidate pages:
</p>

<ul>
	<li><code>src/routes/[color].svelte</code></li>
	<li><code>src/routes/[nocolor].svelte</code></li>
	<li><code>src/routes/[colour]/index.svelte</code></li>
</ul>

<p>
	These are not duplicate routes because the strings inside <code>[]</code> differ. We already know
	from the previous section, that <code>/red</code> is not rendered with any of the above candidate pages.
	The reason is this rule:
</p>

<Card>
	<p>
		<strong>Rule 3: Static path segments take precedence over dynamic path segments.</strong>
	</p>
	<p>
		E.g., <code>src/routes/green.svelte</code> (static) takes precedence over
		<code>src/routes/[color].svelte</code> (dynamic).
	</p>
</Card>

<h2>Alphabetical order of path segments</h2>

<p>Let's look at route <code>/blue</code> in the example. The candidate pages are:</p>

<ul>
	<li><code>src/routes/[color].svelte</code></li>
	<li><code>src/routes/[nocolor].svelte</code></li>
	<li><code>src/routes/[colour]/index.svelte</code></li>
</ul>

<p>
	We need another rule to choose the page that is used to render
	<code>/blue</code>:
</p>

<Card>
	<p>
		<strong>Rule 4: Index pages take precedence over non-index pages.</strong>
	</p>
	<p>
		This is only relevant for pages that are not considered duplicate routes, e.g.,
		<code>src/routes/[colour]/index.svelte</code> takes precedence over
		<code>src/routes/[color].svelte</code>.
	</p>
</Card>

<p>
	When matching route segment <code>blue</code>, we can use this rule to eliminate the first two
	candidate pages. This results in page <code>src/routes/[colour]/index.svelte</code> being
	rendered. You can confirm this by clicking on <code>/blue</code> in the example.
</p>

<p>
	Let's delete page <code>src/routes/[colour]/index.svelte</code> in the example. To make the
	workspace pick up this change, you need to click in the terminal and hit <code>⌃C</code>. Restart
	the development server with
	<code>npm run dev</code>.
</p>

<p>Now the two candidates for route <code>/blue</code> are:</p>

<ul>
	<li><code>src/routes/[color].svelte</code></li>
	<li><code>src/routes/[nocolor].svelte</code></li>
</ul>

<p>
	A look at the rendered page reveals that the router used
	<code>src/routes/[color].svelte</code>. It did so because of this rule:
</p>

<Card>
	<p>
		<strong>
			Rule 5: For two path segments of the same type, the first one in alphabetical order takes
			precedence.
		</strong>
	</p>
	<p>
		E.g., <code>src/routes/[color].svelte</code> takes precedence over
		<code>src/routes/[nocolor].svelte</code> because
		<code>color</code> comes before <code>nocolor</code> in alphabetical order.
	</p>
</Card>

<h2>Matching with spread syntax</h2>

<p>Let's look at route <code>/color/blue</code> in the example. The candidate pages are:</p>

<ul>
	<li><code>src/routes/color/[color].svelte</code></li>
	<li><code>src/routes/color/[...rest].svelte</code></li>
</ul>

<p>
	<code>[...rest]</code> in the second route is a dynamic path segment, which uses
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
		>spread syntax</a
	>
	and matches any path under <code>/color</code>, no matter how deep. We refer to it as a spread
	segment. The following rule clarifies, which page the router chooses to render
	<code>/color/blue</code>:
</p>

<Card>
	<p><strong>Rule 6: Dynamic path segments take precedence over spread segments.</strong></p>
	<p>
		E.g., <code>src/routes/color/[color].svelte</code> takes precedence over
		<code>src/routes/color/[...rest].svelte</code>.
	</p>
</Card>

<p>
	You can navigate to route <code>/color/blue/dark</code> to see an example of a route that is
	rendered with
	<code>src/routes/color/[...rest].svelte</code>.
</p>

<h2>Error pages</h2>

<p>
	Last but not least, let's navigate to route <code>/blue/dark</code> in the example. This time,
	there are no candidate pages. What does the router do? It falls back to default error page
	<a
		href="https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/+error.svelte"
		><code>src/routes/+error.svelte</code></a
	>.
</p>

<p>
	Note that as soon as there is one candidate page, including pages with spread segments, the
	SvelteKit router does not fall back to an error page. This is what we observed for route
	<code>/color/blue/dark</code> in the previous section. It was rendered with
	<code>src/routes/color/[...rest].svelte</code> and not the default error page.
</p>

<p>
	SvelteKit allows you to configure error pages more granular per directory and you can read up on
	how this works in the
	<a href="https://kit.svelte.dev/docs/layouts#error-pages">SvelteKit docs</a>.
</p>
