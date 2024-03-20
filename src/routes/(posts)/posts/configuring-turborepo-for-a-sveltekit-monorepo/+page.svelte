<script>
	import Image from '$lib/components/image.svelte';
	import Highlight from 'svelte-highlight';
	import { bash, json } from 'svelte-highlight/languages';
	import vercel_build_error_origin_image from './vercel-build-error.png';

	export let data;
</script>

<p>
	Recently, I converted the repository for my website to a
	<a href="https://turbo.build/repo">Turborepo</a>. Turborepo is a task dependency management layer
	on top of a package manager, and it works for normal repositories and monorepos. The underlying
	package manager has to be one of <a href="https://docs.npmjs.com/">NPM</a>,
	<a href="https://pnpm.io/">pnpm</a>, or <a href="https://classic.yarnpkg.com/">Yarn</a>, all of
	which come with workspaces support.
</p>

<p>
	The central pitch of Turborepo is to speed up workspace tasks, primarily builds. After configuring
	task dependencies in one or more <code>turbo.json</code>, Turborepo uses this information to run
	tasks in parallel with an aggressive caching strategy. Turborepo can complement local caching with
	shared remote caching. Often this will significantly reduce the duration of deployment builds
	because local builds are cached remotely and can be reused for deployment builds.
</p>

<h2>Workspaces configuration</h2>

<p>
	Let's look at how I configured the repository for my website with the following monorepo directory
	structure:
</p>

<figure>
	<Highlight language={bash} code={data.examples['file-tree.txt']} />
	<figcaption>File tree for the maier.tech monorepo.</figcaption>
</figure>

<p>
	I use NPM as a package manager. Therefore, I defined my workspaces with the
	<code>workspaces</code> property:
</p>

<figure>
	<Highlight language={json} code={data.examples['package.json']} />
	<figcaption>package.json</figcaption>
</figure>

<p>
	I recommended adding package <code>turbo</code> to <code>devDependencies</code>, which gives you
	control over which version to use. You should also install the <code>turbo</code> package globally
	to make the <code>turbo</code> command available in your terminal. A globally installed
	<code>turbo</code>
	command will use the Turborepo version declared in <code>devDependencies</code>.
</p>

<h2>Turborepo configuration</h2>

<p>
	The Turborepo configuration is in <code>turbo.json</code> at the project root level. For my monorepo,
	it looks like this:
</p>

<figure>
	<Highlight language={json} code={data.examples['turbo.json']} />
	<figcaption>turbo.json</figcaption>
</figure>

<p>
	The <code>pipeline</code> property describes dependencies between NPM tasks (defined in the
	<code>scripts</code> tags of workspace <code>package.json</code> files). Each task can have
	additional properties, which you can look up in the
	<a href="https://turbo.build/repo/docs/reference/configuration">
		Turborepo docs (configuration options)
	</a>. I will highlight two of them:
</p>

<ol>
	<li>
		<code>"dependsOn"</code>: Value <code>["^build"]</code> means that every build task should run the
		build tasks of dependencies that reside inside the monorepo in other workspaces.
	</li>
	<li>
		<code>"outputs"</code>: Describes build artifacts that Turborepo should cache. E.g., the build
		of a SvelteKit app goes into directory <code>.svelte-kit</code>. If Turborepo figures out
		nothing has changed during a build, it will retrieve <code>.svelte-kit</code> from its cache
		instead of running the task. Similarly, the output of
		<a href="https://kit.svelte.dev/docs/adapter-vercel">adapter-vercel</a>
		goes into the <code>.vercel</code> directory and needs to be cached. The best case for a build
		is that Turborepo can fetch both <code>.svelte-kit</code> and <code>.vercel</code> from the cache.
	</li>
</ol>

<h2>Nested configuration</h2>

