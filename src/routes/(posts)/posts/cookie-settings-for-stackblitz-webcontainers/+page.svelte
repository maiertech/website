<script>
	import Image from '$lib/components/image.svelte';
</script>

<p>
	More and more websites use StackBlitz WebContainers to embed live-code examples. The new Svelte
	tutorial at <a href="https://learn.svelte.dev/">learn.svelte.dev</a> embeds StackBlitz
	WebContainers to run Svelte and SvelteKit examples in supported browsers. Think of a WebContainer
	as a small operating system that runs in a browser and can run Node.js version 16. Once you have
	Node.js running in your browser, it takes little effort to run entire Node-based stacks, e.g.,
	<a href="https://kit.svelte.dev/">SvelteKit</a>, natively in a browser.
</p>

<p>
	I experimented with embedded WebContainers in my post
	<a href="/posts/exploring-frequently-used-methods-of-d3-array"
		>Exploring frequently used methods of d3-array</a
	>. The first catch with WebContainers is that they are
	<a href="https://developer.stackblitz.com/platform/webcontainers/browser-support"
		>not yet supported in all browsers</a
	>. Currently, Chrome and Firefox support WebContainers, but Safari does not.
</p>

<p>
	The second catch is that embedded WebContainers need third-party cookies enabled to work. If your
	audience is technical, there is a high chance that they are also security-conscious and have
	third-party cookies disabled. When they see an embedded WebContainer in a browser, they see this
	warning:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/01028db20d4f100618142d9d4f104349a5bd8f225863157c/1/8/MjQy/MjQyLzM1Mg?dl=true"
		alt="Screenshot of an embedded StackBlitz WebContainer with warning message 'Enable third-party cookies'."
		ratio={1672 / 736}
		loading="lazy"
	/>
	<figcaption>
		A StackBlitz WebContainer rendered in a Chromium-based browser with third-party cookies
		disabled.
	</figcaption>
</figure>

<p>
	The problem with this warning is that you cannot fix it for your users. Every user has to fix it
	in their browser. Either by enabling third-party cookies for all sites or by always allowing
	cookies for these two sites:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/00be9d910b34770803d52fab34774f318badc952ab2cb1c2/1/8/MjQy/MjQyLzM1OA?dl=true"
		alt="Screenshot of the cookies settings in a Chromium-based browser. Section 'Sites that can always use cookies' lists [*.]stackblitz.io and [*.]webcontainer.io."
		ratio={1372 / 426}
		loading="lazy"
	/>
	<figcaption>
		To make embedding WebContainers work without allowing third-party cookies for all sites, you
		must always allow cookies for these two URL patterns.
	</figcaption>
</figure>

<p>
	For StackBlitz <a href="https://stackblitz.com/codeflow/beta">Codeflow Beta</a>, which I discussed
	in my post
	<a href="/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code"
		>Is StackBlitz Codeflow Beta ready to replace your local VSCode?</a
	>, you have to add <code>[*.]staticblitz.com</code> to the above list to make it work without
	enabling third-party cookies. Check out the
	<a href="https://developer.stackblitz.com/platform/webcontainers/browser-config"
		>StackBlitz documentation</a
	>
	for more details on configuring third-party cookies in different browsers.
</p>
