<script lang="ts">
	import { Code, CodeSnippet, Figure, H2, P } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<P>
	When I migrated this website from <a href="https://nextjs.org/">Next.js</a> to
	<a href="https://kit.svelte.dev/">SvelteKit</a>, I had to figure out how to set up
	<a href="https://usefathom.com/">Fathom Analytics</a>. Fathom Analytics is an alternative to
	Google Analytics. It offers a better user experience for website owners and is more
	privacy-friendly for visitors. This post expands on Matt Jennings's post
	<a href="https://mattjennings.io/blog/how-to-use-fathom-analytics-with-sveltekit">
		How to use Fathom Analytics with SvelteKit
	</a>.
</P>

<H2>Tracking page views and goals</H2>

<P>
	There are usually two things you want to track with web analytics: <em>page views</em> and
	<em>goals</em>. Tracking page views helps you see how visitors move through your website, how long
	they spend on each page, and which pages are more popular than others. Tracking goals helps you
	monitor specific actions you would like your visitors to take, e.g., subscribe to your newsletter or
	click through to your Twitter profile. Actions typically involve clicking a link or a button. When
	such a click happens, a visitor has done what you wanted them to do, and you can track that you
	have accomplished your goal for this visitor.
</P>

<P>
	Like any other analytics platform, Fathom requires a
	<a href="https://usefathom.com/docs/script/script">custom tracking script</a> to be included in
	your website. This is straightforward for multipage applications: a visitor loads a page, and the
	script runs and records the page view. For single-page applications (SPAs), you need to put in
	additional work to ensure that client-side route changes are also tracked. Fathom
	<a href="https://usefathom.com/docs/integrations">lists common integrations in their docs</a>,
	e.g., for Next.js or Gatsby, but not for SvelteKit.
</P>

<H2>Package fathom-client</H2>

<P>
	Package <a href="https://github.com/derrickreimer/fathom-client">fathom-client</a> gives you full
	control over triggering Fathom calls at various points in your SPA's page lifecycle. As Matt's
	post suggests, <Code>src/routes/+layout.svelte</Code>, the root layout component, is the place to
	initialize the tracking script:
</P>

<Figure caption="src/routes/+layout.svelte" class="mb-6">
	<CodeSnippet lang="svelte" src={data.examples['hard-wired-site-id']} />
</Figure>

<P>
	This code snippet uses Svelte's
	<a href="https://svelte.dev/docs#onMount"><Code>onMount</Code> callback</a> to load the tracking script
	as soon as the layout component has been mounted. Whenever that is the case, the tracking script records
	a page view.
</P>

<H2>Environment variables in SvelteKit</H2>

<P>
	Your Fathom site ID must be exposed to the client for tracking to work. There is no harm in
	hard-wiring this ID in your code, but it is better to move it into an environment variable as
	shown here:
</P>

<Figure caption="src/routes/+layout.svelte" class="mb-6">
	<CodeSnippet lang="svelte" src={data.examples['site-id-in-env-variables']} />
</Figure>

<P>
	The above code snippet uses the module
	<a href="https://kit.svelte.dev/docs/modules#$env-static-public">
		<Code>$env/static/public</Code>
	</a>
	to expose the variable <Code>PUBLIC_FATHOM_SITE_ID</Code> to the client. Note that the environment
	variable needs to be prefixed with <Code>PUBLIC_</Code> to be exposed to the client.
</P>

<H2>Dealing with ad-blockers</H2>

<P>
	The tracking script is served from Fathom's domain in the previous code snippets. Since this is a
	predictable URL, ad-blockers block the tracking script. Fathom used to offer a way
	<a href="https://usefathom.com/docs/script/custom-domains">
		to serve the tracking script from a custom domain
	</a> using a CNAME record. But in May 2023, they advised their customers to stop using custom domains:
</P>

