---
title: Three ways to bootstrap a Svelte project
author: thilo
published: 2022-07-01
modified: 2022-07-01
description:
  This post discusses three ways to bootstrap a Svelte project. Learn why using
  the official Vite Svelte templates results in the best developer experience.
topics: [svelte]
tags: [codesandbox, stackblitz, vite]
---

<script>
  import Image from '$lib/components/image.svelte';
  import VanillaExample from './_example/js/stackblitz.svelte';
  import TypeScriptExample from './_example/ts/stackblitz.svelte';

  // Provided by page endpoint.
  export let images;
</script>

The [Svelte template](https://github.com/sveltejs/template) has long been the
official way to bootstrap a Svelte project. But the Svelte template is now
archived and no longer maintained. What should you choose instead to bootstrap a
Svelte project?

With [SvelteKit](https://kit.svelte.dev/) close to version 1.0, it seems a
natural choice to choose SvelteKit. SvelteKit shines when you need advanced
features. E.g. SEO, progressive enhancement, fast initial page load or a
filesystem-based router. For smaller projects, SvelteKit comes with a lot of
unnecessary overhead. For data visualization, a quick experiment or teaching
Svelte, all you need is Svelte.

Let's look at three different ways to bootstrap a Svelte project. And then
answer the question of what you should choose instead of the legacy Svelte
template.

## Svelte REPL

If you have dipped your toes into Svelte already, you are familiar with the
[Svelte REPL](https://svelte.dev/repl). Within the Svelte community, it's the
most popular way to share code examples. The Svelte REPL runs client-side and
does not need a local setup. You can start coding instantly.

An often overlooked feature of the Svelte REPL is the download button. You can
download the source code of every example:

<figure>

<Image ratio={16/9} alt="Screenshot of one of my Svelte experiments running in
the Svelte REPL." src={images[`svelte-repl`].src}
srcset={images[`svelte-repl`].srcset} loading="lazy" />

<figcaption>

Click the download button in the Svelte REPL to download the source code of an
example.

</figcaption>

</figure>

You can start experimenting with the Svelte REPL. And once you decide that you
want to continue your experiment on GitHub, download its source code and run it
in your local VS Code:

<figure>

<Image ratio={1516/1030} alt="Screenshot of VS Code showing the Svelte project
downloaded from the Svelte REPL, which is based on the Svelte template."
src={images[`svelte-template`].src} srcset={images[`svelte-template`].srcset}
loading="lazy" />

<figcaption>

Code examples in the Svelte REPL use the legacy Svelte template, which uses
[Rollup](https://rollupjs.org/guide/en/) as a bundler.

</figcaption>

</figure>

The Svelte REPL would be the perfect way to start a new Svelte project, except
that you should not use the legacy Svelte template anymore. But, the Svelte team
is working on a replacement for the
[Svelte Tutorial](https://svelte.dev/tutorial), which is currently built with
the Svelte REPL. The new tutorial https://learn.svelte.dev/ supports Svelte and
SvelteKit. It runs on
[StackBlitz's WebContainers](https://blog.stackblitz.com/posts/introducing-webcontainers/),
a technology that will replace the current Svelte REPL. You can find out more in
Rich Harris's recent talk
[Full Stack Documentation at JSNation 2022](https://www.youtube.com/watch?v=RwBolXX9Pis).

## CodeSandbox

Let's look at [CodeSandbox](https://codesandbox.io/). The CodeSandbox team has
created a bundler that can bundle and run many types of JavaScript projects
in-browser. The bundled code runs client-side without relying on a back-end
server. CodeSandbox provides many sandbox templates, including one for Svelte:

<figure>

<Image ratio={1866/870} alt="Screenshot of the CodeSandbox dialog to select a
template for a new sandbox. The Svelte template is highlighted."
src={images[`csb-new-sandbox-dialog`].src}
srcset={images[`csb-new-sandbox-dialog`].srcset} loading="lazy" />

<figcaption>

CodeSandbox has an official sandbox template for Svelte.

</figcaption>

</figure>

As you can see in the following screenshot, CodeSandbox's Svelte template is a
variation of the legacy Svelte template. Unfortunately, its dependencies are
outdated. Thanks to semantic versioning, you still get the latest version of
Svelte, but most Rollup dependencies need an update:

<figure>

<Image ratio={16/9} alt="Screenshot of CodeSandbox's Svelte template running
in-browser." src={images[`csb-svelte-template`].src}
srcset={images[`csb-svelte-template`].srcset} loading="lazy" />

<figcaption>

CodeSandbox's Svelte template is a variation of the legacy Svelte template.

</figcaption>

</figure>

So, I do not recommend bootstrapping a new Svelte project with CodeSandbox. This
is a pity because CodeSandbox has nailed the user experience to create new
projects.

## StackBlitz

The team at [StackBlitz](https://stackblitz.com/) has taken a different
approach. They managed to get [Node.js](https://nodejs.org/en/) running
in-browser. This is a big deal because they can run pretty much anything that
runs with Node.js in a browser, without relying on a back-end server.

This makes it possible to run [Vite](https://vitejs.dev/) natively in-browser.
That's why StackBlitz simply runs the official Vite Svelte templates in-browser.
One with vanilla JavaScript support and the other with TypeScript support:

<figure>

<Image ratio={16/9} alt="Screenshot of StackBlitz's dashboard. The two Svelte
templates, one without and one with TypeScript support, are highlighted."
src={images[`stackblitz-dashboard`].src}
srcset={images[`stackblitz-dashboard`].srcset} loading="lazy" />

<figcaption>

StackBlitz offers two Svelte templates that run with Vite instead of Rollup.

</figcaption>

</figure>

The StackBlitz team has mapped the two Vite Svelte templates to memorable URLs.
Click on https://vite.new/svelte to bootstrap a Svelte project with vanilla
JavaScript. This is equal to running

```bash
npm create vite@latest my-svelte-app -- --template svelte
```

on your computer. Here is the
[Vite Svelte vanilla JavaScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte)
running in your browser (if supported):

<VanillaExample />

Click https://vite.new/svelte-ts to bootstrap a Svelte project with TypeScript.
This is equal to running

```bash
npm create vite@latest my-svelte-ts-app -- --template svelte-ts
```

on your computer. Here is the
[Vite Svelte TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte-ts)
running in your browser (if supported):

<TypeScriptExample />

## Why Vite and not Rollup?

Because Vite has been consistently delivering a fast developer experience for
web development. It also powers SvelteKit and has been outperforming competitors
like [Webpack](https://webpack.js.org/) and Rollup.
[@sveltejs/vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte)
provides everything you need for Svelte development with Vite. The plugin is
already configured in `vite.config.js` in both templates.

## Conclusion

The Svelte REPL and the CodeSandbox Svelte template make bootstrapping a new
Svelte project easy. They have both nailed the user experience to create new
projects. But they both use the legacy Svelte template, which runs with Rollup
and is not maintained anymore.

StackBlitz runs Vite natively in-browser. The two Vite Svelte templates deliver
a super-fast developer experience. Thus, when you bootstrap a new Svelte
project, use the official Vite Svelte templates. Either through StackBlitz or by
bootstrapping them on your computer.