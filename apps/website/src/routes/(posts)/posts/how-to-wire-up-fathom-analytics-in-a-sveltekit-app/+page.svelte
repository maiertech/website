<script>
	import Highlight, { HighlightSvelte } from 'svelte-highlight';
	import { javascript } from 'svelte-highlight/languages';

	export let data;
	const { examples } = data;
</script>

<p>
	When I migrated this website from <a href="https://nextjs.org/">Next.js</a> to
	<a href="https://kit.svelte.dev/">SvelteKit</a>, I had to figure out how to wire up
	<a href="https://usefathom.com/">Fathom Analytics</a>. Fathom Analytics is an alternative to
	Google Analytics. It features a better user experience for website owners and is more
	privacy-friendly for visitors. This post expands on Matt Jennings's post
	<a href="https://mattjennings.io/blog/how-to-use-fathom-analytics-with-sveltekit"
		>How to use Fathom Analytics with SvelteKit</a
	>.
</p>

<h2>Tracking pageviews and goals</h2>

<p>
	There are usually two things you want to track with web analytics: <em>pageviews</em> and
	<em>goals</em>. Tracking pageviews helps you understand how visitors navigate through your
	website, how long they spend on each page, and which pages are more popular than others. Tracking
	goals helps you track specific actions you would like your visitors to do, e.g., subscribe to your
	newsletter or click through to your Twitter profile. Actions typically involve clicking a link or
	a button. When such a click happens, a visitor has done what you wanted them to do, and you can
	track that you have accomplished your goal for this visitor.
</p>

<p>
	Like with any other analytics tool, Fathom requires a
	<a href="https://usefathom.com/docs/script/script">custom tracking script</a> to be included in
	your website. This is straightforward for multi-page applications: a visitor loads a page, and the
	script runs and records the pageview. For single-page applications (SPAs), you need to put in
	additional work to ensure that client-side route changes are also tracked. Fathom
	<a href="https://usefathom.com/docs/integrations">lists common integrations in their docs</a>,
	e.g., for Next.js or Gatsby, but not for SvelteKit.
</p>

<h2>Package fathom-client</h2>

<p>
	Package <a href="https://github.com/derrickreimer/fathom-client">fathom-client</a> gives you full
	control over triggering Fathom calls at various points in your SPA's page lifecycle. As Matt's
	post suggests, <code>src/routes/+layout.svelte</code>, the root layout component, is the place to
	initialize the tracking script:
</p>

<figure>
	<HighlightSvelte code={examples['hard-wired-site-id']} />
	<figcaption>src/routes/+layout.svelte</figcaption>
</figure>

<p>
	This code snippet uses Svelte's
	<a href="https://svelte.dev/docs#onMount"><code>onMount</code> callback</a> to load the tracking script
	as soon as the layout component has been mounted. Whenever that is the case, the tracking script records
	a pageview.
</p>

<h2>Environment variables in SvelteKit</h2>

<p>
	Your Fathom site ID must be exposed to the client for tracking to work. There is no harm in
	hard-wiring this ID in your code, but it is better to move it into an environment variable as
	shown here:
</p>

<figure>
	<HighlightSvelte code={examples['site-id-in-env-variables']} />
	<figcaption>src/routes/+layout.svelte</figcaption>
</figure>

<p>
	The above code snippet uses the module
	<a href="https://kit.svelte.dev/docs/modules#$env-static-public"
		><code>$env/static/public</code></a
	>
	to expose variable <code>PUBLIC_FATHOM_SITE_ID</code> to the client. Note that the environment
	variable needs to be prefixed with <code>PUBLIC_</code> to be exposed to the client.
</p>

<h2>Serving the tracking script from a custom domain</h2>

<p>
	The tracking script is served from Fathom's domain in the previous code snippets. This means that
	ad-blockers will block the tracking script sooner than later. Fathom offers a way to serve the
	tracking script from a custom domain using a CNAME record. Serving the tracking script from the
	same domain as the tracked website increases the chances that ad-blockers or other browser
	security mechanisms do not block the tracking script. I will not go into the details of how this
	is done because you can read up on it
	<a href="https://usefathom.com/docs/script/custom-domains">here in the Fathom docs</a>.
</p>

<p>
	This approach is a double-edged sword. On the one hand, as the website owner, you are interested
	in accurately tracking your visitors to improve your site and serve them better. On the other
	hand, by creating that CNAME record, you delegate the reputation of your domain to a third party.
	If Fathom went rogue, they could serve a malicious tracking script from your domain, get access to
	secrets such as authentication cookies, and destroy trust in your domain. Fathom is upfront about
	this potential issue. They make a strong case for why you should trust them in
	<a href="https://usefathom.com/blog/bypass-adblockers">this post</a>.
</p>

<p>
	You can provide an options object to <code>Fathom.load</code> as the second argument. It has a
	property
	<coce>url</coce>, which defaults to Fathom's tracking script
	<a href="https://cdn.usefathom.com/script.js">https://cdn.usefathom.com/script.js</a>. If you
	choose to serve your tracking script from a custom domain, you need to set the
	<code>url</code> option to the custom tracking script URL provided by Fathom in your dashboard:
</p>

<figure>
	<HighlightSvelte code={examples['custom-domain']} />
	<figcaption>src/routes/+layout.svelte</figcaption>
</figure>

<h2>Tracking client-side route changes</h2>

<p>
	The previous code snippets track initial page loads. But once a page has been loaded and the
	JavaScript fully hydrated, SvelteKit switches to client-side routing. Any client-side route
	changes would not be tracked. To fix this, let's add a reactive statement:
</p>

<figure>
	<HighlightSvelte code={examples['tracking-client-side-route-changes']} />
	<figcaption>src/routes/+layout.svelte</figcaption>
</figure>

<p>
	This great hack from Matt's post took me a while to understand. The last line is a reactive
	statement, but it is not the typical example where something is assigned to a variable. It uses
	JavaScript's
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator"
		>comma operator</a
	>, which evaluates comma-separated operands in sequence and returns the value of the last operand.
	<code>$page.url.pathname</code> is a reference to the current path in
	<a href="https://kit.svelte.dev/docs#modules-$app-stores">SvelteKit's page store</a>, and whenever
	this value changes, it triggers the reactive statement. The last operand fires a
	<code>trackPageview</code>, but only when SvelteKit runs in a browser.
</p>

<h2>Tracking goals</h2>

<p>
	Let's assume your goal is to make visitors click through to your Twitter profile. The following
	component can render social icons from an array of objects, which it receives as a prop:
</p>

<figure>
	<HighlightSvelte code={examples['social-icons']} />
	<figcaption>social-icons.svelte</figcaption>
</figure>

<p>
	Note the <code>on:click</code> directive to which an optional callback can be assigned. You can
	call <code>Fathom.trackGoal</code> with a goal tracking ID in this callback:
</p>

<figure>
	<Highlight
		language={javascript}
		code={`() => {
  Fathom.trackGoal('UVWXYZ', 0);
}`}
	/>
</figure>

<p>You have to generate the goal-tracking ID in your Fathom dashbaord.</p>
