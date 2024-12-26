<script lang="ts">
	import { Code, Figure, H2, Image, Ol, P, Shiki } from '@maiertech/sveltekit-helpers';
	import type { PageData } from './$types';
	import vercel_build_error_origin_image from './vercel-build-error.png';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<P>
	Recently, I converted the repository for my website to a
	<a href="https://turbo.build/repo">Turborepo</a>. Turborepo is a task dependency management layer
	on top of a package manager, and it works for normal repositories and monorepos. The underlying
	package manager has to be one of <a href="https://docs.npmjs.com/">NPM</a>,
	<a href="https://pnpm.io/">pnpm</a>, or <a href="https://classic.yarnpkg.com/">Yarn</a>, all of
	which come with workspaces support.
</P>

<P>
	The central pitch of Turborepo is to speed up workspace tasks, primarily builds. After configuring
	task dependencies in one or more <Code>turbo.json</Code>, Turborepo uses this information to run
	tasks in parallel with an aggressive caching strategy. Turborepo can complement local caching with
	shared remote caching. Often this will significantly reduce the duration of deployment builds
	because local builds are cached remotely and can be reused for deployment builds.
</P>

<H2>Workspaces configuration</H2>

<P>
	Let's look at how I configured the repository for my website with the following monorepo directory
	structure:
</P>

<Figure caption="File tree for the maier.tech monorepo." class="mb-6">
	<Shiki lang="bash" code={data.examples['file-tree.txt']} />
</Figure>

<P>
	I use NPM as a package manager. Therefore, I defined my workspaces with the
	<code>workspaces</code> property:
</P>

<Figure caption="package.json" class="mb-6">
	<Shiki lang="json" code={data.examples['package.json']} />
</Figure>

<P>
	I recommended adding package <Code>turbo</Code> to <Code>devDependencies</Code>, which gives you
	control over which version to use. You should also install the <Code>turbo</Code> package globally
	to make the <Code>turbo</Code> command available in your terminal. A globally installed
	<Code>turbo</Code>
	command will use the Turborepo version declared in <Code>devDependencies</Code>.
</P>

<H2>Turborepo configuration</H2>

<P>
	The Turborepo configuration is in <Code>turbo.json</Code> at the project root level. For my monorepo,
	it looks like this:
</P>

<Figure caption="turbo.json" class="mb-6">
	<Shiki lang="json" code={data.examples['turbo.json']} />
</Figure>

<P>
	The <Code>pipeline</Code> property describes dependencies between NPM tasks (defined in the
	<Code>scripts</Code> tags of workspace <Code>package.json</Code> files). Each task can have additional
	properties, which you can look up in the
	<a href="https://turbo.build/repo/docs/reference/configuration">
		Turborepo docs (configuration options)
	</a>. I will highlight two of them:
</P>

<Ol>
	<li>
		<Code>"dependsOn"</Code>: Value <Code>["^build"]</Code> means that every build task should run the
		build tasks of dependencies that reside inside the monorepo in other workspaces.
	</li>
	<li>
		<Code>"outputs"</Code>: Describes build artifacts that Turborepo should cache. E.g., the build
		of a SvelteKit app goes into directory <Code>.svelte-kit</Code>. If Turborepo figures out
		nothing has changed during a build, it will retrieve <Code>.svelte-kit</Code> from its cache instead
		of running the task. Similarly, the output of
		<a href="https://kit.svelte.dev/docs/adapter-vercel">adapter-vercel</a>
		goes into the <Code>.vercel</Code> directory and needs to be cached. The best case for a build is
		that Turborepo can fetch both <Code>.svelte-kit</Code> and <Code>.vercel</Code> from the cache.
	</li>
</Ol>

<H2>Nested configuration</H2>

