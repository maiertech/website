---
title: 'Move your IDE to the cloud: introduction to GitHub Codespaces'
author: thilo
published: 2021-01-03
modified: 2022-06-28
description: In this introduction to GitHub Codespaces you will learn how to run VS Code in the cloud and how to spin up a zero-configuration development environment.
topics: [dx]
tags: [github, vscode]
links:
  - title: A Gentle Introduction to Using a Docker Container as a Dev Environment (CSS-Tricks)
    href: https://css-tricks.com/a-gentle-introduction-to-using-a-docker-container-as-a-dev-environment/
  - title: Developing inside a Container (VS Code docs)
    href: https://code.visualstudio.com/docs/remote/containers
  - title: Welcome to Codespaces (YouTube)
    href: https://www.youtube.com/watch?v=j5VQ8OlwbqI
  - title: 'GitHub Codespaces: beyond the basics (YouTube)'
    href: https://www.youtube.com/watch?v=AphLm35cXHo
---

[GitHub](https://github.com/) launched [Codespaces](https://github.com/features/codespaces) in limited public beta at [GitHub Satellite 2020](https://github.blog/2020-05-06-new-from-satellite-2020-github-codespaces-github-discussions-securing-code-in-private-repositories-and-more/). Codespaces come with the promise of lowering the barrier to contributing to GitHub repositories. It would be a huge win if contributors (or co-workers) could spin up an instance of VS Code in a browser with all required plugins and configurations in place, fully ready for their first commit. What previously might have taken several hours to several days, would now be reduced to just a few minutes, which is the time it takes to spin up a development container.

I have been using GitHub Codespaces for both work and side projects over the past few months. There were some rough edges, but overall Codespaces did not disappoint. In this post, I will explain the underlying technology and discuss the impact of Codespaces on making contributions to GitHub repositories so much easier.

## Save your development environment to your GitHub repository

The idea of Codespaces is simple: configure a [Docker](https://www.docker.com/) container and add VS Code configurations and plugins to this container. Then add the corresponding configuration files to your GitHub repository. Anyone can now run a pre-configured development container (with the repository cloned inside) in their browser or a locally installed VS Code.

You do not have to be a Docker expert to use Codespaces. The [vscode-dev-containers](https://github.com/microsoft/vscode-dev-containers) repository is a collection of Docker images for common technology stacks. E.g., there is a [javascript-node](https://github.com/microsoft/vscode-dev-containers/tree/master/containers/javascript-node) image that comes with [Node.js](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/lang/en/) installed. You can check what stacks are available in the [containers](https://github.com/microsoft/vscode-dev-containers/tree/master/containers) directory, which contains a sub-directory for each image with a `README.md` and a `.devcontainer` sub-directory that contains the following files:

- `base.Dockerfile`: Dockerfile from which an image for the [Microsoft Container Registry (MCR)](https://github.com/microsoft/containerregistry) has been created.
- `Dockerfile`: a Dockerfile that is used to spin up a development container. It contains the link to the MCR image.
- `devcontainer.json`: a configuration file to customize VS Code when it runs in the container.

To use a container from the vscode-dev-containers repository for your repository, copy `Dockerfile` and `devcontainer.json` into directory `.devcontainer`. If you need to customize the Docker image you can modify `Dockerfile`, which contains comments with pointers on how to customize it. A common use case for customization is installing additional Linux packages. If you do not need to customize the Docker image, you can delete `Dockerfile` and instead reference the Docker image in `devcontainer.json`.

Let’s look at the [`devcontainer.json` of the GitHub repository for this website](https://github.com/maiertech/maier.tech/blob/main/.devcontainer/devcontainer.json):

```json:.devcontainer/devcontainer.json
{
  "name": "Next.js on javascript-node:14",
  "image": "mcr.microsoft.com/vscode/devcontainers/javascript-node:14",
  "settings": {
    "terminal.integrated.profiles.linux": {
      "bash": {
        "path": "/bin/bash"
      }
    },
    "terminal.integrated.defaultProfile.linux": "bash"
  },
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],
  "forwardPorts": [3000],
  "postCreateCommand": "npm i",
  "remoteUser": "node"
}
```

In this example, the `image` property references a Docker image on MCR. The `settings` property contains [settings for VS Code](https://code.visualstudio.com/docs/getstarted/settings), in this case, the shell is configured as Bash. The `extensions` property contains IDs of VS Code extensions that should be installed into the container. `postCreateCommand` runs `npm i` to install dependencies. Check out the [devcontainer.json reference](https://code.visualstudio.com/docs/remote/devcontainerjson-reference) for a full list of properties.

## Launch your development environment anywhere

Once you have committed directory `.devcontainer`, your repository is ready for Codespaces. Go to [github.com/codespaces](https://github.com/codespaces) and select your repository and a branch, usually `main` (if you do not have access to Codespaces yet, you can apply [here](https://github.com/features/codespaces) for the beta). This spins up a development container on GitHub’s cloud and launches a fully configured VS Code instance in the browser that connects to the container. At this point, you are ready to make a commit. This works on any machine that runs a modern browser, including [Chromebooks](https://www.google.com/chromebook/).

If you prefer working in your locally installed VS Code, install the [GitHub Codespaces extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) and connect to any of your Codespaces or launch a new one. Your development container runs in the cloud, but it feels like developing locally. Since all the heavy lifting is done in the cloud, even an underpowered Macbook Air makes for an excellent development machine.

## Local development with containers

Codespaces spins up a Docker container from the configuration files added to your repository. You can use the same configuration files to spin up a development container on your machine and tell VS Code to use that container for development.

First, you have to install [Docker Desktop](https://www.docker.com/products/docker-desktop) (`brew install docker` on Mac). Then you need to install the following two VS Code extensions:

1. The [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) helps you manage Docker images.
1. The [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) makes it easy to clone a GitHub repository inside a container launched from the configuration files inside that repository and connect to it.

I need to point out that running Docker Desktop is resource-intensive and not a good idea if your machine is resource-stingy. But if you have a powerful enough machine, running containers locally is a great alternative to setting up a local development environment.

## Containers lower the barrier to contributing

In my opinion, getting up and running fast when you are supposed to contribute to a project as a developer is widely underappreciated. All too often teams accept that spending hours or days configuring a development environment is inevitable. Fiddling with a development environment is often not even a one-off, but a recurring issue because things break or get outdated and need to be fixed manually by every team member.

Incomplete instructions on how to install a development environment are a sure way to frustrate new team members. They are often under pressure to contribute quickly, yet they have to figure out by themselves how to get to the point where they can contribute. GitHub Codespaces and developing with containers does away with all this nonsense.

This is also great news for open source projects because submitting a pull request can now be as easy as spinning up a Codespaces container, making a fix and submitting a pull request in just a few minutes. But there is another aspect of Codespaces that is important for open source: they make contributing to open source accessible to more developers because owning powerful hardware to code matters less. As long as your machine runs a modern browser you can have access to a powerful development container.

Finally, I would like to emphasize that GitHub Codespaces is a commercial product. Once it will be out of beta, GitHub will [start charging for Codespaces](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/about-billing-for-codespaces). We all know that the moment you spin up a container in the cloud there is a price tag attached to it because it consumes hardware and power. Therefore, we should not expect Codespaces to be a gratis product. But I think GitHub needs to ensure that there is some mechanism in place to make Codespaces affordable because we do not want to miss out on all the contributions to open source by developers with limited hardware and financial resources.
