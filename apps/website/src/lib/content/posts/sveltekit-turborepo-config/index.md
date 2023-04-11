---
title: Configuring Turborepo for a SvelteKit monorepo
author: thilo
published: 2023-03-16
modified: 2023-04-05
description: This post provides an overview of configuring a Turborepo for a monorepo with SvelteKit apps and dependencies. It also looks at potential pitfalls when you configure your first Turborepo.
topics: [svelte]
tags: [sveltekit, turborepo, vercel]
---

<script>
  import Image from '$lib/components/image.svelte';
  import Highlight from 'svelte-highlight';
  import { bash, json } from 'svelte-highlight/languages';
  import tree from './tree.txt?raw';
  import package_json from './package.json?raw';
  import turbo_json from './turbo.json?raw';
  import ui_turbo_json from './ui/turbo.json?raw';
  import website_turbo_json from './website/turbo.json.txt?raw';
  import website_package_json from './website/package.json.txt?raw';
</script>

Recently, I converted the repository for my website to a [Turborepo](https://turbo.build/repo). Turborepo is a task dependency management layer on top of a package manager, and it works for normal repositories and monorepos. The underlying package manager has to be one of [NPM](https://docs.npmjs.com/), [pnpm](https://pnpm.io/), or [Yarn](https://classic.yarnpkg.com/), all of which come with workspaces support.

The central pitch of Turborepo is to speed up workspace tasks, primarily builds. After configuring task dependencies in one or more `turbo.json`, Turborepo uses this information to run tasks in parallel with an aggressive caching strategy. Turborepo can complement local caching with shared remote caching. Often this will significantly reduce the duration of deployment builds because local builds are cached remotely and can be reused for deployment builds.

## Workspaces configuration

Let's look at how I configured the repository for my website with the following monorepo directory structure:

<figure style="place-items: stretch;">
  <Highlight language={bash} code={tree} />
  <figcaption>File tree for the maier.tech monorepo.</figcaption>
</figure>

I use NPM as a package manager. Therefore, I defined my workspaces with the `workspaces` property:

<figure style="place-items: stretch;">
  <Highlight language={json} code={package_json} />
  <figcaption>package.json</figcaption>
</figure>

I recommended adding package `turbo` to `devDependencies`, which gives you control over which version to use. You should also install the `turbo` package globally to make the `turbo` command available in your terminal. A globally installed `turbo` command will use the Turborepo version declared in `devDependencies`.

## Turborepo configuration

The Turborepo configuration is in `turbo.json` at the project root level. For my monorepo, it looks like this:

<figure style="place-items: stretch;">
  <Highlight language={json} code={turbo_json} />
  <figcaption>turbo.json</figcaption>
</figure>

The `pipeline` property describes dependencies between NPM tasks (defined in the `scripts` tags of workspace `package.json` files). Each task can have additional properties, which you can look up in the [Turborepo docs (configuration options)](https://turbo.build/repo/docs/reference/configuration). I will highlight two of them:

1. `"dependsOn"`: Value `["^build"]` means that every build task should run the build tasks of dependencies that reside inside the monorepo in other workspaces.
1. `"outputs"`: Describes build artifacts that Turborepo should cache. E.g., the build of a SvelteKit app goes into directory `.svelte-kit`. If Turborepo figures out nothing has changed during a build, it will retrieve `.svelte-kit` from its cache instead of running the task. Similarly, the output of [adapter-vercel](https://kit.svelte.dev/docs/adapter-vercel) goes into the `.vercel` directory and needs to be cached. The best case for a build is that Turborepo can fetch both `.svelte-kit` and `.vercel` from the cache.

## Nested configuration

Starting with Turborepo v1.8, you can nest configurations and complement a project-level configuration with workspace-specific configurations. E.g., in my monorepo, `packages/ui` contains a UI package that is managed with SvelteKit's package tooling. When you run the `build` command for `ui`, the build artifacts go into `dist` and must be cached. I could add `dist` to the `outputs` property of the `build` task in the project root `turbo.json`. Then they would be applied to every build task in every workspace.

As an alternative, I created the file `packages/ui/turbo.json`, which extends the project root `turbo.json`:

<figure style="place-items: stretch;">
  <Highlight language={json} code={ui_turbo_json} />
  <figcaption>packages/ui/turbo.json</figcaption>
</figure>

Turborepo permits overrides only for anything under the `pipeline` property. The above `turbo.json` build task inherits all properties from the project root `turbo.json` and overrides only the `outputs` property.

## Pitfall: Getting the outputs wrong

Getting the outputs wrong can have unintended side effects. After refactoring my repository to a monorepo, I got the following error for every Vercel deployment:

<figure>
<Image
  ratio={1336/826}
  alt='Screenshot of the error log of a Vercel deploy. The error message reads: No output directory named "public" found after the build completed.'
  url="https://share.mailbox.org/ajax/share/044946dc0feec1034ca89b7feec14830b07f10ca02e640f3/1/8/MjQ1/MjQ1LzM2Mg?dl=true"
  loading="lazy" />
<figcaption>Vercel build error after migrating my repository to a Turborepo.</figcaption>
</figure>

By default, Vercel expects the deployment files in the `public` directory or another special directory, e.g., `.vercel`. I had forgotten to add `.vercel/**` to `outputs` in `turbo.json`. Whenever Turborepo determined that it could reuse a cached build, it did not run the build task and instead fetched all outputs it was aware of from the cache. Since it did not know about `.vercel`, it could not fetch it from the cache, and the build ended without a valid build directory.

## Pitfall: Persistent tasks

Persistent tasks are long-running, e.g., the `dev` task is persistent. Turborepo does not allow any task to depend on a persistent task because it blocks subsequent tasks. Imagine `ui/package.json` defines a `watch` task that builds the library whenever a file changes. I want to add this configuration to `apps/website/turbo.json`:

<figure style="place-items: stretch;">
  <Highlight language={json} code={website_turbo_json} />
  <figcaption>apps/website/turbo.json</figcaption>
</figure>

But this is not permitted since Turorepo does not allow the `dev` task to depend on `watch`, which is a persistent task. Instead of defining the `watch` task as a dependency of the `dev` task in `turbo.json`, you need to launch the watch task at the NPM level:

<figure style="place-items: stretch;">
  <Highlight language={json} code={website_package_json} />
  <figcaption>apps/website/package.json</figcaption>
</figure>

This script simultaneously launches the `watch` task for `packages/ui` and the `dev` task for `apps/website`.

## Conclusion

Configuring Turborepo for a monorepo with one or more SvelteKit apps is relatively easy. But you must get the `outputs` right, including any directories specific to your hosting provider. As a layer on top of a package manager, Turborepo does not replace NPM, pnpm, or Yarn. As you have seen in the above examples, some configurations go in a `turbo.json`, and others go in a `package.json`. Knowing where configurations go can be challenging in the beginning. Expect Turborepo to support more configurations over time and perhaps even merge with a package manager or another build tool.
