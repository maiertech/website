---
title: A better development workflow with disposable workspaces
author: thilo
publishedDate: 2021-12-12
description:
  Cloud dev workspaces like Gitpod and Codespaces enable fast, disposable environments for each
  task, improving workflow over traditional local setups.
tags:
  - productivity
  - github
---

In my post
[Move your IDE to the cloud: introduction to GitHub Codespaces](/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces),
I was optimistic about moving my local development environment to the cloud. During the
[GitHub Codespaces](https://github.com/features/codespaces/) beta, I was able to run VS Code
instances (referred to as workspaces) in the cloud as my primary development environment for several
months. Even though my experience with cloud workspaces was positive, I initially switched back to
local development. Using cloud workspaces felt like local development (which is a significant
achievement), but it did not eliminate the pain points of local development.

## Moving workspaces to the cloud is not enough

In local development, you usually clone a repository once. When working on different branches, you
switch context by switching branches and updating dependencies. When you work on multiple issues in
parallel, switching between branches causes a lot of friction. Every time you switch branches, you
need to update your dependencies—a pain point for local development.

The early Codespaces beta had a
[limit of two workspaces](https://github.community/t/max-number-of-codespaces-during-beta/134984).
When switching between projects, I deleted and created workspaces frequently to work around the
limited number of workspaces. Every new workspace came with a wait time until it was ready to use.
Once a workspace was up and running, I used it for multiple tasks, just like a local workspace,
frequently switching branches and updating dependencies. The perceived added value of a cloud
workspace was marginal.

## Making workspaces disposable

[Gitpod](https://www.gitpod.io/) is an alternative to Codespaces and a comparatively small player in
this field. Their product
[precedes Codespaces](https://www.freecodecamp.org/news/github-codespaces-vs-gitpod-cloud-based-dev-environments/).
Gitpod turns cloud workspaces into a disposable commodity with their
[_one workspace per task approach_](https://www.gitpod.io/docs/workspaces/). This is a radical
departure from the _one workspace for many tasks_ model, which is the default for local development.

With Gitpod's approach, you can be wasteful with workspaces. You create a new, fresh cloud workspace
for every issue you work on and every pull request you review. The technical prerequisite is
configuring your workspace as code and adding the configuration to your repository. This is done
with a [`.gitpod.yml`](https://www.gitpod.io/docs/configure) file, which contains information such
as

- init task (e.g., run `npm install`),
- install project-specific VS Code extensions,
- expose ports, and
- configure environment variables.

Once your workspace is up and running, you are ready to code. There is no need to install
dependencies (if you let Gitpod install them for you during the init task). You start coding in no
time, and once you have created a pull request, you dispose of your workspace. Create a new
workspace if you need to make changes after a pull request review.

It sounds good in theory, but in practice, it can take longer to create a workspace if your init
task takes a long time. A command like `npm install` may run faster in the cloud, but probably not
fast enough to make the wait for your new workspace feel short. No developer will put up with long
wait times in their workflow.

## How to make disposable workspaces viable

Configuring a workspace in code is not a unique feature of Gitpod; Codespaces can do the same with a
[different configuration syntax](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-project-for-codespaces).
GitHub has also removed the two-workspace limit for Codespaces, which addresses the pain points I
described earlier. But what sets Gitpod apart are two features that make creating new workspaces
fast and easy:

- [Prebuilds](https://www.gitpod.io/docs/prebuilds): Instead of running the init task for a
  workspace when you launch a new workspace, Gitpod runs it whenever you push to your repository
  (you have complete control over when, e.g., for every push to the main branch and every pull
  request). Chances are that the init task has been completed by the time you want to launch a new
  workspace, and workspace initialization feels instant.
- [Browser extension](https://www.gitpod.io/docs/browser-extension): Gitpod's browser extension
  turns repository pages of GitHub, GitLab, and Bitbucket into a dashboard from which you can
  conveniently launch new workspaces. Let's say you want to work on an issue. You navigate to the
  issue page, assign the issue to yourself, and then launch a workspace. The workspace launches with
  an issue branch created and is up and running almost instantly. This is possible because of a
  prebuild for the commit from which the issue branch was branched off. There is no need to create a
  new branch or update dependencies in your new workspace; it is all done for you.

Combining prebuilds and the browser extension, and adopting a _one task per workspace_ mindset,
enables a great development workflow that treats workspaces as disposable commodities. They can be
created and disposed of with minimal overhead. You can have multiple workspaces for different tasks
for the same repository. Rather than switching between branches, you switch between workspaces.

I want to point out that GitHub Codespaces is going in the same direction as Gitpod, but it
currently does not support
[prebuilds](https://docs.github.com/en/enterprise-cloud@latest/codespaces/customizing-your-codespace/prebuilding-codespaces-for-your-project)
and cannot create workspaces from issues and pull requests on a repository's GitHub page. Another
downside of Codespaces is that it does not support GitHub's competitors, GitLab and Bitbucket.

## Should individual developers use Gitpod or Codespaces?

Gitpod has a free plan, which includes 50 hours per month. This is good enough for occasional side
projects but nowhere near what you need when using Gitpod full-time. In this case, you have to
consider a [paid plan](https://www.gitpod.io/pricing). Personal accounts on GitHub include a
[more generous free tier for Codespaces usage](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces).
But eventually, you will have to pay. This triggers the question of whether you want to pay for
cloud workspaces when you can do unlimited local development on your laptop.

Gitpod and Codespaces make it possible to develop inside a browser on Chromebooks, iPads, and pretty
much any device that runs a modern browser. This is a big deal, but it comes with a price tag. On
the other hand, there is nothing wrong with local development, but you are missing out on a
fantastic new workflow that you cannot replicate locally.
