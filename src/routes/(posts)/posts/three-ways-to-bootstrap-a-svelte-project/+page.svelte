<script>
	import Image from '$lib/components/image.svelte';
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import Highlight from 'svelte-highlight';
	import { bash } from 'svelte-highlight/languages';
	import csb_new_sandbox_dialog_origin_image from './csb-new-sandbox-dialog.png';
	import csb_svelte_template_origin_image from './csb-svelte-template.png';
	import stackblitz_dashboard_origin_image from './stackblitz-dashboard.png';
	import svelte_repl_origin_image from './svelte-repl.png';
	import svelte_template_origin_image from './svelte-template.png';
</script>

<p>
	The <a href="https://github.com/sveltejs/template">Svelte template</a> has long been the official way
	to bootstrap a Svelte project, and it is no longer maintained and is deprecated. What should you choose
	instead to bootstrap a Svelte project?
</p>

<p>
	With <a href="https://kit.svelte.dev/">SvelteKit</a> now stable at version 1.0, it is the obvious choice
	to bootstrap a Svelte project. And there is nothing wrong with this approach. SvelteKit shines when
	you need advanced features, e.g., a filesystem-based router, progressive enhancement, fast initial
	page load, or SEO. For smaller projects, such as data visualization or a quick experiment, SvelteKit
	comes with unnecessary overhead when all you need is Svelte.
</p>

<p>Let's look at three ways to bootstrap a Svelte project.</p>

<h2>Svelte REPL</h2>

<p>
	If you have dipped your toes into Svelte already, you are probably familiar with the
	<a href="https://svelte.dev/repl">Svelte REPL</a>. The REPL is the most popular way to share code
	examples within the Svelte community. It runs client-side, does not need a local setup, and you
	can start coding instantly.
</p>

<p>
	An often overlooked feature of the Svelte REPL is the download button. You can download the source
	code of every example:
</p>

<figure>
	<Image
		src={svelte_repl_origin_image}
		alt="Screenshot of a project running in the Svelte REPL. A blue arrow points at the download button."
		width={2522}
		height={1419}
	/>
	<figcaption>
		Click the download button in the Svelte REPL to download the source code of an example.
	</figcaption>
</figure>

<p>
	You can start your Svelte experiments with the Svelte REPL. And once you decide that you want to
	continue your experiment on GitHub, download its source code and run it in your local VS Code:
</p>

<figure>
	<Image
		src={svelte_template_origin_image}
		alt="Screenshot of VS Code with the code downloaded from the from the Svelte REPL. File package.json is open, and you can see the dependencies of the deprecated Svelte template."
		width={1516}
		height={1030}
	/>
	<figcaption>
		Code examples in the Svelte REPL use the legacy Svelte template, which uses
		<a href="https://rollupjs.org/guide/en/">Rollup</a> as a bundler.
	</figcaption>
</figure>

<p>
	The Svelte REPL would be the perfect way to start a new Svelte project, except that every project
	you create is based on the deprecated Rollup-based Svelte template. The Svelte team is working on
	a new REPL, which will run on
	<a href="https://blog.stackblitz.com/posts/introducing-webcontainers/"
		>StackBlitz's WebContainers</a
	>. You can find out more in Rich Harris's talk
	<a href="https://www.youtube.com/watch?v=RwBolXX9Pis">Full Stack Documentation at JSNation 2022</a
	>. The current Svelte REPL is still great for experiments, but do not bootstrap a Svelte project
	with it.
</p>

<h2>CodeSandbox</h2>

<p>
	The <a href="https://codesandbox.io/">CodeSandbox</a> team has created a bundler that can bundle and
	run different JavaScript frameworks in-browser. The bundled code runs client-side without relying on
	a back-end server. CodeSandbox provides several sandbox templates, including one for Svelte:
</p>

