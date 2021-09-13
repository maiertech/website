---
title: How to brace for a GitHub Codespaces outage
author: thilo
date: 2021-04-04
description:
  When you adopt GitHub Codespaces you should ensure that an outage does not
  grind your development workflow to a halt. This post explains how.
category: creating
tags:
  - tooling
---

In my post
[Move your IDE to the cloud: introduction to GitHub Codespaces](/posts/introduction-to-github-codespaces)
I described the benefits of developing with
[GitHub Codespaces](https://github.com/features/codespaces) as an alternative to
a local development environment. I mentioned in this post that I had occasional
issues with Codespaces and was unable to develop for a few hours or in one
instance for an entire weekend. As frustrating as this may be, I do not expect a
service that is in beta and free of charge to be perfect. But I decided to brace
for future Codespaces outages to ensure that my development workflow does not
grind to a halt.

## Plan B: Use Docker Desktop as Codespaces alternative

In my post mentioned above I explain that Codespaces are Docker containers that
can be run locally. To make this work, you need to install

1. [Docker Desktop](https://www.docker.com/products/docker-desktop),
1. VS Code
   [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
   and
1. VS Code
   [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

If you keep these three around on your development machine, you can spin up a
development container from VS Code’s remote explorer (using Docker Desktop in
the background) with your GitHub repository cloned inside. You should be up and
running on your local machine in a few minutes.

## Plan C: Homebrew

If Docker Desktop does not work for you, you can try setting up a minimal local
development environment with [Homebrew](https://brew.sh/). Homebrew lets you
install and update your development tools, such as [Git](https://git-scm.com/),
[Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) with minimal
overhead. This works on macOS, Linux and Windows Subsystem for Linux. If you do
not sync your VS Code extensions, you need to install extensions defined in
`devcontainer.json` (under the `extensions` property) manually.

The goal of plan C is not a full replication of your development container, but
to install the minimums required to continue developing locally while GitHub
Codespaces is out. The Homebrew approach works for many projects, but not for
all. For instance, if your project requires a specific version of Node, plan C
won’t help because Homebrew gives you the latest stable version only. You would
have to install additional tools, such as [n](https://github.com/tj/n), to
manage different Node versions. And before you know you would end up installing
a complete local development environment, which is not the goal of plan C.

## How to report issues to the Codespaces Team

If plan C is also not an option in your specific scenario, your best bet is to
report whatever issue prevents you from using GitHub Codespaces and hope that it
will get fixed fast. Hop over to
[Codespaces Feedback](https://github.com/github/feedback/discussions/categories/codespaces-feedback),
check for known issues and open a new issue if needed. The Codespaces team keeps
an eye on Codespaces Feedback, and the sooner they are aware of an issue, the
sooner they can fix it.
