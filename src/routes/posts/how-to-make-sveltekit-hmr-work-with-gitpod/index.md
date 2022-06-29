---
title: How to make SvelteKit HMR work with Gitpod
author: thilo
published: 2022-01-30
modified: 2022-06-28
description:
  SvelteKit HMR breaks when developing with a Gitpod workspace inside a browser.
  This post explains how to fix this.
topics: [svelte, dx]
tags: [gitpod, sveltekit]
---

SvelteKit uses [Vite](https://vitejs.dev/) with
[vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) to
implement hot module replacement (HMR). HMR ensures that any changes in your
code are reflected instantly in your browser preview, which results in a
pleasant developer experience. HMR in SvelteKit works out of the box with no
configuration required.

## Why HMR on Gitpod is different

Things change when you develop with a cloud workspace such as
[Gitpod](https://www.gitpod.io). If you are not familiar with cloud workspaces,
check out my post
[A better development workflow with disposable workspaces](/posts/a-better-development-workflow-with-disposable-workspaces).
Inside a Gitpod workspace, the SvelteKit development server runs on port 3000,
just like in your local development environment. How you access the development
server depends on how you access your Gitpod workspace:

- When you access your Gitpod workspace **from within a browser**, you access
  the development server via a URL on the `gitpod.io` domain (using default
  https port 443). To make this work, Gitpod proxies `localhost` to the external
  URL.
- When you access your Gitpod workspace **from VS Code via SSH**, VS Code
  proxies the development server to `localhost`. You work with your Gitpod
  workspace as if it was a local development environment.

While developing a SvelteKit app with Gitpod inside a browser, I noticed that
HMR was broken. It would trigger indefinite page reloads after firing up the
SvelteKit development server, similar to what is described in
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
which contains the unique workspace URL.

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

`tasks` defines tasks that Gitpod runs when it initializes the workspace. This
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
UUID. With the above `.gitpod.yml` configuration, the SvelteKit development
server of this workspace can be reached at

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
exists. This ensures that HMR works when running your Gitpod workspace inside a
browser, but also for anyone running the SvelteKit site in a local development
environment.

There is a catch with this custom Vite configuration. `GITPOD_WORKSPACE_URL`
also exists in a Gitpod workspace, which runs in a local VS Code via SSH. In
this scenario, you can access the development server on `localhost:3000`, but
the above custom Vite configuration expects it to be on the `gitpod.io` URL.

Therefore, you should add the custom Vite configuration only if you intend to
access Gitpod workspaces from within the browser. If you access Gitpod
workspaces from within a local VS Code, you do not need the custom Vite
configuration.

## Browser extensions that interfere with HMR

One final word of caution. Even with the custom Vite configuration in place, HMR
would still break for me. I narrowed this issue down to my browser extension
[uBlock Origin](https://ublockorigin.com/) being the culprit. Any other ad
blocker extension might interfere, too. Therefore, I run Gitpod workspaces only
inside an incognito window inside my browser.

## Credits

Thanks to [Mike Nikles](https://twitter.com/mikenikles) from Gitpod for pointing
me in the right direction when I ran into HMR issues with SvelteKit on Gitpod.
Gitpod's website https://gitpod.io/ is written in SvelteKit and
[open source](https://github.com/gitpod-io/website). You can learn a lot from
this repository.
