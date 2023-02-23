---
id: stackblitz-codeflow-beta
title: Is StackBlitz Codeflow Beta ready to replace your local VS Code?
author: thilo
published: 2023-02-02
modified: 2023-02-02
description: StackBlitz Codeflow Beta is a VS Code alternative that runs natively in modern browsers. It is under development and comes with limitations and drawbacks. In this post, I evaluate if Codeflow is ready to be used as a primary development environment.
topics: [dx]
tags: [stackblitz]
---

<script>
  import Image from '$lib/components/image.svelte';
</script>

At ViteConf 2022, StackBlitz launched [Codeflow Beta](https://stackblitz.com/codeflow/beta), a development environment that runs natively in modern browsers. They entered a crowded market for browser-based development environments. [Gitpod](https://www.gitpod.io/), [CodeSandbox](https://codesandbox.io/), and [GitHub Codespaces](https://github.com/features/codespaces) are the better-known players in this space. They all have cloud-based products built with VS Code that aim to replace local development environments.

If you wonder why you should replace your local development environment, I wrote a post that answers this question: [A better development workflow with disposable workspaces](https://maier.tech/posts/a-better-development-workflow-with-disposable-workspaces). In this post, I explained Gitpod's one-workspace-per-task philosophy.

For every new coding task, you fire up a disposable workspace with a new branch created or an existing branch checked out and all dependencies installed. Once you have completed a task, you dispose of the workspace. Codeflow also follows the one-workspace-per-task philosophy. But unlike its cloud-based competitors, it is not a cloud-based offering.

## What is Codeflow?

Codeflow is VS Code running natively in [supported browsers](https://developer.stackblitz.com/platform/webcontainers/browser-support), and its enabling technology is called [Web Containers](https://blog.stackblitz.com/posts/introducing-webcontainers/). Think of WebContainers as a small operating system that runs in a browser and can run Node.js version 16. Web Containers run on [WebAssembly](https://webassembly.org/), a cross-browser virtual machine that many programming languages support as a compilation target.

If your project runs on Node.js, you can work on it with Codeflow. Gitpod, on the other hand, supports any development environment that runs in a [Docker](https://www.docker.com/) container. But I think the Node.js niche is big enough for StackBlitz to have a solid business case for Codeflow.

## Disposable workspaces

You can create a disposable workspace with the shortcut [pr.new](https://pr.new). For instance, to write this post, I logged this issue on GitHub:

```
https://github.com/maiertech/maier.tech/issues/589
```

To fire up a Codeflow workspace for this issue, I prepended the URL with **pr.new** and launched the prepended URL in my browser:

```
https://pr.new/github.com/maiertech/maier.tech/issues/589
```

Codeflow fired up a workspace in my browser on branch `maiertech/issue589` and installed all dependencies.

Prepending URLs with **pr.new** also works for GitHub pull request and branch URLs. The workspace will have the existing branches checked out in these two scenarios.

## GitHub integration

Codeflow comes with a [GitHub integration](https://developer.stackblitz.com/codeflow/integrating-codeflowapp-bot) called codeflowapp, which comments on every pull request. It makes manually prepending GitHub URLs with **pr.new** obsolete because it adds a link to launch a Codeflow workspace as pull request comment:

<figure>
<Image
  ratio={1908/1074}
  alt="The screenshot shows codeflowapp's comment and the button to launch a Codeflow workspace."
  url="https://share.mailbox.org/ajax/share/00346b490b3326750b7a422b332644588c7b6816fdcc8780/1/8/MjM2/MjM2LzMzMA?dl=true"
  loading="lazy" />
<figcaption>In this screenshot, codeflowapp commented on a pull request on GitHub and added a button to launch a Codeflow workspace for a pull request review.</figcaption>
</figure>

## VS Code extensions

Extensions are indispensable for my developer happiness when I work with VS Code. For instance, I use the [Prettier](https://open-vsx.org/extension/esbenp/prettier-vscode) extension in every project. When I work with Svelte, I use [Svelte for VS Code](https://open-vsx.org/extension/svelte/svelte-vscode).

Supporting VS Code extensions in browser-based workspaces is a challenge. Due to licensing restrictions, these workspaces run with [VSCodium](https://vscodium.com/), VS Code's open-source core. But VSCodium ships without support for [Microsoft's marketplace for VS Code extensions](https://marketplace.visualstudio.com/vscode). Codeflow's cloud-based competitors came up with two approaches to support VS Code extensions:

1. Running a cloud workspace in a local VS Code provides access to Microsoft's extensions marketplace without a workaround.
2. Gitpod created an alternative marketplace called [Open VSX Registry](https://open-vsx.org/). Gitpod's browser-based workspaces install VS Code extensions from the alternative marketplace.

Codeflow comes with a selection of popular extensions pre-installed. Launching a workspace will enable project-specific extensions listed in `.vscode/extensions.json`. If an extension is not available in Codeflow, you will see a warning:

<figure>
<Image
  ratio={890/192}
  alt="Screenshot from Codeflow showing a warning message that says that the Thunder Client and Grammarly extensions are not supported."
  url="https://share.mailbox.org/ajax/share/0dfaa6450b87ae73d79692eb87ae459b8043f6a5943d4c7a/1/8/MjM2/MjM2LzMzNQ?dl=true"
  loading="lazy" />
<figcaption> You are out of luck when a project requires extensions not pre-installed in Codeflow.</figcaption>
</figure>

## Settings sync

Codeflow supports settings sync for VS Code user settings. You can customize a workspace with user settings, and Codeflow will apply these settings to every workspace it launches. Note that Codeflow has a custom synchronization provider, i.e., it cannot sync with the settings you already have in your local VS Code (which syncs with a GitHub or Microsoft account).

## Package managers

When you run `npm` in a Codeflow workspace, you run StackBlitz's [Turbo](https://developer.stackblitz.com/platform/webcontainers/turbo-package-manager#frontmatter-title) package manager (not to be confused with [Turbopack](https://turbo.build/pack) and [Turborepo](https://turbo.build/repo)). Turbo supports only a subset of NPM commands; e.g., it does not support `npm outdated`. According to StackBlitz, Codeflow will eventually support the full NPM CLI. Until then, Codeflow fully supports NPM alternatives [pnpm](https://pnpm.io/) and [Yarn](https://yarnpkg.com/). And [Turborepo](https://github.com/stackblitz/core/issues/1814#issuecomment-1374835721) if you work with a monorepo.

## Codeflow Beta caveats

Codeflow is in beta; therefore, you should expect bugs and rough edges:

- The [FAQ](https://developer.stackblitz.com/codeflow/codeflow-faq) states that the code does not persist between sessions, and you will lose your code if you reload or close the browser tab. To prevent this, commit and push to the origin often.

- During my tests with Codeflow, I encountered various bugs, e.g., the Prettier extension would not work, Codeflow would not apply my user settings, or Codeflow would not recognize the GitHub repository it just cloned.

- It is impossible to store secrets as environment variables. If you need a secret, such as an API key, you must rely on `.env` files during development.

## Conclusion

Codeflow Beta is a significant milestone towards disposable workspaces that run natively in browsers. But it has several drawbacks, e.g., limited VS Code extensions and support for Node projects only.

If you already use one of Codeflow's competitors and it works for you, it is hard to argue why you should trade in something battle-tested for a bleeding-edge workspace with fewer features. I see the appeal of using WebContainers to run a development environment. But StackBlitz has yet to find convincing use cases where Codeflow outperforms its cloud competitors. Keep an eye on Codeflow and take it for a spin once it is out of beta.