<P>
	Starting with Turborepo v1.8, you can nest configurations and complement a project-level
	configuration with workspace-specific configurations. E.g., in my monorepo,
	<Code>packages/ui</Code>
	contains a UI package that is managed with SvelteKit's package tooling. When you run the
	<Code>build</Code>
	command for <Code>ui</Code>, the build artifacts go into <Code>dist</Code> and must be cached. I could
	add <Code>dist</Code> to the <Code>outputs</Code> property of the <Code>build</Code> task in the project
	root <Code>turbo.json</Code>. Then they would be applied to every build task in every workspace.
</P>

<P>
	As an alternative, I created the file <Code>packages/ui/turbo.json</Code>, which extends the
	project root <Code>turbo.json</Code>:
</P>

<Figure caption="packages/ui/turbo.json" class="mb-6">
	<Shiki lang="json" code={data.examples['packages/ui/turbo.json']} />
</Figure>

<P>
	Turborepo permits overrides only for anything under the <Code>pipeline</Code> property. The above
	<Code>turbo.json</Code> build task inherits all properties from the project root
	<Code>turbo.json</Code> and overrides only the <Code>outputs</Code> property.
</P>

<H2>Pitfall: Getting the outputs wrong</H2>

<P>
	Getting the outputs wrong can have unintended side effects. After refactoring my repository to a
	monorepo, I got the following error for every Vercel deployment:
</P>

<Figure caption="Vercel build error after migrating my repository to a Turborepo." class="mb-6">
	<Image
		src={vercel_build_error_origin_image}
		alt="Screenshot of the error log of a Vercel deploy. The error message reads: No output directory named 'public' found after the build completed."
	/>
</Figure>

<P>
	By default, Vercel expects the deployment files in the <Code>public</Code> directory or another special
	directory, e.g., <Code>.vercel</Code>. I had forgotten to add <Code>.vercel/**</Code> to
	<Code>outputs</Code> in <Code>turbo.json</Code>. Whenever Turborepo determined that it could reuse
	a cached build, it did not run the build task and instead fetched all outputs it was aware of from
	the cache. Since it did not know about <Code>.vercel</Code>, it could not fetch it from the cache,
	and the build ended without a valid build directory.
</P>

<H2>Pitfall: Persistent tasks</H2>

<P>
	Persistent tasks are long-running, e.g., the <Code>dev</Code> task is persistent. Turborepo does not
	allow any task to depend on a persistent task because it blocks subsequent tasks. Imagine
	<Code>ui/package.json</Code> defines a <Code>watch</Code> task that builds the library whenever a file
	changes. I want to add this configuration to <Code>apps/website/turbo.json</Code>:
</P>

<Figure caption="apps/website/turbo.json" class="mb-6">
	<Shiki lang="json" code={data.examples['apps/website/turbo.json']} />
</Figure>

<P>
	But this is not permitted since Turorepo does not allow the <Code>dev</Code> task to depend on
	<Code>watch</Code>, which is a persistent task. Instead of defining the <Code>watch</Code> task as
	a dependency of the <Code>dev</Code> task in <Code>turbo.json</Code>, you need to launch the watch
	task at the NPM level:
</P>

<Figure caption="apps/website/package.json" class="mb-6">
	<Shiki lang="json" code={data.examples['apps/website/package.json']} />
</Figure>

<P>
	This script simultaneously launches the <Code>watch</Code> task for <Code>packages/ui</Code> and the
	<Code>dev</Code> task for <Code>apps/website</Code>.
</P>

<H2>Conclusion</H2>

<P>
	Configuring Turborepo for a monorepo with one or more SvelteKit apps is relatively easy. But you
	must get the <Code>outputs</Code> right, including any directories specific to your hosting provider.
	As a layer on top of a package manager, Turborepo does not replace NPM, pnpm, or Yarn. As you have
	seen in the above examples, some configurations go in a <Code>turbo.json</Code>, and others go in
	a <Code>package.json</Code>. Knowing where configurations go can be challenging in the beginning.
	Expect Turborepo to support more configurations over time and perhaps even merge with a package
	manager or another build tool.
</P>
