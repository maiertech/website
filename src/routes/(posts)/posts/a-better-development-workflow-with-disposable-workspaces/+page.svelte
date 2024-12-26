<script lang="ts">
	import { code as Code, h2 as H2, p as P, ul as Ul } from '@maiertech/sveltekit-helpers';
</script>

<P>
	In my post
	<a href="/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces">
		Move your IDE to the cloud: introduction to GitHub Codespaces
	</a>
	I was bullish about moving my local development environment to the cloud. During the
	<a href="https://github.com/features/codespaces/">GitHub Codespaces</a>
	beta, I was able to run VS Code instances (referred to as workspaces) in the cloud as my primary development
	environment for several months. Even though my experience with cloud workspaces was positive, I initially
	switched back to local development. Using cloud workspaces felt like local development (which is a
	significant achievement) but did not eliminate the pain points of local development.
</P>

<H2>Moving workspaces to the cloud is not enough</H2>

<P>
	In local development, you usually clone a repository once. When working on different branches, you
	switch context by switching branches and updating dependencies. When you work on multiple issues
	in parallel, switching between branches causes a lot of friction. Every time you switch branches,
	you need to update your dependencies, a pain point for local development.
</P>

<P>
	The early Codespaces beta had a
	<a href="https://github.community/t/max-number-of-codespaces-during-beta/134984">
		limit of two workspaces
	</a>. When switching between projects, I deleted and created workspaces frequently to work around
	the limited number of workspaces. Every new workspace came with a wait time until it was ready to
	use. And once a workspace was up and running, I used it for multiple tasks, just like a local
	workspace, frequently switching branches and updating dependencies. The perceived added value of a
	cloud workspace was marginal.
</P>

<H2>Making workspaces disposable</H2>

<P>
	<a href="https://www.gitpod.io/">Gitpod</a> is an alternative to Codespaces and a comparatively
	small player in this field, and their product
	<a
		href="https://www.freecodecamp.org/news/github-codespaces-vs-gitpod-cloud-based-dev-environments/"
	>
		precedes Codespaces
	</a>. Gitpod turns cloud workspaces into a disposable commodity with their
	<a href="https://www.gitpod.io/docs/workspaces/"><em>one workspace per task approach</em></a>.
	This is a radical departure from <em>one workspace for many tasks</em>, which is the default for
	local development.
</P>

<P>
	With Gitpod's approach, you can be wasteful with workspaces. You create a new, fresh cloud
	workspace for every issue you work on and every pull request you review. The technical
	prerequisite is configuring your workspace as code and adding the configuration to your
	repository. This is done with a
	<a href="https://www.gitpod.io/docs/configure"><Code>.gitpod.yml</Code></a> file, which contains information
	such as
</P>

<Ul>
	<li>init task (e.g., run <Code>npm install</Code>),</li>
	<li>install project-specific VS Code extensions,</li>
	<li>expose ports and</li>
	<li>configure environment variables.</li>
</Ul>

<P>
	Once your workspace is up and running, you are ready to code. There is no need to install
	dependencies (if you let Gitpod install them for you during the init task). You start coding in no
	time, and once you have created a pull request, you dispose of your workspace. Create a new
	workspace if you need to make changes after a pull request review.
</P>

<P>
	Sounds good in theory. But in practice, it can take longer to create a workspace if your init task
	takes long. A command like <Code>npm install</Code> may run faster in the cloud, but probably not fast
	enough to make the wait for your new workspace feel short. No developer will put up with long wait
	times in their workflow.
</P>

<H2>How to make disposable workspaces viable</H2>

<P>
	Configuring a workspace in code is not a unique feature of Gitpod, and Codespaces can do the same
	with a
	<a
		href="https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-project-for-codespaces"
	>
		different configuration syntax
	</a>. GitHub has also removed the two workspaces limit for Codespaces, which addresses the pain
	points I described earlier. But what sets Gitpod apart are two features that make creating new
	workspaces fast and easy:
</P>

<Ul>
	<li>
		<a href="https://www.gitpod.io/docs/prebuilds">Prebuilds</a>: Instead of running the init task
		for a workspace when you launch a new workspace, Gitpod runs it whenever you push to your
		repository (you have complete control over when, e.g., for every push to the main branch and
		every pull request). Chances are that the init task has been completed by the time you want to
		launch a new workspace, and workspace initialization feels instant.
	</li>
	<li>
		<a href="https://www.gitpod.io/docs/browser-extension">Browser extension</a>: Gitpod's browser
		extension turns repository pages of GitHub, GitLab, and Bitbucket into a dashboard from which
		you can conveniently launch new workspaces. Let's say you want to work on an issue. You navigate
		to the issue page, assign the issue to yourself and then launch a workspace. The workspace
		launches with an issue branch created and is up and running almost instantly. This is possible
		because of a prebuild for the commit from which the issue branch was branched off. There is no
		need to create a new branch or update dependencies in your new workspace; it is all done for
		you.
	</li>
</Ul>

<P>
	Combining prebuilds and the browser extension and adopting a <em>one task per workspace</em> mindset
	enables a great development workflow that treats workspaces as disposable commodities. They can be
	created and disposed of with minimal overhead. You can have multiple workspaces for different tasks
	for the same repository. Rather than switching between branches, you switch between workspaces.
</P>

<P>
	I want to point out that GitHub Codespaces is going in the same direction as Gitpod, but it
	currently does not support
	<a
		href="https://docs.github.com/en/enterprise-cloud@latest/codespaces/customizing-your-codespace/prebuilding-codespaces-for-your-project"
	>
		prebuilds
	</a> and cannot create workspaces from issues and pull requests on a repository's GitHub page. Another
	downside of Codespaces is that it does not support GitHub's competitors, GitLab and Bitbucket.
</P>

<H2>Should individual developers use Gitpod or Codespaces?</H2>

<P>
	Gitpod has a free plan which includes 50 hours per month, which is good enough for occasional side
	projects but nowhere near what you need when using Gitpod full-time. In this case, you have to
	consider a <a href="https://www.gitpod.io/pricing">paid plan</a>. Personal accounts on GitHub
	include a
	<a
		href="https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces"
	>
		more generous free tier for Codespaces usage
	</a>. But eventually you will have to pay. This triggers the question of whether you want to pay
	for cloud workspaces when you can do unlimited local development on your laptop.
</P>

<P>
	Gitpod and Codespaces make it possible to develop inside a browser on Chromebooks, iPads, and
	pretty much any device that runs a modern browser. This is a big deal, but it comes with a price
	tag. On the other hand, there is nothing wrong with local development, but you are missing out on
	a fantastic new workflow that you cannot replicate locally.
</P>
