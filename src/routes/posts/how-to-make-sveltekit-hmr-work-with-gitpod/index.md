---
title: How to make SvelteKit HMR work with Gitpod
author: thilo
date: 2022-01-30
updated: 2022-01-30
description:
  SvelteKit HMR breaks when developing with Gitpod. This posts explains how to
  fix it. The solution applies to any container-based development environment.
category: transitional-apps
tags:
  - sveltekit
---

<script context="module">
  export const prerender = true;
</script>

SvelteKit uses [Vite](https://vitejs.dev/) with
[vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) to
implement hot module replacement (HMR). This ensures that any changes in your
code are reflected instantly in your browser preview, which results in a
pleasant developer experience. HMR in SvelteKit works out of the box with no
configuration required.

Things change when you develop with a cloud workspace such as
[Gitpod](https://www.gitpod.io). If you are not familiar with cloud workspaces,
check out my post
[A better development workflow with disposable workspaces](https://maier.tech/posts/a-better-development-workflow-with-disposable-workspaces).
Inside a Gitpod workspace, the SvelteKit development server runs on port 3000
(just like in your local development environment), but you access it via a
public URL on the `gitpod.io` domain (using default https port 443). For this to
work Gitpod proxies localhost to the external URL.

While developing a SvelteKit app with Gitpod, I noticed that HMR was broken. It
would trigger indefinite page reloads after firing up the SvelteKit development
server, similar to what is described in
[this GitHub issue](https://github.com/sveltejs/kit/issues/2519). The
[last issue comment](https://github.com/sveltejs/kit/issues/2519#issuecomment-947485636)
points to the solution. You can add a custom Vite configuration to your
`svelte.config.js` and override its default HMR configuration using
`server.hmr.clientPort`:

```js:svelte.config.js
...
vite: {
  server: {
    hmr: {
      clientPort: 443,
    },
  },
},
...
```

The [Vite docs](https://vitejs.dev/config/#server-hmr) explain that

> `clientPort` is an advanced option that overrides the port only on the client
> side, allowing you to serve the websocket on a different port than the client
> code looks for it on. Useful if you're using an SSL proxy in front of your dev
> server.

The idea is that Vite brokers between Gitpod's external URL (through which you
access the development server) and the development server running on localhost
inside your Gitpod workspace.

Using a custom Vite configuration with `clientPort` is not enough to make HMR
work on Gitpod. You need to tell Vite the actual URL from which the preview is
served. This can be achieved with two configuration changes. The first one is in
`.gitpod.yml`:

```yaml:.gitpod.yml
...
tasks:
  - init: npm install
    command: |
      export HMR_HOST=`gp url 3000`
      npm run dev
...
```

`tasks` defines tasks which Gitpod runs when it initializes the workspace. Above
configuration defines environment variable `HMR_HOST`, which contains the
external URL at which the preview is served. `gp` is a utility available inside
all Gitpod workspaces.

The second configuration change is fixing the Vite configuration in
`svelte.config.js`:

```js:svelte.config.js
...
vite: {
  server: {
    hmr: {
      clientPort: process.env.HMR_HOST ? 443 : 3000,
      host: process.env.HMR_HOST
        ? process.env.HMR_HOST.substring('https://'.length)
        : 'localhost',
    },
  },
},
...
```

We set `clientPort` and `host` depending on whether `HMR_HOST` exists. This
ensures that HMR works on Gitpod but also for anyone running the SvelteKit site
in a local development environment. Even though this custom Vite configuration
is Gitpod specific, you can use the same approach to fix HMR problems with
SvelteKit in any container-based development environment.

Thanks to [Mike Nikles](https://twitter.com/mikenikles) from Gitpod for pointing
me in the right direction when I ran into HMR issues with SvelteKit on Gitpod.
Gitpod's website https://gitpod.io/ is written in SvelteKit and
[open source](https://github.com/gitpod-io/website). Check out their codebase.
You can learn a ton.
