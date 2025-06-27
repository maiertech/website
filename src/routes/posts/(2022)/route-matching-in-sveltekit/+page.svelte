<script lang="ts">
	import { StackblitzEmbed } from '$lib/components';
	import { Code, Figure, H2, P, CodeSnippet, Ul } from '@maiertech/sveltekit-helpers';
</script>

<P>
	<strong>
		This post is outdated. It covers SvelteKit's router before SvelteKit v1.0.0-next.406.
	</strong>
</P>

<P>The <a href="https://kit.svelte.dev/docs#routing">SvelteKit docs</a> state that</P>

<blockquote>
	<P>
		<em
			>"At the heart of SvelteKit is a filesystem-based router. This means that the structure of
			your application is defined by the structure of your codebase — specifically, the contents of
			<Code>src/routes</Code>."
		</em>
	</P>
</blockquote>

<P>
	In this post, we will explore how SvelteKit's
	<a href="https://kit.svelte.dev/docs#routing">filesystem-based router</a> matches a requested
	route to a page or an endpoint. SvelteKit transforms each route file in <Code>src/routes</Code> into
	a page or an endpoint. Conversely, SvelteKit needs to match a requested route to a route file. This
	is called route matching.
</P>

<P>
	A filesystem-based router makes route matching straightforward: the route can be interpreted as
	the subpath in <Code>src/routes</Code>, and often there is only one matching route file. But what happens
	when there are multiple matching route files? How does SvelteKit decide which route file it uses to
	render a page or endpoint?
</P>

<P>
	In this post, we look at a SvelteKit example and explore the rules that SvelteKit applies to
	decide which page or endpoint to serve. You will get the most out of this post if you follow
	along:
</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project="maiertech/sveltekit-example-route-matching"
		options={{ openFile: 'src/routes/index.svelte' }}
	/>
</Figure>

<H2>Duplicate route files are not permitted</H2>

<P>
	When you have the example up and running, click route <Code>/green</Code> in the preview. SvelteKit
	matches this request to the page <Code>src/routes/green.svelte</Code>. This is the filesystem-based
	router at work, which takes the route and looks for the corresponding route file in
	<Code>src/routes</Code>.
</P>

<P>
	Now click route <Code>/red</Code>. This time SvelteKit matches the request to the page
	<Code>src/routes/red/index.svelte</Code>, which is equivalent to
	<Code>src/routes/red.svelte</Code>.
</P>

<P>
	Create the file <Code>src/routes/red.svelte</Code> in the example and copy the content of the file
	<Code>src/routes/red/index.svelte</Code>. You should see this error message in the terminal:
</P>

<Figure class="mb-6">
	<CodeSnippet lang="bash" src="$ svelte-kit dev > Duplicate route files: src/routes/red" />
</Figure>

<P>
	<em
		><strong>Rule 1: Duplicate route files are not permitted.</strong> You cannot have both
		<Code>src/routes/red/index.svelte</Code>
		and
		<Code>src/routes/red.svelte</Code>. SvelteKit will not let you.
	</em>
</P>

<P>Delete <Code>src/routes/red.svelte</Code> and run</P>

<Figure class="mb-6">
	<CodeSnippet lang="bash" src="npm run dev" />
</Figure>

<P>to restart the development server.</P>

<H2>Matching against path segments</H2>

<P>
	The SvelteKit router matches strings of route segments to path segments. Path segments inside
	<Code>src/routes</Code> can be static (<Code>.../static/...</Code>) or dynamic (
	<Code>.../[dynamic]/...</Code>) with square brackets. Dynamic path segments match any string.
	Static path segments require an exact match. The second rule describes the order in which
	SvelteKit matches route segments to path segments:
</P>

<P>
	<em><strong>Rule 2: SvelteKit matches route segments to path segments left to right.</strong></em>
</P>

<P>
	Let's revisit the <Code>/red</Code> route from before. Now that we know what dynamic path segments
	are, we realize that there were three more candidate pages:
</P>

<Ul>
	<li><Code>src/routes/[color].svelte</Code></li>
	<li><Code>src/routes/[nocolor].svelte</Code></li>
	<li><Code>src/routes/[colour]/index.svelte</Code></li>
</Ul>

<P>
	These are not duplicate routes because the strings inside <Code>[]</Code> differ. We already know from
	the previous section that <Code>/red</Code> is not rendered with any of the above candidate pages.
	The reason is this rule:
