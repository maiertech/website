---
title: Five ways to customize a Gitpod workspace
author: thilo
publishedDate: 2023-03-23
description:
  'Five ways to customize Gitpod workspaces: config, images, settings sync, extensions, and
  editor/Git provider options for a tailored dev environment.'
tags:
  - productivity
---

<script>
	import { Figure } from '@maiertech/sveltekit-helpers';
  import GitpodEditorsImage from './GitpodEditorsImage.svelte';
</script>

A [Gitpod](https://gitpod.io/) workspace aims to be a no-compromise replacement for a local
workspace, whether you access it with a browser or via SSH with your desktop editor. Like a local
workspace, a Gitpod workspace is fully customizable. This post will show you five ways to customize
a Gitpod workspace.

If you are wondering why you should use Gitpod instead of your local development environment, read
my post
[A better development workflow with disposable workspaces](/posts/a-better-development-workflow-with-disposable-workspaces).

## 1: .gitpod.yml

You can configure Gitpod workspaces by adding a `.gitpod.yml` to your repository. This section
covers three configuration options. You can find an overview of all configuration options in the
[Gitpod docs](https://www.gitpod.io/docs/references/gitpod-yml).

### Prebuilds

Creating a workspace from `.gitpod.yml` may take several minutes, depending on your stack. With
prebuilds, you can accelerate the launch of a new workspace. Prebuilds are triggered whenever you
push code to certain repository branches. If possible, Gitpod launches a prebuild instead of
creating a workspace from scratch, which feels instantaneous. Use the `github` key to configure
prebuilds:

<Figure caption=".gitpod.yml" class="mb-8">

```yaml
# ...

github:
  prebuilds:
    master: true
    branches: true
    pullRequests: true
    pullRequestsFromForks: false
    addCheck: prevent-merge-on-error
    addComment: false
    addBadge: false
# ...
```

</Figure>

For prebuilds to work, you must create a project linked to your GitHub repository in the Gitpod
dashboard [as explained in the docs](https://www.gitpod.io/docs/configure/projects/prebuilds).

### Tasks

The next step is to create tasks that run when you launch a workspace. Here is an example of a task
that installs NPM dependencies and launches the development server:

<Figure caption=".gitpod.yml" class="mb-8">

```yaml
# ...
tasks:
  - name: Run dev server
    init: npm install
    command: npm run dev
# ...
```

</Figure>

With prebuilds enabled, the `init` portion of the task will run during the prebuild, and the
`command` portion will run when the workspace launches.

### Ports

When you run a development server, you need to let Gitpod know the port of your server and whether a
preview should be publicly accessible. For a SvelteKit app, for example, Gitpod needs to expose port
5173:

<Figure caption=".gitpod.yml" class="mb-8">

```yaml
# ...
ports:
  - port: 5173
    visibility: public
# ...
```

</Figure>

Typically, you should set visibility to `private`. Then you have to be authenticated to Gitpod to
access the preview. But if you want an easy way to test a website on another device or you want to
share a preview with someone else, set visibility to `public`.

## 2: Workspace images

By default, new Gitpod workspaces launch with the Docker image
[gitpod/workspace-full](https://hub.docker.com/r/gitpod/workspace-full), which is a universal image
that comes with a variety of programming languages pre-installed. Gitpod also offers specialized
images. For web development, for example, you can use
[gitpod/workspace-node](https://hub.docker.com/r/gitpod/workspace-node) or
[gitpod/workspace-node-lts](https://hub.docker.com/r/gitpod/workspace-node-lts). Check out
[this repository](https://github.com/gitpod-io/workspace-images) for a list of official workspace
images.

To replace the default workspace image with a custom image, set the `image` key in `.gitpod.yml`:

<Figure caption=".gitpod.yml" class="mb-8">

```yaml
image: gitpod/workspace-node-lts
# ...
```

</Figure>

While you can use a custom Docker image with Gitpod, I recommend customizing an official image
rather than trying to create a custom image from scratch.

Gitpod makes simple customizations of workspace images easy. If, for example, you need an additional
package on a workspace image, you can add it without being a Docker expert. In one of my recent
projects, I used [Turborepo](https://turbo.build/repo) to accelerate NPM tasks in a monorepo. I
needed the NPM package [turbo](https://www.npmjs.com/package/turbo) installed globally in my
workspace. The solution: customize a workspace image.

You first have to declare the custom image using the `image` key:

<Figure caption=".gitpod.yml" class="mb-8">

```yaml
image:
  file: .gitpod.Dockerfile
# ...
```

</Figure>

Gitpod will then look for the Docker image file `.gitpod.Dockerfile` when launching the workspace. I
customized the Docker image like this:

<Figure caption=".gitpod.Dockerfile" class="mb-8">

```bash
FROM gitpod/workspace-node-lts

RUN npm i -g turbo
```

</Figure>

`FROM` indicates the image to be customized, and `RUN` runs the NPM command to install the turbo
package globally. Official workspace images also include
[Homebrew for Linux](https://docs.brew.sh/Homebrew-on-Linux) to make customizations easier. For
example, you could add `RUN brew install pandoc` to install the document converter
[Pandoc](https://pandoc.org/) into your Docker image with Homebrew.

## 3: Gitpod settings sync

VS Code offers [settings sync](https://code.visualstudio.com/docs/editor/settings-sync) to
synchronize your workspace customizations to any VS Code instance. You can use a GitHub or Microsoft
account for settings sync. But for browser-based Gitpod workspaces, you cannot use GitHub or
Microsoft as a sync provider.

Since Gitpod does not run VS Code desktop in the browser, but its open-source sibling
[VSCodium](https://vscodium.com/), browser-based workspaces lack proprietary VS Code features such
as using GitHub or Microsoft as a sync provider. Instead, you can use Gitpod as a sync provider.

The good news is that you can also configure Gitpod as your settings sync provider for VS Code
desktop. As a result, you can synchronize your settings between browser-based and desktop-based
Gitpod workspaces. Check out the
[Gitpod settings sync docs](https://www.gitpod.io/docs/references/ides-and-editors/settings-sync).

## 4: VS Code extensions

There is another catch with browser-based Gitpod workspaces. VSCodium cannot access the
[VS Code marketplace](https://marketplace.visualstudio.com/VSCode). Customizing your development
experience with extensions is one of the biggest selling points for VS Code. Gitpod realized that
not having VS Code extensions would be a deal breaker for many developers. Therefore, they
co-created the [Open VSX Registry](https://open-vsx.org/), an alternative to the VS Code
marketplace, and integrated it into browser-based workspaces.

The Open VSX Registry contains a subset of the VS Code marketplace. Many extension authors
cross-publish their extensions to the Open VSX Registry, so the most popular extensions are all
available. But you cannot access proprietary extensions such as
[GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot).

If you list project-specific extensions in `.gitpod.yml`, they will be automatically installed into
every workspace launched with this configuration:

<Figure caption=".gitpod.yml" class="mb-8">

```yaml
# ...
vscode:
  extensions:
    - bradlc.vscode-tailwindcss
    - dbaeumer.vscode-eslint
    - esbenp.prettier-vscode
    - svelte.svelte-vscode
# ...
```

</Figure>

When you access a Gitpod workspace with VS Code desktop, extensions will be installed from the VS
Code marketplace, and for a browser-based Gitpod workspace, from the Open VSX Registry.

Install any non-project-specific extension in a Gitpod workspace with sync enabled, and it will
synchronize into any new Gitpod workspace you launch.

## 5: Editors and Git providers

Gitpod is more than combining a virtual machine in the cloud with GitHub and VS Code. While GitHub
and VS Code are popular choices, alternative Git providers and editors are available. Gitpod is the
only cloud workspace that supports GitHub, GitLab, and Bitbucket as Git providers and various
JetBrains IDEs:

<Figure caption="Gitpod supports VS Code and various JetBrains IDEs as editors." class="mb-8">
  <GitpodEditorsImage />
</Figure>

Not all customizations covered in this post make sense with all combinations of Git providers and
editors. For example, settings sync between browser-based and desktop-based Gitpod workspaces is
only relevant if you use VS Code as your editor.

## Conclusion

This post covered five ways to customize a Gitpod workspace, focusing on GitHub as the Git provider
and VS Code as the editor. I have used this combination with Gitpod as my primary development
environment for web development for almost two years. I have yet to encounter a scenario where
Gitpod cannot replace my local development environment.

Gitpod covers numerous stacks, three Git providers, and VS Code's main competitor JetBrains, which
no other Gitpod alternative can support. With Gitpod, you can choose the development environment
that works best for you.

_Thanks to [Pauline Narvas](https://twitter.com/paulienuh) from Gitpod and Gitpod Community Hero
[Carsten Lohmann](https://github.com/Derroylo) for their valuable feedback while drafting this
post._
