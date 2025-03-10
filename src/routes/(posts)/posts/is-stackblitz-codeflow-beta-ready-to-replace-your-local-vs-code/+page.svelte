<script lang="ts">
	import { Code, Figure, H2, Image, Ol, P, Shiki, Ul } from '@maiertech/sveltekit-helpers';
	import codeflow_bot_light_origin_image from './codeflow-bot-light.png';
	import unsupported_extensions from './unsupported-extensions.png';
</script>

<P>
	At ViteConf 2022, StackBlitz launched
	<a href="https://stackblitz.com/codeflow/beta">Codeflow Beta</a>, a development environment that
	runs natively in modern browsers. They entered a crowded market for browser-based development
	environments. <a href="https://www.gitpod.io/">Gitpod</a>,
	<a href="https://codesandbox.io/">CodeSandbox</a>, and
	<a href="https://github.com/features/codespaces">GitHub Codespaces</a> are the better-known players
	in this space. They all have cloud-based products built with VS Code that aim to replace local development
	environments.
</P>

<P>
	If you wonder why you should replace your local development environment, I wrote a post that
	answers this question:
	<a href="/posts/a-better-development-workflow-with-disposable-workspaces">
		A better development workflow with disposable workspaces
	</a>. In this post, I explained Gitpod's one-workspace-per-task philosophy.
</P>

<P>
	For every new coding task, you fire up a disposable workspace with a new branch created or an
	existing branch checked out and all dependencies installed. Once you have completed a task, you
	dispose of the workspace. Codeflow also follows the one-workspace-per-task philosophy. But unlike
	its cloud-based competitors, it is not a cloud-based offering.
</P>

<H2>What is Codeflow?</H2>

<P>
	Codeflow is VS Code running natively in
	<a href="https://developer.stackblitz.com/platform/webcontainers/browser-support"
		>supported browsers</a
	>, and its enabling technology is called
	<a href="https://blog.stackblitz.com/posts/introducing-webcontainers/">Web Containers</a>. Think
	of WebContainers as a small operating system that runs in a browser and can run Node.js version
	16. Web Containers run on <a href="https://webassembly.org/">WebAssembly</a>, a cross-browser
	virtual machine that many programming languages support as a compilation target.
</P>

<P>
	If your project runs on Node.js, you can work on it with Codeflow. Gitpod, on the other hand,
	supports any development environment that runs in a
	<a href="https://www.docker.com/">Docker</a> container. But I think the Node.js niche is big enough
	for StackBlitz to have a solid business case for Codeflow.
</P>

<H2>Disposable workspaces</H2>

<P>
	You can create a disposable workspace with the shortcut <a href="https://pr.new">pr.new</a>. For
	instance, to write this post, I logged this issue on GitHub:
</P>

<Figure class="mb-6">
	<Shiki lang="text" code="https://github.com/maiertech/maier.tech/issues/589" />
</Figure>

<P>
	To fire up a Codeflow workspace for this issue, I prepended the URL with <strong>pr.new</strong> and
	launched the prepended URL in my browser:
</P>

<Figure class="mb-6">
	<Shiki lang="text" code="https://pr.new/github.com/maiertech/maier.tech/issues/589" />
</Figure>

<P>
	Codeflow fired up a workspace in my browser on branch <Code>maiertech/issue589</Code> and installed
	all dependencies.
</P>

<P>
	Prepending URLs with <strong>pr.new</strong> also works for GitHub pull request and branch URLs. The
	workspace will have the existing branches checked out in these two scenarios.
</P>

<H2>GitHub integration</H2>

<P>
	Codeflow comes with a
	<a href="https://developer.stackblitz.com/codeflow/integrating-codeflowapp-bot">
		GitHub integration
	</a>
	called codeflowapp, which comments on every pull request. It makes manually prepending GitHub URLs
	with <strong>pr.new</strong> obsolete because it adds a link to launch a Codeflow workspace as pull
	request comment:
</P>

<Figure
	caption="In this screenshot, codeflowapp commented on a pull request on GitHub and added a button to launch a Codeflow workspace for a pull request review."
	class="mb-6"
>
	<Image
		src={codeflow_bot_light_origin_image}
		alt="The screenshot shows codeflowapp's comment and the button to launch a Codeflow workspace."
	/>
</Figure>

<H2>VS Code extensions</H2>