</P>

<P>
	<em>
		<strong>Rule 3: Static path segments take precedence over dynamic path segments.</strong>
		E.g., <Code>src/routes/green.svelte</Code> (static) takes precedence over
		<Code>src/routes/[color].svelte</Code> (dynamic).
	</em>
</P>

<H2>Alphabetical order of path segments</H2>

<P>Let's look at the route <Code>/blue</Code> in the example. The candidate pages are:</P>

<Ul>
	<li><Code>src/routes/[color].svelte</Code></li>
	<li><Code>src/routes/[nocolor].svelte</Code></li>
	<li><Code>src/routes/[colour]/index.svelte</Code></li>
</Ul>

<P>
	We need another rule to choose the page that is used to render
	<Code>/blue</Code>:
</P>

<P>
	<em>
		<strong>Rule 4: Index pages take precedence over non-index pages.</strong>
		This is only relevant for pages that are not considered duplicate routes, e.g.,
		<Code>src/routes/[colour]/index.svelte</Code> takes precedence over
		<Code>src/routes/[color].svelte</Code>.
	</em>
</P>

<P>
	When matching the route segment <Code>blue</Code>, we can use this rule to eliminate the first two
	candidate pages. This results in the page <Code>src/routes/[colour]/index.svelte</Code> being rendered.
	You can confirm this by clicking on <Code>/blue</Code> in the example.
</P>

<P>
	Let's delete the page <Code>src/routes/[colour]/index.svelte</Code> in the example. To make the workspace
	pick up this change, you need to click in the terminal and hit <Code>⌃C</Code>. Restart the
	development server with <Code>npm run dev</Code>.
</P>

<P>Now the two candidates for the route <Code>/blue</Code> are:</P>

<Ul>
	<li><Code>src/routes/[color].svelte</Code></li>
	<li><Code>src/routes/[nocolor].svelte</Code></li>
</Ul>

<P>
	A look at the rendered page reveals that the router used
	<Code>src/routes/[color].svelte</Code>. It did so because of this rule:
</P>

<P>
	<em>
		<strong>
			Rule 5: For two path segments of the same type, the first one in alphabetical order takes
			precedence.
		</strong>
		E.g., <Code>src/routes/[color].svelte</Code> takes precedence over
		<Code>src/routes/[nocolor].svelte</Code> because
		<Code>color</Code> comes before <Code>nocolor</Code> in alphabetical order.
	</em>
</P>

<H2>Matching with spread syntax</H2>

<P>Let's look at the route <Code>/color/blue</Code> in the example. The candidate pages are:</P>

<Ul>
	<li><Code>src/routes/color/[color].svelte</Code></li>
	<li><Code>src/routes/color/[...rest].svelte</Code></li>
</Ul>

<P>
	<Code>[...rest]</Code> in the second route is a dynamic path segment, which uses
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
	>
		spread syntax
	</a>
	and matches any path under <Code>/color</Code>, no matter how deep. We refer to it as a spread
	segment. The following rule clarifies which page the router chooses to render
	<Code>/color/blue</Code>:
</P>

<P>
	<em>
		<strong>Rule 6: Dynamic path segments take precedence over spread segments.</strong>
		E.g., <Code>src/routes/color/[color].svelte</Code> takes precedence over
		<Code>src/routes/color/[...rest].svelte</Code>.
	</em>
</P>

<P>
	You can navigate to the route <Code>/color/blue/dark</Code> to see an example of a route that is rendered
	with
	<Code>src/routes/color/[...rest].svelte</Code>.
</P>

<H2>Error pages</H2>

<P>
	Last but not least, let's navigate to the route <Code>/blue/dark</Code> in the example. This time, there
	are no candidate pages. What does the router do? It falls back to the default error page
	<a
		href="https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/+error.svelte"
	>
		<Code>src/routes/+error.svelte</Code>
	</a>.
</P>

<P>
	Note that as soon as there is one candidate page, including pages with spread segments, the
	SvelteKit router does not fall back to an error page. This is what we observed for the route
	<Code>/color/blue/dark</Code> in the previous section. It was rendered with
	<Code>src/routes/color/[...rest].svelte</Code> and not the default error page.
</P>

<P>
	SvelteKit allows you to configure error pages more granularly per directory, and you can read up on
	how this works in the
	<a href="https://kit.svelte.dev/docs/layouts#error-pages">SvelteKit docs</a>.
</P>
