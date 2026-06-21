---
title: Why PNPM broke my website to prevent credential leakage
author: thilo
publishedDate: 2026-06-21
description:
  PNPM v11.5.3 stopped expanding env vars in repository .npmrc files to block credential theft.
  Here's how to authenticate with private registries now.
tags:
  - tooling
  - pnpm
---

Last week, I wanted to make a quick update to this website only to find out that my deployment
pipeline was broken. After some troubleshooting, it turned out that PNPM v11.5.3 introduced a
breaking change affecting anyone with a custom registry string with `_authToken` in their `.npmrc`
file.

## The issue with .npmrc files

My repository `.npmrc` file looked like this:

```bash
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

When running `pnpm install`, PNPM would replace `${NODE_AUTH_TOKEN}` with the value of the
`NODE_AUTH_TOKEN` environment variable (referred to as environment variable expansion). This has
been the standard approach to authenticate to private NPM registries since basically forever.

In response to a number of NPM package supply chain attacks in recent weeks, the PNPM team has
stepped up their game with v11 to
[mitigate common supply chain attacks](https://pnpm.io/supply-chain-security). As part of these
efforts, PNPM explained in a recent post
[why PNPM no longer expands environment variables in a repository's `.npmrc`](https://pnpm.io/blog/2026/06/11/env-variables-in-repository-npmrc).
Their post explains how an attacker could exfiltrate my `NODE_AUTH_TOKEN` when I clone a repository
under their control that contains an `.npmrc`, which triggers PNPM to read my `NODE_AUTH_TOKEN` and
send it straight to the attacker.

That's why PNPM v11.5.3 pulled the emergency brake on environment variable expansion in repository
`.npmrc` files. The consequence was a breaking change that broke package installations from private
registries locally and in cloud deploy pipelines.

## Alternative authentication

So, how can I authenticate with PNPM to a private NPM registry? Let's focus on local development
first. As a first step, I removed my project `.npmrc` and the global `~/.npmrc`. That's technically
not necessary since the [PNPM authentication settings page](https://pnpm.io/npmrc) lists options
that include using `.npmrc` files. But they are meant as fallbacks to make the transition to the new
way of authenticating with private registries easier.

I decided to go the PNPM route for local development. Therefore, I added my private registry to a
workspace `pnpm-workspace.yaml` file:

```yaml
registries:
  '@maiertech': https://npm.pkg.github.com/
```

It basically instructs PNPM to install packages scoped to `@maiertech` from the GitHub registry. But
there is no authentication configuration in this file. Instead, the authentication token goes into
my global PNPM config (`~/Library/Preferences/pnpm/auth.ini`) using this command:

```bash
pnpm config set //npm.pkg.github.com/:_authToken "TOKEN"
```

Note that PNPM always combines the repository config in `pnpm-workspace.yaml` with the global
config. When you run `pnpm config list` from within your repository workspace, you will see the
combined config.

Now you can install packages from the private NPM registry locally. But how do you authenticate to
the package registry when you deploy your website? The short answer is: you need to make sure that
the authentication config is in place before installing packages. There are different ways to
achieve this.

## Example: GitHub Actions

In a GitHub Action, you can tweak the action that configures Node:

```yaml
- uses: actions/setup-node@v5
  with:
    node-version: 'lts/*'
    registry-url: 'https://npm.pkg.github.com'
    cache: 'pnpm'
```

This results in a global `.npmrc` file with `_authToken=${NODE_AUTH_TOKEN}`. In this case, PNPM will
expand the `NODE_AUTH_TOKEN` environment variable because the `.npmrc` file is not part of your
repository. All you have to do in your GitHub Action is set environment variable `NODE_AUTH_TOKEN`
to `secrets.GITHUB_TOKEN`. If you use a registry other than GitHub, set `NODE_AUTH_TOKEN` to that
registry's token.

## Example: Deployment to Railway

I deploy my website to [Railway](https://railway.com/) using [Railpack](https://railpack.com/),
which handles the Docker image build and deployment. Luckily, Railpack allows me to add a
`railpack.json` to my project with which I can add the `pnpm config set` command to the `install`
step:

```json
{
	"$schema": "https://schema.railpack.com",
	"steps": {
		"install": {
			"commands": ["pnpm config set //npm.pkg.github.com/:_authToken $GITHUB_TOKEN", "..."]
		}
	}
}
```

All I had to do to make this work was configure a `GITHUB_TOKEN` environment variable with
`read:packages` permission (classic token) in my Railway project.

Both examples give you an idea of what you need to do in your specific situation: figure out the
best way to put the authentication configuration in place before running `pnpm install`.