<blockquote>
	<P>
		You're getting this email because you created a custom domain at some point using Fathom
		Analytics.
	</P>
	<P>
		We've had a few reports of custom domains not collecting data due to expired SSL certificates
		that our vendor isn't renewing automatically, which is unacceptable to us, and we take full
		responsibility for this.
	</P>
	<P>
		We've tried to fix this issue with our vendor but aren't getting anywhere, so you need to stop
		using your Fathom custom domains right now.
	</P>
</blockquote>

<P>
	The custom domain approach has always been a double-edged sword. On the one hand, as the website
	owner, you are interested in accurately tracking your visitors. On the other hand, by creating a
	CNAME record to serve a third-party tracking script, you delegate the reputation of your domain to
	that third party. If Fathom had gone rogue, they could have served a malicious tracking script
	from your domain, get access to secrets such as authentication cookies, and destroy trust in your
	domain. Fathom <a href="https://usefathom.com/blog/bypass-adblockers">
		has always been upfront about this potential issue
	</a>.
</P>

<H2>EU isolation</H2>

<P>
	When you use Fathom's default tracking script <Code>cdn.usefathom.com/script.js</Code>, any visits
	to your website from within the EU will be processed and anonymized within the EU. This is called
	<em>EU</em> isolation and
	<a href="https://usefathom.com/features/eu-isolation">
		works out of the box with zero configuration
	</a>.
</P>

<P>
	Fathom also offers <em>extreme EU isolation</em>, where all global traffic is routed through the
	EU. All you need to do is use <Code>cdn-eu.usefathom.com/script.js</Code> as tracking script instead
	of the default one.
</P>

<P>
	You can provide an options object to <Code>Fathom.load</Code> as the second argument. It has a property
	<Code>url</Code>, which defaults to Fathom's default tracking script. If you want extreme EU
	isolation, you need to set the
	<Code>url</Code> option to the alternative tracking script:
</P>

<Figure caption="src/routes/+layout.svelte" class="mb-6">
	<CodeSnippet lang="svelte" src={data.examples['extreme-eu-isolation']} />
</Figure>

<H2>Tracking client-side route changes</H2>

<P>
	The previous code snippets track initial page loads. But once a page has been loaded and the
	JavaScript fully hydrated, SvelteKit switches to client-side routing. Any client-side route
	changes would not be tracked. To fix this, let's add a reactive statement:
</P>

<Figure caption="src/routes/+layout.svelte" class="mb-6">
	<CodeSnippet lang="svelte" src={data.examples['tracking-client-side-route-changes']} />
</Figure>

<P>
	This great hack from Matt's post took me a while to understand. The last line is a reactive
	statement, but it is not the typical example where something is assigned to a variable. It uses
	JavaScript's
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator"
	>
		comma operator</a
	>, which evaluates comma-separated operands in sequence and returns the value of the last operand.
	<Code>$page.url.pathname</Code> is a reference to the current path in
	<a href="https://kit.svelte.dev/docs#modules-$app-stores">SvelteKit's page store</a>, and whenever
	this value changes, it triggers the reactive statement. The last operand fires a
	<Code>trackPageview</Code>, but only when SvelteKit runs in a browser.
</P>

<H2>Tracking goals</H2>

<P>
	Let's assume your goal is to make visitors click through to your Twitter profile. The following
	component can render social icons from an array of objects, which it receives as a prop:
</P>

<Figure caption="social-icons.svelte" class="mb-6">
	<CodeSnippet lang="svelte" src={data.examples['social-icons']} />
</Figure>

<P>
	Note the <Code>on:click</Code> directive to which an optional callback can be assigned. You can call
	<Code>Fathom.trackGoal</Code> with a goal tracking ID in this callback:
</P>

<Figure class="mb-6">
	<CodeSnippet lang="javascript" src={`() => { Fathom.trackGoal('UVWXYZ', 0) }`} />
</Figure>

<P>You have to generate the goal-tracking ID in your Fathom dashboard.</P>
