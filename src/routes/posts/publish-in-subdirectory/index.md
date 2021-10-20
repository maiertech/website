---
title: How to serve a SvelteKit app with adapter-static from a non-root path
author: thilo
date: 2021-10-19
updated: 2021-10-19
description: To be written
category: creating-web-apps
tags:
  - sveltekit
---

<script context="module">
  export const prerender = true;
</script>

In this post you will learn how to serve a SvelteKit app from a non-root path.
Instead of serving your app from **https:[]()//example.com/** you would serve it
from **https:[]()//example.com/sveltekit-app/**. In the old days when webservers
served an entire file system, this was equivalent to serving your app from a
subdirectory. Serving any app from a non-root path will almost certainly break
it, if it was not written with a non-root path in mind.

[GitHub Pages](https://pages.github.com/) is an example for a hosting service
that serves static websites from non-root paths. A URL for a project page linked
to a GitHub repository looks like this:
**https:[]()//_username_.github.io/_repository_**. In this post I will show you
how to modify the SvelteKit demo app to make it compatible with GitHub Pages.

## Step 1: Generate the SvelteKit demo app

In your projects directory run

```bash
npm init svelte@next sveltekit-non-root-path-example
```

`cd` into directory `sveltekit-non-root-path-example` and run `npm i`. Then
launch the app locally with

```bash
npm run dev
```

Note that the app is served at http://localhost:3000, which is a root path.
After exploring the app, run

```bash
git init
```

from your project root and make your initial commit. This commit is your
baseline with a fully functioning app served from a root path.

In order to push this Git repository to GitHub, we use
[GitHub CLI](https://cli.github.com/). Run

```bash
gh repo create sveltekit-non-root-path-example
```

and choose the following settings:

- Visibility: public.
- Add `.gitignore`: no.
- Add a license: no.
- Continue: yes.

## Links.

- https://github.com/sveltejs/kit/issues/1329
- https://github.com/sveltejs/kit/issues/1154
