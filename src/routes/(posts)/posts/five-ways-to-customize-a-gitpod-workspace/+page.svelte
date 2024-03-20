<script>
	import Image from '$lib/components/image.svelte';
	import Highlight from 'svelte-highlight';
	import { dockerfile, yaml } from 'svelte-highlight/languages';
	import gitpod_editors_origin_image from './gitpod-editors.png';

	export let data;
</script>

<p>
	A <a href="https://gitpod.io/">Gitpod</a> workspace aims to be a no-compromise replacement for a local
	workspace, no matter whether you access it with a browser or via SSH with your desktop editor. Like
	a local workspace, a Gitpod workspace is fully customizable. This post will show you five ways to customize
	a Gitpod workspace.
</p>

<p>
	If you are wondering why you should use Gitpod instead of your local development environment, read
	my post
	<a href="/posts/a-better-development-workflow-with-disposable-workspaces"
		>A better development workflow with disposable workspaces</a
	>.
</p>

<h2>1: .gitpod.yml</h2>

<p>
	You can configure Gitpod workspaces by adding a <code>.gitpod.yml</code> to your repository. This
	section covers three configuration options. You can find an overview of all configuration options
	in the <a href="https://www.gitpod.io/docs/references/gitpod-yml">Gitpod docs</a>.
</p>

<h3>Prebuilds</h3>

<p>
	Creating a workspace from <code>.gitpod.yml</code> may take several minutes, depending on your
	stack. With prebuilds, you can accelerate the launch of a new workspace. Prebuilds trigger
	whenever you push code to certain repository branches. If possible, Gitpod launches a prebuild
	instead of creating a workspace from scratch, which feels instantaneous. Use the
	<code>github</code> key to configure prebuilds:
</p>

<figure>
	<Highlight language={yaml} code={data.examples['.gitpod.yml-github']} />
	<figcaption>.gitpod.yml</figcaption>
</figure>

<p>
	For prebuilds to work, you must create a project linked to your GitHub repository in the Gitpod
	dashboard
	<a href="https://www.gitpod.io/docs/configure/projects/prebuilds">as explained in the docs</a>.
</p>

<h3>Tasks</h3>

<p>
	The next step is to create tasks that run when you launch a workspace. Here is an example of a
	task that installs NPM dependencies and launches the development server:
</p>

<figure>
	<Highlight language={yaml} code={data.examples['.gitpod.yml-tasks']} />
	<figcaption>.gitpod.yml</figcaption>
</figure>

<p>
	With prebuilds enabled, the <code>init</code> portion of the task will run during the prebuild,
	and the
	<code>command</code> portion will run when the workspace launches.
</p>

<h3>Ports</h3>

<p>
	When you run a development server, you need to let Gitpod know the port of your server and whether
	a preview should be publicly accessible. For a SvelteKit app, e.g., Gitpod needs to expose port
	5173:
</p>

<figure>
	<Highlight language={yaml} code={data.examples['.gitpod.yml-ports']} />
	<figcaption>.gitpod.yml</figcaption>
</figure>

<p>
	Typically, you should set visibility to <code>private</code>. Then you have to be authenticated to
	Gitpod to access the preview. But if you want an easy way to test a website on another device or
	you want to share a preview with someone else, set visibility to <code>public</code>.
</p>

<h2>2: Workspace images</h2>

<p>
	By default, new Gitpod workspaces launch with Docker image
	<a href="https://hub.docker.com/r/gitpod/workspace-full">gitpod/workspace-full</a>, which is a
	universal image that comes with a variety of programming languages pre-installed. Gitpod also
	offers specialized images, e.g., for web development, you can use
	<a href="https://hub.docker.com/r/gitpod/workspace-node">gitpod/workspace-node</a> or
	<a href="https://hub.docker.com/r/gitpod/workspace-node-lts">gitpod/workspace-node-lts</a>. Check
	out <a href="https://github.com/gitpod-io/workspace-images">this repository</a> for a list of official
	workspace images.
</p>

<p>
	To replace the default workspace image with a custom image, set the <code>image</code> key in
	<code>.gitpod.yml</code>:
</p>

<figure>
	<Highlight language={yaml} code={data.examples['.gitpod.yml-custom-image']} />
	<figcaption>.gitpod.yml</figcaption>
</figure>

<p>
	While you can use a custom Docker image with Gitpod, I recommend customizing an official image
	rather than trying to create a custom image from scratch.
</p>

<p>
	Gitpod makes simple customizations of workspace images easy. If, e.g., you need an additional
	package on a workspace image, you can add it without being a Docker expert. In one of my recent
	projects, I used <a href="https://turbo.build/repo">Turborepo</a> to accelerate NPM tasks in a
	monorepo. I needed the NPM package <a href="https://www.npmjs.com/package/turbo">turbo</a> installed
	globally in my workspace. The solution: customize a workspace image.
</p>

<p>You first have to declare the custom image using the <code>image</code> key:</p>

<figure>
	<Highlight language={yaml} code={data.examples['.gitpod.yml-customized-image']} />
	<figcaption>.gitpod.yml</figcaption>
</figure>

