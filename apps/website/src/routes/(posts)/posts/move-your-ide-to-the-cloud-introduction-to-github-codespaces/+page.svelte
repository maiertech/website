<script>
	import Highlight from 'svelte-highlight';
	import { json } from 'svelte-highlight/languages';

	export let data;
	const { examples } = data;
</script>

<p>
	<a href="https://github.com/">GitHub</a> launched
	<a href="https://github.com/features/codespaces">Codespaces</a> in limited public beta at
	<a
		href="https://github.blog/2020-05-06-new-from-satellite-2020-github-codespaces-github-discussions-securing-code-in-private-repositories-and-more/"
		>GitHub Satellite 2020</a
	>. Codespaces promise to lower the barrier to contributing to GitHub repositories. It would be a
	huge win if contributors (or co-workers) could spin up an instance of VS Code in a browser with
	all required plugins and configurations in place, fully ready for their first commit. What
	previously might have taken several hours to several days would now be reduced to just a few
	minutes, which is the time it takes to spin up a development container.
</p>

<p>
	I have used GitHub Codespaces for work and side projects over the past few months. There were some
	rough edges, but overall, Codespaces did not disappoint. In this post, I will explain the
	underlying technology and discuss the impact of Codespaces on making contributions to GitHub
	repositories so much easier.
</p>

<h2>Save your development environment to your GitHub repository</h2>

<p>
	The idea of Codespaces is simple: configure a <a href="https://www.docker.com/">Docker</a> container
	and add VS Code configurations and plugins to this container. Then add the corresponding configuration
	files to your GitHub repository. Anyone can now run a pre-configured development container (with the
	repository cloned inside) in their browser or a locally installed VS Code.
</p>

<p>
	You do not have to be a Docker expert to use Codespaces. The
	<a href="https://github.com/microsoft/vscode-dev-containers">vscode-dev-containers</a> repository
	is a collection of Docker images for standard technology stacks. E.g., there is a
	<a
		href="https://github.com/microsoft/vscode-dev-containers/tree/master/containers/javascript-node"
		>javascript-node</a
	>
	image that comes with <a href="https://nodejs.org/en/">Node.js</a> and
	<a href="https://classic.yarnpkg.com/lang/en/">Yarn</a>
	installed. You can check what stacks are available in the
	<a href="https://github.com/microsoft/vscode-dev-containers/tree/master/containers">containers</a>
	directory, which contains a sub-directory for each image with a <code>README.md</code> and a
	<code>.devcontainer</code> sub-directory that contains the following files:
</p>

<ul>
	<li>
		<code>base.Dockerfile</code>: Dockerfile from which an image for the
		<a href="https://github.com/microsoft/containerregistry">Microsoft Container Registry (MCR)</a> has
		been created.
	</li>
	<li>
		<code>Dockerfile</code>: a Dockerfile used to spin up a development container. It contains the
		link to the MCR image.
	</li>
	<li>
		<code>devcontainer.json</code>: a configuration file to customize VS Code when it runs in the
		container.
	</li>
</ul>

<p>
	To use a container from the vscode-dev-containers repository for your repository, copy
	<code>Dockerfile</code> and <code>devcontainer.json</code> into directory
	<code>.devcontainer</code>. If you need to customize the Docker image, you can modify
	<code>Dockerfile</code>, which contains comments with pointers on how to customize it. A common
	use case for customization is installing additional Linux packages. If you do not need to
	customize the Docker image, you can delete <code>Dockerfile</code> and instead reference the
	Docker image in <code>devcontainer.json</code>.
</p>

<p>
	Let's look at a <code>devcontainer.json</code> example:
</p>

<figure>
	<Highlight language={json} code={examples['devcontainer.json']} />
	<figcaption>.devcontainer/devcontainer.json</figcaption>
</figure>

<p>
	In this example, the <code>image</code> property references a Docker image on MCR. The
	<code>extensions</code> property contains IDs of VS Code extensions that should be installed into
	the container. <code>postCreateCommand</code> runs <code>npm i</code> to install dependencies.
	Check out the
	<a href="https://containers.dev/implementors/json_reference/">devcontainer.json reference</a>
	for a full list of properties.
</p>

<h2>Launch your development environment anywhere</h2>

<p>
	Once you have committed the directory `.devcontainer`, your repository is ready for Codespaces. Go
	to
	<a href="https://github.com/codespaces">github.com/codespaces</a> and select your repository and a
	branch, usually <code>main</code>. This spins up a development container on GitHub's cloud and
	launches a fully configured VS Code instance in the browser that connects to the container. At
	this point, you are ready to make a commit. This works on any machine that runs a modern browser,
	including Chromebooks.
</p>

<p>
	If you prefer working in your locally installed VS Code, install the <a
		href="https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces"
		>GitHub Codespaces extension</a
	> and connect to any of your Codespaces or launch a new one. Your development container runs in the
	cloud, but it feels like developing locally. Since all the heavy lifting is done in the cloud, even
	an underpowered Macbook Air makes for an excellent development machine.
</p>

<h2>Local development with containers</h2>

<p>
	Codespaces spins up a Docker container from the configuration files added to your repository. You
	can use the same configuration files to spin up a development container on your machine and tell
	VS Code to use that container for development.
</p>

<p>
	First, you have to install
	<a href="https://www.docker.com/products/docker-desktop">Docker Desktop</a>
	(<code>brew install docker</code> on Mac). Then you need to install the following two VS Code extensions:
</p>

<ol>
	<li>
		The <a href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker"
			>Docker extension</a
		> helps you manage Docker images.
	</li>
	<li>
		The <a
			href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers"
			>Remote - Containers extension</a
		>
		makes it easy to clone a GitHub repository inside a container launched from the configuration files
		inside that repository and connect to it.
	</li>
</ol>

<p>
	I must point out that running Docker Desktop is resource-intensive and not a good idea if your
	machine is resource-stingy. But if you have a powerful enough machine, running containers locally
	is a great alternative to setting up a local development environment.
</p>

<h2>Containers lower the barrier to contributing</h2>

<p>
	Getting up and running fast when you are supposed to contribute to a project as a developer is
	widely underappreciated. All too often, teams accept that spending hours or days configuring a
	development environment is inevitable. Fiddling with a development environment is often not even a
	one-off but a recurring issue because things break or get outdated and need to be fixed manually
	by every team member.
</p>

<p>
	Incomplete instructions on how to install a development environment are a sure way to frustrate
	new team members. They are often under pressure to contribute quickly, yet they have to figure out
	how to get to the point where they can contribute. GitHub Codespaces and developing with
	containers does away with all this nonsense.
</p>

<p>
	This is also great news for open-source projects because submitting a pull request can now be as
	easy as spinning up a Codespaces container, making a fix, and submitting a pull request in just a
	few minutes. But there is another aspect of Codespaces that is important for open source: they
	make contributing to open source accessible to more developers because owning powerful hardware to
	code matters less. You can access a powerful development container if your machine runs a modern
	browser.
</p>

<p>
	Finally, I would like to emphasize that GitHub Codespaces is a
	<a
		href="https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces"
		>paid product, which comes with a free tier</a
	>. We all know that the moment you spin up a container in the cloud, a price tag is attached to it
	because it consumes hardware and power. Therefore, we should expect Codespaces to be something
	other than a free product. But I think GitHub needs to ensure that there is some mechanism in
	place to keep Codespaces affordable because we want to take advantage of all the contributions to
	open source by developers with limited hardware and financial resources.
</p>