<p>
	Starting with Turborepo v1.8, you can nest configurations and complement a project-level
	configuration with workspace-specific configurations. E.g., in my monorepo,
	<code>packages/ui</code>
	contains a UI package that is managed with SvelteKit's package tooling. When you run the
	<code>build</code>
	command for <code>ui</code>, the build artifacts go into <code>dist</code> and must be cached. I
	could add <code>dist</code> to the <code>outputs</code> property of the <code>build</code> task in
	the project root <code>turbo.json</code>. Then they would be applied to every build task in every
	workspace.
</p>

<p>
	As an alternative, I created the file <code>packages/ui/turbo.json</code>, which extends the
	project root
	<code>turbo.json</code>:
</p>

<figure>
	<Highlight language={json} code={data.examples['packages/ui/turbo.json']} />
	<figcaption>packages/ui/turbo.json</figcaption>
</figure>

<p>
	Turborepo permits overrides only for anything under the<code>pipeline</code> property. The above
	<code>turbo.json</code>
	build task inherits all properties from the project root <code>turbo.json</code> and overrides
	only the <code>outputs</code>
	property.
</p>

<h2>Pitfall: Getting the outputs wrong</h2>

<p>
	Getting the outputs wrong can have unintended side effects. After refactoring my repository to a
	monorepo, I got the following error for every Vercel deployment:
</p>

<figure>
	<Image
		src={vercel_build_error_origin_image}
		alt="Screenshot of the error log of a Vercel deploy. The error message reads: No output directory named 'public' found after the build completed."
		width={1336}
		height={826}
	/>
	<figcaption>Vercel build error after migrating my repository to a Turborepo.</figcaption>
</figure>

<p>
	By default, Vercel expects the deployment files in the <code>public</code> directory or another
	special directory, e.g., <code>.vercel</code>. I had forgotten to add <code>.vercel/**</code> to
	<code>outputs</code> in <code>turbo.json</code>. Whenever Turborepo determined that it could reuse
	a cached build, it did not run the build task and instead fetched all outputs it was aware of from
	the cache. Since it did not know about <code>.vercel</code>, it could not fetch it from the cache,
	and the build ended without a valid build directory.
</p>

<h2>Pitfall: Persistent tasks</h2>

<p>
	Persistent tasks are long-running, e.g., the <code>dev</code> task is persistent. Turborepo does
	not allow any task to depend on a persistent task because it blocks subsequent tasks. Imagine
	<code>ui/package.json</code> defines a <code>watch</code> task that builds the library whenever a
	file changes. I want to add this configuration to <code>apps/website/turbo.json</code>:
</p>

<figure>
	<Highlight language={json} code={data.examples['apps/website/turbo.json']} />
	<figcaption>apps/website/turbo.json</figcaption>
</figure>

<p>
	But this is not permitted since Turorepo does not allow the <code>dev</code> task to depend on
	<code>watch</code>, which is a persistent task. Instead of defining the <code>watch</code> task as
	a dependency of the <code>dev</code> task in <code>turbo.json</code>, you need to launch the watch
	task at the NPM level:
</p>

<figure>
	<Highlight language={json} code={data.examples['apps/website/package.json']} />
	<figcaption>apps/website/package.json</figcaption>
</figure>

<p>
	This script simultaneously launches the <code>watch</code> task for <code>packages/ui</code> and
	the <cocde>dev</cocde> task for <code>apps/website</code>.
</p>

<h2>Conclusion</h2>

<p>
	Configuring Turborepo for a monorepo with one or more SvelteKit apps is relatively easy. But you
	must get the <code>outputs</code> right, including any directories specific to your hosting
	provider. As a layer on top of a package manager, Turborepo does not replace NPM, pnpm, or Yarn.
	As you have seen in the above examples, some configurations go in a <code>turbo.json</code>, and
	others go in a
	<code>package.json</code>. Knowing where configurations go can be challenging in the beginning.
	Expect Turborepo to support more configurations over time and perhaps even merge with a package
	manager or another build tool.
</p>