<p>
	Gitpod will then look for the Docker image file <code>.gitpod.Dockerfile</code> when launching the
	workspace. I customized the Docker image like this:
</p>

<figure>
	<Highlight language={dockerfile} code={data.examples['.gitpod.Dockerfile']} />
	<figcaption>.gitpod.Dockerfile</figcaption>
</figure>

<p>
	<code>FROM</code> indicates the image to be customized, and <code>RUN</code> runs the NPM command
	to install the turbo package globally. Official workspace images also include
	<a href="https://docs.brew.sh/Homebrew-on-Linux">Homebrew for Linux</a>
	to make customizations easier. E.g., you could add <code>RUN brew install pandoc</code> to install
	document converter
	<a href="https://pandoc.org/">Pandoc</a> into your Docker image with Homebrew.
</p>

<h2>3: Gitpod settings sync</h2>

<p>
	VS Code offers <a href="https://code.visualstudio.com/docs/editor/settings-sync">settings sync</a>
	to synchronize your workspace customizations to any VS Code instance. You can use a GitHub or Microsoft
	account for settings sync. But for browser-based Gitpod workspaces, you cannot use GitHub or Microsoft
	as a sync provider.
</p>

<p>
	Since Gitpod does not run VS Code desktop in the browser, but its open-source sibling
	<a href="https://vscodium.com/">VSCodium</a>, browser-based workspaces lack proprietary VS Code
	features such as using GitHub or Microsoft as a sync provider. Instead, you can use Gitpod as a
	sync provider.
</p>

<p>
	The good news is that you can also configure Gitpod as your settings sync provider for VS Code
	desktop. As a result, you can synchronize your settings between browser-based and desktop-based
	Gitpod workspaces. Check out the
	<a href="https://www.gitpod.io/docs/references/ides-and-editors/settings-sync"
		>Gitpod settings sync docs</a
	>.
</p>

<h2>4: VS Code extensions</h2>

<p>
	There is another catch with browser-based Gitpod workspaces. VSCodium cannot access the
	<a href="https://marketplace.visualstudio.com/VSCode">VS Code marketplace</a>. Customizing your
	development experience with extensions is one of the biggest selling points for VS Code. Gitpod
	realized that not having VS Code extensions would be a deal breaker for many developers.
	Therefore, they co-created the <a href="https://open-vsx.org/">Open VSX Registry</a>, an
	alternative to the VS Code marketplace, and integrated it into browser-based workspaces.
</p>

<p>
	The Open VSX Registry contains a subset of the VS Code marketplace. Many extension authors
	cross-publish their extensions to the Open VSX Registry, i.e., the most popular extensions are all
	available. But you cannot access proprietary extensions such as
	<a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot">GitHub Copilot</a>.
</p>

<p>
	If you list project-specific extensions in <code>.gitpod.yml</code>, they will be automatically
	installed into every workspace launched with this configuration:
</p>

<figure>
	<Highlight language={yaml} code={data.examples['.gitpod.yml-vscode-extensions']} />
	<figcaption>.gitpod.yml</figcaption>
</figure>

<p>
	When you access a Gitpod workspace with VS Code desktop, extensions will be installed from the VS
	Code marketplace and for a browser-based Gitpod workspace from the Open VSX Registry.
</p>

<p>
	Install any non-project-specific extension in a Gitpod workspace with sync enabled, and it will
	synchronize into any new Gitpod workspace you launch.
</p>

<h2>5: Editors and Git Providers</h2>

<p>
	Gitpod is more than combining a virtual machine in the cloud with GitHub and VS Code. While GitHub
	and VS Code are popular choices, alternative Git providers and editors are available. Gitpod is
	the only cloud workspace that supports GitHub, GitLab, and Bitbucket as Git providers and various
	JetBrains IDEs:
</p>

<figure>
	<Image
		src={gitpod_editors_origin_image}
		alt="Screenshot of user settings in the Gitpod dashboard. There are ten cards with ten editor options, VS Code desktop and browser, and several IDEs by JetBrains."
		width={1686}
		height={1210}
	/>
	<figcaption>Gitpod supports VS Code and various JetBrains IDEs as editors.</figcaption>
</figure>

<p>
	Not all customizations covered in this post make sense with all combinations of Git providers and
	editors. E.g., settings sync between browser-based and desktop-based Gitpod workspaces is only
	relevant if you use VS Code as your editor.
</p>

<h2>Conclusion</h2>

<p>
	This post covered five ways to customize a Gitpod workspace focusing on GitHub as Git provider and
	VS Code as editor. I have used this combination with Gitpod as my primary development environment
	for web development for almost two years. I have yet to encounter a scenario where Gitpod cannot
	replace my local development environment.
</p>

<p>
	Gitpod covers numerous stacks, three Git providers, and VS Code's main competitor JetBrains, which
	no other Gitpod alternative can support. With Gitpod, you can choose the development environment
	that works best for you.
</p>

<em>
	Thanks to <a href="https://twitter.com/paulienuh">Pauline Narvas</a> from Gitpod and Gitpod
	Community Hero
	<a href="https://github.com/Derroylo">Carsten Lohmann</a> for their valuable feedback while drafting
	this post.
</em>
