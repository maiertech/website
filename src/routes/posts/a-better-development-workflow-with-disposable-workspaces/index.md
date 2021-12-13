---
title: A better development workflow with disposable workspaces
author: thilo
date: 2021-12-12
updated: 2021-12-12
description:
  Disposable workspaces with Gitpod and GitHub Codespaces enable a new
  development workflow which eliminates the friction of local development.
category: developer-tools
tags:
  - github
  - vscode
links:
  - title:
      Modern Web Podcast - Software Development in the Cloud with Mike Nikles &
      Geoffrey Huntley
    href: https://modernweb.podbean.com/e/s09e03-modern-web-podcast-development-in-the-cloud-with-mike-nikles-geoffrey-huntley/
---

<script context="module">
  export const prerender = true;
</script>

In my post
[Move your IDE to the cloud: introduction to GitHub Codespaces](/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces)
I was bullish about moving my local development environment to the cloud. During
the [GitHub Codespaces](https://github.com/features/codespaces/) beta, I was
able to run VS Code instances (referred to as workspaces) in the cloud as my
main development environment for several months. Even though my experience with
cloud workspaces was positive, I initially switched back to local development.
Using cloud workspaces felt like local development (which is a big achievement),
but they did not eliminate the pain points of local development.

## Moving workspaces to the cloud is not enough

In local development you normally clone a repository once. When working on
different branches, you switch context by switching branches and updating
dependencies. When you work on multiple issues in parallel, switching between
branches causes a lot of friction. Every time you switch branches, you need to
update your dependencies. This is a pain point for local development.

The early Codespaces beta had a
[limit of two workspaces](https://github.community/t/max-number-of-codespaces-during-beta/134984).
When switching between projects, I found myself deleting and creating workspaces
frequently to work around the limited number of workspaces. Every new workspace
came with a wait time until it was ready to use. And once a workspace was up and
running, I used it for multiple tasks, just like a local workspace, frequently
switching branches and updating dependencies. The perceived added value of a
cloud workspace was marginal.

## Making workspaces disposable

[Gitpod](https://www.gitpod.io/) is an alternative to Codespaces and a
comparatively small player in this field. Their product actually
[precedes Codespaces](https://www.freecodecamp.org/news/github-codespaces-vs-gitpod-cloud-based-dev-environments/).
Gitpod turns cloud workspaces into a disposable commodity with their
[_one workspace per task approach_](https://www.gitpod.io/docs/workspaces/).
This is a radical departure from _one workspace for many tasks_, which is the
default for local development.

With Gitpod's approach you can be wasteful with workspaces. For every issue you
work on and every pull request you review, you create a new fresh cloud
workspace. The technical prerequisite is that you can configure your workspace
as code and add the configuration to your repository. This is done with a
[`.gitpod.yml`](https://www.gitpod.io/docs/configure) file, which contains
information such as

- init task (e.g. run `npm install`),
- install project-specific VS Code extensions,
- expose ports and
- configure environment variables.

Once your workspace is up and running, you are ready to code. No need to install
dependencies (if you let Gitpod install them for you during the init task). The
idea is that you start coding in no time and once you have created a pull
request, you dispose of your workspace. If you need to make changes after a pull
request review, simply create a new workspace.

Sounds good in theory. But in practice it can take long to create a workspace if
your init task takes long. A command like `npm install` may run faster in the
cloud, but probably not fast enough to make the wait for your new workspace feel
short. No developer will put up with long wait times in their workflow.

## How to make disposable workspaces viable

Configuring a workspace in code is not a unique feature of Gitpod. Codespaces
can do the same with a
[different configuration syntax](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-project-for-codespaces).
GitHub has also removed the two workspaces limit for Codespaces, which addresses
the pain points I described earlier. But what sets Gitpod apart are two features
that make creating new workspaces fast and easy:

- [Prebuilds](https://www.gitpod.io/docs/prebuilds): Instead of running the init
  task for a workspace when you actually launch a new workspace, Gitpod runs it
  whenever you push to your repository (you have full control over when, e.g.
  for every push to the main branch and every pull request). Chances are that by
  the time you actually want to launch a new workspace the init task has
  completed already and workspace initialization feels instant.
- [Browser extension](https://www.gitpod.io/docs/browser-extension): Gitpod's
  browser extension turns repository pages of [GitHub](https://github.com/),
  [GitLab](https://about.gitlab.com/) and [Bitbucket](https://bitbucket.org/)
  into a dashboard from which you can conveniently launch new workspaces. Let's
  say you want to work on an issue. You navigate to the issue page, assign the
  issue to yourself and then launch a workspace. The workspace launches with an
  issue branch created and is up and running almost instantly. This is possible
  because it is based on a prebuild for the commit from which the issue branch
  has been branched off. There is no need to create a new branch or update
  dependencies in your new workspace, it is all done for you.

Combining prebuilds and the browser extension and adopting a _one task per
workspace_ mindset, enables a great development workflow which treats workspaces
as a disposable commodity. They can be created and disposed of with minimal
overhead. You can have multiple workspaces for different tasks for the same
repository. Rather than switching between branches, you switch between
workspaces.

I would like to point out that GitHub Codespaces is going in the exact same
direction as Gitpod, but
[it currently does not support prebuilds](https://docs.github.com/en/enterprise-cloud@latest/codespaces/customizing-your-codespace/prebuilding-codespaces-for-your-project)
and lacks the ability to create workspaces from issues and pull requests on a
repository's GitHub page. Another downside of Codespaces is that it does not
support GitHub's competitors GitLab and Bitbucket.

## Should individual developers use Gitpod or Codespaces?

Gitpod has a free plan which includes 50 hours per month. This is good enough
for occasional side projects, but nowhere near what you need when using Gitpod
full-time. This means that you would need to consider a
[paid plan](https://www.gitpod.io/pricing). But this triggers the question
whether you want to pay for cloud workspaces when you can do unlimited local
development on your laptop.

When GitHub announced Codespaces availability in August 2021, they made them
[available for Teams and Enterprise plans only](https://github.blog/2021-08-11-githubs-engineering-team-moved-codespaces/).
There is no path for individuals to access Codespaces other than
[signing up for the beta](https://github.com/features/codespaces/signup) or
joining a team with access to Codespaces. Individuals that are part of the beta
can use Codespaces
[free of charge](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-codespaces).
You should sign up for the Codespaces beta, even though there is no guarantee
that you will get access and even though Codespaces does not have Gitpod's
polish yet.

Gitpod and Codespaces make it possible to develop inside a browser on
Chromebooks, iPads and pretty much any device that runs a modern browser. This
is a big deal, but it comes with a price tag. On the other hand, there is
nothing wrong with local development, but you are missing out on a cool new
workflow that you cannot replicate locally.

Last, but not least, I would also like to point out that Gitpod and Codespaces
can be affected by outages. I wrote a post
[How to brace for a GitHub Codespaces outage](https://maier.tech/posts/how-to-brace-for-a-github-codespaces-outage)
in which I discuss what your plan B and plan C could be if you develop in the
cloud. But since outages are not that frequent (see
[Gitpod Status](https://www.gitpodstatus.com/) and
[GitHub Status](https://www.gitpodstatus.com/)), I would not worry too much
about them.
