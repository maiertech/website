<script lang="ts">
	import { Code, CodeSnippet, Figure, H2, P, Ul } from '@maiertech/sveltekit-helpers';
</script>

<P>
	<strong>This post is outdated. HMR has worked fine with Gitpod since SvelteKit v1.0.</strong>
</P>

<P>
	SvelteKit uses <a href="https://vitejs.dev/">Vite</a> with
	<a href="https://github.com/sveltejs/vite-plugin-svelte">vite-plugin-svelte</a> to implement hot module
	replacement (HMR). HMR ensures that changes in your code are reflected instantly in your browser preview.
	This results in a pleasant developer experience. HMR in SvelteKit works out of the box with no configuration
	required.
</P>

<H2>Why HMR on Gitpod is different</H2>

<P>
	Things change when you develop with a cloud workspace such as
	<a href="https://www.gitpod.io">Gitpod</a>. If you are not familiar with cloud workspaces, check
	out my post
	<a href="/posts/a-better-development-workflow-with-disposable-workspaces">
		A better development workflow with disposable workspaces
	</a>. In a Gitpod workspace, the SvelteKit development server runs on port 5173, just like in your
	local development environment. How you access the development server depends on how you access
	your Gitpod workspace:
</P>

<Ul>
	<li>
		When you access a Gitpod workspace <strong>from within a browser</strong>, you can access the
		development server with an external URL on the gitpod.io domain. To make this work, Gitpod
		proxies 127.0.0.1 to the external URL.
	</li>
	<li>
		When you access your Gitpod workspace <strong>from VS Code via SSH</strong>, VS Code proxies the
		development server to 127.0.0.1. You work with your Gitpod workspace as if it were a local
		development environment.
	</li>
</Ul>

<P>
	While developing a SvelteKit app with Gitpod inside a browser, I noticed that HMR was broken. It
	would trigger indefinite page reloads after starting the SvelteKit development server, as
	described in
	<a href="https://github.com/sveltejs/kit/issues/2519">this GitHub issue</a>. The
	<a href="https://github.com/sveltejs/kit/issues/2519#issuecomment-947485636">
		last issue comment
	</a> points to the solution. You can customize the Vite configuration and override its default HMR
	behavior.
</P>

<P>
	The <a href="https://vitejs.dev/config/#server-hmr">Vite docs</a> explain that
</P>

<blockquote>
	<P>
		<em>
			<Code>clientPort</Code> is an advanced option that overrides the port only on the client side,
			allowing you to serve the websocket on a different port than the client code looks for it on. This
			is useful if you're using an SSL proxy in front of your dev server.
		</em>
	</P>
</blockquote>

<P>
	Vite brokers between the external URL and the development server running in your Gitpod workspace.
</P>

<H2>Gitpod workspace URLs</H2>

<P>
	A Gitpod workspace is available at a unique URL (which requires authentication) with the following
	format:
</P>

<Figure class="mb-6">
	<CodeSnippet lang="text" src="<uuid>.<region>.gitpod.io" />
</Figure>

<P>
	Every Gitpod workspace sets
	<a href="https://www.gitpod.io/docs/environment-variables#default-environment-variables">
		<Code>GITPOD_WORKSPACE_URL</Code>
	</a>, which contains the unique workspace URL.
</P>

<P>
	By default, a development server is not accessible externally. You need to tell the workspace
	which internal port it should expose. If, for example, your development server runs at
	127.0.0.1:5173, you need to add the following configuration to your <Code>.gitpod.yml</Code>:
</P>

<Figure caption=".gitpod.yml" class="mb-6">
	<CodeSnippet
		lang="yaml"
		src={`ports:
    # Expose port 5173.
  - port: 5173

tasks:
    # Install dependencies.
  - init: npm install
    # Run SvelteKit dev server (which uses port 5173).
    command: npm run dev`}
	/>
</Figure>

<P>
	<Code>tasks</Code> defines tasks that Gitpod runs when it initializes the workspace. This configuration
	makes the development server available at this URL:
</P>

<Figure class="mb-6">
	<CodeSnippet lang="text" src="<port>-<workspace-id>.<region>.gitpod.io" />
</Figure>

<P>For example, I wrote this post on a Gitpod workspace running at</P>

<Figure class="mb-6">
	<CodeSnippet lang="text" src="https://maiertech-maiertech-ti2zaqimh33.ws-us34.gitpod.io/" />
</Figure>

<P>
	The workspace ID <Code>maiertech-maiertech-ti2zaqimh33</Code> consists of my GitHub username
	<Code>maiertech</Code>, an ID derived from the repository name <Code>maier.tech</Code>, and a
	UUID. With the above <Code>.gitpod.yml</Code> configuration, the SvelteKit development server of this
	workspace can be reached at
</P>

<Figure class="mb-6">
	<CodeSnippet lang="text" src="https://5173-maiertech-maiertech-ti2zaqimh33.ws-us34.gitpod.io/" />
</Figure>

<P>You can access the development server only when authenticated to Gitpod.</P>

<H2>Overriding HMR in vite.config.js</H2>

<P>Next, we override the HMR configuration in <Code>vite.config.js</Code>:</P>

<Figure caption="vite.config.js" class="mb-6">
	<CodeSnippet
		lang="javascript"
		src={`// ...
server: {
  hmr: {
    clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 5173,
    host: process.env.GITPOD_WORKSPACE_URL
      ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '5173-')
      : '127.0.0.1',
  },
},
// ...`}
	/>
</Figure>

<P>
	We set <Code>clientPort</Code> and <Code>host</Code> depending on whether
	<Code>GITPOD_WORKSPACE_URL</Code> exists. This ensures that HMR works when running your Gitpod workspace
	inside a browser, but also for anyone running the SvelteKit site in a local development environment.
</P>

<P>
	There is a catch with this Vite configuration. <Code>GITPOD_WORKSPACE_URL</Code> also exists in a Gitpod
	workspace, which runs in a local VS Code via SSH. In this scenario, you can access the development
	server on 127.0.0.1:5173. But the above Vite configuration expects it to be on a gitpod.io URL.
</P>

<P>
	Thus, you should add the custom Vite configuration only if you plan to access Gitpod workspaces
	from within a browser. If you access Gitpod workspaces from within a local VS Code, you do not
	need the custom HMR configuration.
</P>

<H2>Browser extensions that interfere with HMR</H2>

<P>
	One final word of caution. Even with the custom Vite configuration in place, HMR would still break
	for me. I narrowed this issue down to my browser extension
	<a href="https://ublockorigin.com/">uBlock Origin</a> being the culprit. Any other ad blocker extension
	might interfere, too. So, I added gitpod.io to trusted sites in uBlock Origin.
</P>

<H2>Credits</H2>

<P>
	Thanks to <a href="https://twitter.com/mikenikles">Mike Nikles</a> from Gitpod for pointing me in
	the right direction when I ran into HMR issues with SvelteKit on Gitpod. Gitpod's website
	<a href="https://gitpod.io/">https://gitpod.io/</a>
	is written in SvelteKit and <a href="https://github.com/gitpod-io/website">open source</a>. You
	can learn a lot from this repository.
</P>
