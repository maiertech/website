---
title: Why PNPM broke my website to prevent credential leakage
author: thilo
publishedDate: 2026-06-21
description: TODO
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
efforts, PNPM explained in a recent post,
[why PNPM no longer expands environment variables in a repository's `.npmrc`](https://pnpm.io/blog/2026/06/11/env-variables-in-repository-npmrc).
Their posts explains a way how an attacker could exfiltrate my `NODE_AUTH_TOKEN` when I clone a
repository under their control that contains an `.npmrc`, which triggers PNPM to read my
`NODE_AUTH_TOKEN` and send it straight to the attacker.

That's why PNPM v11.5.3 pulled the emergency break on environment variable expansion in repository
`.npmrc` files. The consequence was a breaking change that broke package installations from private
registries locally and in cloud deploy pipelines.

## Alternative authentication

So, how can I authenticate with PNPM to a private NPM registry? Let's focus on local development
first. As a first step, I removed my project `.npmrc` the global `~/.npmrc`. That's technically not
necessary since the [PNPM authentication settings page](https://pnpm.io/npmrc) lists options that
include using `.npmrc` files. But they are meant as fallbacks to make the transition to the new way
of authenticating with private registries easier.

I decided to go the PNPM route. Therefore, I added my private registry to a workspace
`pnpm-workspace.yaml` file:

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

Now you can install packages from the private NPM registry locally. But how to you authenticate to
the package registry when you deploy your website?

The short answer is: you run the above `pnpm config set` command before installing packages. How you
can run this command depends on where you run CI or to which provider you deploy your website.

In GitHub Action, you run the `pnpm config set` command before `pnpm i`:

```yaml
- run: pnpm config set //npm.pkg.github.com/:_authToken "${{ secrets.GITHUB_TOKEN }}"
- run: pnpm i --frozen-lockfile
```

In this example, I use the auto-generated `GITHUB_TOKEN`, which is augmented with a `packages: read`
permission. If you use a registry other then GitHub you can configure the authentication token just
like any other GitHub Action secret.

I deploy my website to [Railway](https://railway.com/) using [Railpack](https://railpack.com/),
which handles the Docker image build and deployment automatically. Luckily, Railpack allows me to
add a `railpack.json` to my project with which I can add the `pnpm config set` command to the
`install` step:

```json
{
	"$schema": "https://schema.railpack.com",
	"steps": {
		"install": {
			"commands": ["pnpm config set //npm.pkg.github.com/:_authToken $GITHUB_TOKEN"]
		}
	}
}
```

All I had to do to make this work, was configure a `GITHUB_TOKEN` environment variable in my Railway
project with `read:packages` permission (classic token).

Both examples give you an idea of what you need to do in your situation: figure out how and when you
can run the `pnpm config set` command before you run `pnpm install`.