<P>
	Extensions are indispensable for my developer happiness when I work with VS Code. For instance, I
	use the <a href="https://open-vsx.org/extension/esbenp/prettier-vscode">Prettier</a> extension in
	every project. When I work with Svelte, I use
	<a href="https://open-vsx.org/extension/svelte/svelte-vscode">Svelte for VS Code</a>.
</P>

<P>
	Supporting VS Code extensions in browser-based workspaces is a challenge. Due to licensing
	restrictions, these workspaces run with <a href="https://vscodium.com/">VSCodium</a>, VS Code's
	open-source core. But VSCodium ships without support for
	<a href="https://marketplace.visualstudio.com/vscode">
		Microsoft's marketplace for VS Code extensions
	</a>. Codeflow's cloud-based competitors came up with two approaches to support VS Code
	extensions:
</P>

<Ol>
	<li>
		Running a cloud workspace in a local VS Code provides access to Microsoft's extensions
		marketplace without a workaround.
	</li>
	<li>
		Gitpod created an alternative marketplace called
		<a href="https://open-vsx.org/">Open VSX Registry</a>. Gitpod's browser-based workspaces install
		VS Code extensions from the alternative marketplace.
	</li>
</Ol>

<P>
	Codeflow comes with a selection of popular extensions pre-installed. Launching a workspace will
	enable project-specific extensions listed in <Code>.vscode/extensions.json</Code>. If an extension
	is not available in Codeflow, you will see a warning:
</P>

<Figure
	caption="You are out of luck when a project requires extensions not pre-installed in Codeflow."
	class="mb-6"
>
	<Image
		src={unsupported_extensions}
		alt="Screenshot from Codeflow showing a warning message that says that the Thunder Client and Grammarly extensions are not supported."
	/>
</Figure>

<H2>Settings sync</H2>

<P>
	Codeflow supports settings sync for VS Code user settings. You can customize a workspace with user
	settings, and Codeflow will apply these settings to every workspace it launches. Note that
	Codeflow has a custom synchronization provider, i.e., it cannot sync with the settings you already
	have in your local VS Code (which syncs with a GitHub or Microsoft account).
</P>

<H2>Package managers</H2>

<P>
	When you run NPM in a Codeflow workspace, you run StackBlitz's
	<a
		href="https://developer.stackblitz.com/platform/webcontainers/turbo-package-manager#frontmatter-title"
	>
		Turbo
	</a>
	package manager (not to be confused with
	<a href="https://turbo.build/pack">Turbopack</a> and
	<a href="https://turbo.build/repo">Turborepo</a>). Turbo supports only a subset of NPM commands,
	e.g., it does not support <Code>npm outdated</Code>. According to StackBlitz, Codeflow will
	eventually support the full NPM CLI. Until then, Codeflow fully supports NPM alternatives
	<a href="https://pnpm.io/">pnpm</a> and <a href="https://yarnpkg.com/">Yarn</a>. And
	<a href="https://github.com/stackblitz/core/issues/1814#issuecomment-1374835721">Turborepo</a> if you
	work with a monorepo.
</P>

<H2>Codeflow Beta caveats</H2>

<P>Codeflow is in beta; therefore, you should expect bugs and rough edges:</P>

<Ul>
	<li>
		The <a href="https://developer.stackblitz.com/codeflow/codeflow-faq">FAQ</a> states that the code
		does not persist between sessions, and you will lose your code if you reload or close the browser
		tab. To prevent this, commit and push to the origin often.
	</li>

	<li>
		During my tests with Codeflow, I encountered various bugs, e.g., the Prettier extension would
		not work, Codeflow would not apply my user settings, or Codeflow would not recognize the GitHub
		repository it just cloned.
	</li>

	<li>
		It is impossible to store secrets as environment variables. If you need a secret, such as an API
		key, you must rely on <Code>.env</Code> files during development.
	</li>
</Ul>

<H2>Conclusion</H2>

<P>
	Codeflow Beta is a significant milestone towards disposable workspaces that run natively in
	browsers. But it has several drawbacks, e.g., limited VS Code extensions and support for Node
	projects only.
</P>

<P>
	If you already use one of Codeflow's competitors and it works for you, it is hard to argue why you
	should trade in something battle-tested for a bleeding-edge workspace with fewer features. I see
	the appeal of using WebContainers to run a development environment. But StackBlitz has yet to find
	convincing use cases where Codeflow outperforms its cloud competitors. Keep an eye on Codeflow and
	take it for a spin once it is out of beta.
</P>
