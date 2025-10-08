<script lang="ts">
	import { StackblitzEmbed } from '$lib/components';
	import { CodeSnippet, Figure, H2, P } from '@maiertech/sveltekit-helpers';
	import srcCsbNewSandboxDialog from './csb-new-sandbox-dialog.png?enhanced';
	import srcCsbSvelteTemplate from './csb-svelte-template.png?enhanced';
	import srcStackblitzDashboard from './stackblitz-dashboard.png?enhanced';
	import srcSvelteRepl from './svelte-repl.png?enhanced';
	import srcSvelteTemplate from './svelte-template.png?enhanced';
</script>

<P>
	The <a href="https://github.com/sveltejs/template">Svelte template</a> was long the official way to
	bootstrap a Svelte project, but it is no longer maintained and has been deprecated. What should you
	choose instead to bootstrap a Svelte project?
</P>

<P>
	With <a href="https://kit.svelte.dev/">SvelteKit</a> now stable at version 1.0, it is the obvious choice
	to bootstrap a Svelte project. There is nothing wrong with this approach. SvelteKit shines when you
	need advanced features, e.g., a filesystem-based router, progressive enhancement, fast initial page
	load, or SEO. For smaller projects, such as data visualization or a quick experiment, SvelteKit comes
	with unnecessary overhead when all you need is Svelte.
</P>

<P>Let's look at three ways to bootstrap a Svelte project.</P>

<H2>Svelte REPL</H2>

<P>
	If you have dipped your toes into Svelte already, you are probably familiar with the
	<a href="https://svelte.dev/repl">Svelte REPL</a>. The REPL is the most popular way to share code
	examples within the Svelte community. It runs client-side, does not need a local setup, and you
	can start coding instantly.
</P>

<P>
	An often-overlooked feature of the Svelte REPL is the download button. You can download the source
	code of every example:
</P>

<Figure
	caption="Click the download button in the Svelte REPL to download the source code of an example."
	class="mb-6"
>
	<enhanced:img
		src={srcSvelteRepl}
		alt="Screenshot of a project running in the Svelte REPL. A blue arrow points at the download button."
	/>
</Figure>

<P>
	You can start your Svelte experiments with the Svelte REPL. Once you decide that you want to
	continue your experiment on GitHub, download its source code and run it in your local VS Code:
</P>

<Figure
	caption="Code examples in the Svelte REPL use the legacy Svelte template, which uses Rollup as a bundler."
	class="mb-6"
>
	<enhanced:img
		src={srcSvelteTemplate}
		alt="Screenshot of VS Code with the code downloaded from the Svelte REPL. File package.json is open, and you can see the dependencies of the deprecated Svelte template."
	/>
</Figure>

<P>
	The Svelte REPL would be the perfect way to start a new Svelte project, except that every project
	you create is based on the deprecated Rollup-based Svelte template. The Svelte team is working on
	a new REPL, which will run on
	<a href="https://blog.stackblitz.com/posts/introducing-webcontainers/">
		StackBlitz's WebContainers
	</a>. You can find out more in Rich Harris's talk
	<a href="https://www.youtube.com/watch?v=RwBolXX9Pis">
		Full Stack Documentation at JSNation 2022
	</a>. The current Svelte REPL is still great for experiments, but do not bootstrap a Svelte
	project with it.
</P>

<H2>CodeSandbox</H2>

<P>
	The <a href="https://codesandbox.io/">CodeSandbox</a> team has created a bundler that can bundle and
	run different JavaScript frameworks in-browser. The bundled code runs client-side without relying on
	a back-end server. CodeSandbox provides several sandbox templates, including one for Svelte:
</P>

<Figure caption="CodeSandbox has a sandbox template for Svelte." class="mb-6">
	<enhanced:img
		src={srcCsbNewSandboxDialog}
		alt="Screenshot of the CodeSandbox dialog to select a template for a new sandbox. The Svelte template is highlighted."
	/>
</Figure>

<P>
	Unfortunately, CodeSandbox's Svelte template is a variation of the deprecated Rollup-based Svelte
	template:
</P>

<Figure
	caption="CodeSandbox's Svelte template is a variation of the deprecated Svelte template."
	class="mb-6"
>
	<enhanced:img
		src={srcCsbSvelteTemplate}
		alt="Screenshot of CodeSandbox's Svelte template running in-browser. File package.json is open, and you can see the dependencies of the deprecated Svelte template."
	/>
</Figure>

<P>
	Thanks to semantic versioning, you still get the latest version of Svelte, but you get a legacy
	project structure. CodeSandbox's Svelte template is also great for experiments, but do not
	bootstrap a Svelte project with it.
</P>

<H2>StackBlitz</H2>

<P>
	The team at <a href="https://stackblitz.com/">StackBlitz</a> managed to get
	<a href="https://nodejs.org/en/">Node.js</a> running in-browser, which is a big deal because they
	can run anything in-browser that runs with Node.js (without relying on a back-end server),
	including
	<a href="https://vitejs.dev/">Vite</a>. Therefore, StackBlitz supports the official Vite Svelte
	templates,
	<a href="https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte">
		with vanilla JavaScript
	</a>
	or
	<a href="https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte-ts">
		with TypeScript
	</a>:
</P>

<Figure caption="StackBlitz supports the official Vite Svelte templates." class="mb-6">
	<enhanced:img
		src={srcStackblitzDashboard}
		alt="Screenshot of StackBlitz's dashboard. The two Svelte templates, one for vanilla JavaScript and one for TypeScript, are highlighted."
	/>
</Figure>

<P>
	The StackBlitz team has created shortcuts for two Vite Svelte templates. Clicking on
	<a href="https://vite.new/svelte">https://vite.new/svelte</a> bootstraps the Vite Svelte template with
	vanilla JavaScript and is equivalent to running
</P>

<Figure class="mb-6">
	<CodeSnippet lang="bash" src="npm create vite@latest my-svelte-app -- --template svelte" />
</Figure>

<P>
	in a terminal. Here you can try out the Vite Svelte vanilla JavaScript template directly in your
	browser:
</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project="vitejs/vite/tree/main/packages/create-vite/template-svelte"
		options={{ openFile: 'src/App.svelte' }}
	/>
</Figure>

<P>
	Clicking <a href="https://vite.new/svelte-ts">https://vite.new/svelte-ts</a> bootstraps the Vite Svelte
	template with TypeScript and is equivalent to running
</P>

<Figure class="mb-6">
	<CodeSnippet lang="bash" src="npm create vite@latest my-svelte-ts-app -- --template svelte-ts" />
</Figure>

<P>
	in your terminal. Here you can try the Vite Svelte TypeScript template directly in your browser:
</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project="vitejs/vite/tree/main/packages/create-vite/template-svelte-ts"
		options={{ openFile: 'src/App.svelte' }}
	/>
</Figure>

<P>
	It does not get easier than clicking one of the two shortcuts to bootstrap a Svelte project. When
	you are ready, you can connect to GitHub, push your Svelte project to GitHub, and continue in your
	favorite IDE.
</P>

<H2>Conclusion</H2>

<P>
	The Svelte REPL and CodeSandbox make it easy to bootstrap a new Svelte project, but they use the
	deprecated Svelte template. With StackBlitz, on the other hand, you can run the official Vite
	Svelte templates natively in-browser, and StackBlitz's URL shortcuts make bootstrapping a Svelte
	project a one-click effort.
</P>