<figure>
	<Image
		src={csb_new_sandbox_dialog_origin_image}
		alt="Screenshot of the CodeSandbox dialog to select a template for a new sandbox. The Svelte template is highlighted."
		width={1866}
		height={870}
	/>
	<figcaption>CodeSandbox has a sandbox template for Svelte.</figcaption>
</figure>

<p>
	Unfortunately, CodeSandbox's Svelte template is a variation of the deprecated Rollup-based Svelte
	template:
</p>

<figure>
	<Image
		src={csb_svelte_template_origin_image}
		alt="Screenshot of CodeSandbox's Svelte template running in-browser. File package.json is open, and you can see the dependencies of the deprecated Svelte template."
		width={2548}
		height={1432}
	/>
	<figcaption>
		CodeSandbox's Svelte template is a variation of the deprecated Svelte template.
	</figcaption>
</figure>

<p>
	Thanks to semantic versioning, you still get the latest version of Svelte, but you get a legacy
	project structure. CodeSandbox's Svelte template is also great for experiments, but do not
	bootstrap a Svelte project with it.
</p>

<h2>StackBlitz</h2>

<p>
	The team at <a href="https://stackblitz.com/">StackBlitz</a> managed to get
	<a href="https://nodejs.org/en/">Node.js</a> running in-browser, which is a big deal because they
	can run anything in-browser that runs with Node.js (without relying on a back-end server),
	including
	<a href="https://vitejs.dev/">Vite</a>. Therefore, StackBlitz supports the official Vite Svelte
	templates,
	<a href="https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte"
		>with vanilla JavaScript</a
	>
	or
	<a href="https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte-ts"
		>with TypeScript</a
	>:
</p>

<figure>
	<Image
		src={stackblitz_dashboard_origin_image}
		alt="Screenshot of StackBlitz's dashboard. The two Svelte templates, one for vanilla JavaScript and one for TypeScript, are highlighted."
		width={1288}
		height={724}
	/>
	<figcaption>StackBlitz supports the official Vite Svelte templates.</figcaption>
</figure>

<p>
	The StackBlitz team has created shortcuts for two Vite Svelte templates. Clicking on
	<a href="https://vite.new/svelte">https://vite.new/svelte</a> bootstraps the Vite Svelte template with
	vanilla JavaScript and is equal to running
</p>

<figure>
	<Highlight language={bash} code={`npm create vite@latest my-svelte-app -- --template svelte`} />
</figure>

<p>
	in a terminal. Here you can try out the Vite Svelte vanilla JavaScript template directly in your
	browser:
</p>

<StackBlitzEmbed
	project="vitejs/vite/tree/main/packages/create-vite/template-svelte"
	options={{ openFile: 'src/App.svelte' }}
/>

<p>
	Clicking <a href="https://vite.new/svelte-ts">https://vite.new/svelte-ts</a> bootstraps the Vite Svelte
	template with TypeScript and is equal to running
</p>

<figure>
	<Highlight
		language={bash}
		code={`npm create vite@latest my-svelte-ts-app -- --template svelte-ts`}
	/>
</figure>

<p>
	in your terminal. Here you can try the Vite Svelte TypeScript template directly in your browser:
</p>

<StackBlitzEmbed
	project="vitejs/vite/tree/main/packages/create-vite/template-svelte-ts"
	options={{ openFile: 'src/App.svelte' }}
/>

<p>
	It does not get easier than clicking one of the two shortcuts to bootstrap a Svelte project. When
	you are ready, you can connect to GitHub, push your Svelte project to GitHub, and continue in your
	favorite IDE.
</p>

<h2>Conclusion</h2>

<p>
	The Svelte REPL and the CodeSandbox easily bootstrap a new Svelte project. But they use the
	deprecated Svelte template. With StackBlitz, on the other hand, you can run the official Vite
	Svelte templates natively in-browser, and Stackblitz's URL shortcuts make bootstrapping a Svelte
	project a one-click effort.
</p>
