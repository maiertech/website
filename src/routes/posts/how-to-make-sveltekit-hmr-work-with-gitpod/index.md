---
title: How to make SvelteKit HMR work with Gitpod
author: thilo
published: 2022-01-30
modified: 2022-03-07
description:
  SvelteKit HMR breaks when developing with Gitpod. This posts explains how to
  fix it. The solution applies to any container-based development environment.
category: web-development
tags:
  - sveltekit
---

SvelteKit uses [Vite](https://vitejs.dev/) with
[vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) to
implement hot module replacement (HMR). This ensures that any changes in your
code are reflected instantly in your browser preview, which results in a
pleasant developer experience. HMR in SvelteKit works out of the box with no
configuration required.

## Why HMR on Gitpod is different

Things change when you develop with a cloud workspace such as
[Gitpod](https://www.gitpod.io). If you are not familiar with cloud workspaces,
check out my post
[A better development workflow with disposable workspaces](/posts/a-better-development-workflow-with-disposable-workspaces).
Inside a Gitpod workspace, the SvelteKit development server runs on port 3000
(just like in your local development environment), but you access it via a URL
on the `gitpod.io` domain (using default https port 443). In order to make this
work, Gitpod proxies localhost to the external URL.

While developing a SvelteKit app with Gitpod, I noticed that HMR was broken. It
would trigger indefinite page reloads after firing up the SvelteKit development
server, similar to what is described in
[this GitHub issue](https://github.com/sveltejs/kit/issues/2519). The
[last issue comment](https://github.com/sveltejs/kit/issues/2519#issuecomment-947485636)
points to the solution: you can add a custom Vite configuration to your
`svelte.config.js` and override its default HMR configuration.

The [Vite docs](https://vitejs.dev/config/#server-hmr) explain that

> `clientPort` is an advanced option that overrides the port only on the client
> side, allowing you to serve the websocket on a different port than the client
> code looks for it on. Useful if you're using an SSL proxy in front of your dev
> server.

The idea is that Vite brokers between an external URL (through which you access
the development server) and the development server running on localhost inside
your Gitpod workspace.

## Gitpod workspace URLs

A Gitpod workspace is available at a unique URL (which requires authentication)
with the following format:

```bash
<uuid>.<region>.gitpod.io
```

Every Gitpod workspace sets
[default environment variable `GITPOD_WORKSPACE_URL`](https://www.gitpod.io/docs/environment-variables#default-environment-variables),
which contains the workspace URL.

A development server is not exposed automatically. You need to tell the
workspace which internal port it should expose. If, e.g., your development
server runs at `localhost:3000` you need to add the following configuration to
your `.gitpod.yml`:

```yaml:.gitpod.yml
ports:
    # Expose port 3000.
  - port: 3000

tasks:
    # Install dependencies.
  - init: npm install
    # Run SvelteKit dev server (which uses port 3000).
    command: npm run dev
```

`tasks` defines tasks which Gitpod runs when it initializes the workspace. This
configuration makes the development server available at this URL (which also
requires authentication):

```bash
<port>-<workspace-id>.<region>.gitpod.io
```

Here is an example. I wrote this post on a Gitpod workspace running at

```bash
https://maiertech-maiertech-ti2zaqimh33.ws-us34.gitpod.io/
```

The workspace ID `maiertech-maiertech-ti2zaqimh33` consists of my GitHub
username `maiertech`, an ID derived from the repository name `maier.tech` and a
UUID. With above `.gitpod.yml` configuration, the SvelteKit development server
of this workspace can be reached at

```bash
https://3000-maiertech-maiertech-ti2zaqimh33.ws-us34.gitpod.io/
```

## Adding a Vite HMR configuration

Next, we add a Vite HMR configuration to `svelte.config.js`:

```js:svelte.config.js
...
vite: {
  server: {
    hmr: {
      clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 3000,
      host: process.env.GITPOD_WORKSPACE_URL
        ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-')
        : 'localhost',
    },
  },
},
...
```

We set `clientPort` and `host` depending on whether `GITPOD_WORKSPACE_URL`
exists. This ensures that HMR works on Gitpod but also for anyone running the
SvelteKit site in a local development environment. Even though this custom Vite
configuration is Gitpod specific, you can use the same approach to fix HMR
problems with SvelteKit in any container-based development environment.

## Credits

Thanks to [Mike Nikles](https://twitter.com/mikenikles) from Gitpod for pointing
me in the right direction when I ran into HMR issues with SvelteKit on Gitpod.
Gitpod's website https://gitpod.io/ is written in SvelteKit and
[open source](https://github.com/gitpod-io/website). You can learn a lot from
this repository.
