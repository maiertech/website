---
title: A guide to understanding how Yarn hoists dependencies and handles conflicting packages
author: thilo
published: 2021-02-19
modified: 2022-06-28
description: Learn how Yarn 1 hoists packages, handles conflicting package versions and how you can use `yarn why` and the yarn.lock file to understand hoisting.
tags: [node]
---

This post discusses the concept of [hoisting](https://yarnpkg.com/advanced/lexicon#hoisting), which is a key feature of [Yarn 1](https://classic.yarnpkg.com/lang/en/). [Yarn 2](https://yarnpkg.com/)’s [Plug'n'Play](https://yarnpkg.com/features/pnp) has addressed most issues around hoisting. But most projects using Yarn continue using Yarn 1 and have not made the move to Yarn 2 yet. In this post Yarn (without the version number) refers to Yarn 1.

## How Yarn hoists dependencies

Yarn converts dependencies from a `package.json` into a tree by resolving them recursively. An un-optimized dependency tree can be quite complex and many levels deep to reflect dependencies of dependencies. Some packages show up multiple times in the tree, possibly at conflicting versions. Yarn uses hoisting to optimize (or rather deduplicate) the dependency tree by removing as many nodes as possible. [Yarn’s docs](https://yarnpkg.com/advanced/lexicon#hoisting) state that

> There isn’t a single way to decide how to transform the tree, and different package managers make different tradeoffs (some optimize for package popularity, package size, highest versions, ...). For this reason, no guarantee can be made regarding the final hoisting layout - except that packages will always be able to access the dependencies they listed in their manifests.

The docs do not describe Yarn’s hoisting algorithm but mention certain [hoisting guarantees](https://classic.yarnpkg.com/blog/2017/05/31/determinism/). These guarantees suggest that you should not expect your `node_modules` folder to have a specific layout. As you will see later in this post, small changes in dependencies can cause big changes in the layout of `node_modules`.

Another thing to keep in mind is that packages can be hoisted only when package versions are compatible in a [semantic versioning](https://semver.org/) sense, i.e. they have the same major version number (but not 0).

## Use `yarn why` and the yarn.lock file to understand hoisting

Once a Yarn install is complete, you can use [`yarn why`](https://classic.yarnpkg.com/en/docs/cli/why/) to figure out what Yarn did with specific packages. Let’s look at an example. I ran

```bash
yarn why @maiertech/gatsby-theme-posts-core
```

on a Gatsby test site:

```bash
yarn why v1.22.5
[1/4] Why do we have the module "@maiertech/gatsby-theme-posts-core"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "@maiertech/gatsby-theme-posts-core@0.8.0"
info Reasons this module exists
   - "@maiertech#gatsby-theme-digital-garden" depends on it
   - Hoisted from "@maiertech#gatsby-theme-digital-garden#@maiertech#gatsby-theme-posts-core"
info Disk size without dependencies: "108KB"
info Disk size with unique dependencies: "4.18MB"
info Disk size with transitive dependencies: "164.24MB"
info Number of shared dependencies: 374
Done in 1.61s.
```

Yarn tells us that it found package [@maiertech/gatsby-theme-posts-core](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-posts-core) at version 0.8.0, which is a dependency of [@maiertech/gatsby-theme-digitial-garden](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-digital-garden). It also tells us that it hoisted this version, which makes sense because @maiertech/gatsby-theme-posts-core is used only once in the entire project.

Let’s look at another `yarn why` output from a different repository, this time for package [@maiertech/gatsby-theme-pages-core](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-pages-core):

```bash
yarn why v1.22.5
[1/4] Why do we have the module "@maiertech/gatsby-theme-pages-core"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "@maiertech/gatsby-theme-pages-core@0.5.0"
info Has been hoisted to "@maiertech/gatsby-theme-pages-core"
info This module exists because it’s specified in "dependencies".
info Disk size without dependencies: "76KB"
info Disk size with unique dependencies: "8.15MB"
info Disk size with transitive dependencies: "76KB"
info Number of shared dependencies: 379
=> Found "@made-up-scope/gatsby-theme-base#@maiertech/gatsby-theme-pages-core@0.4.0"
info This module exists because "@made-up-scope#gatsby-theme-base" depends on it.
info Disk size without dependencies: "72KB"
info Disk size with unique dependencies: "8.14MB"
info Disk size with transitive dependencies: "72KB"
info Number of shared dependencies: 379
Done in 6.32s.
```

This time Yarn looks for nodes with @maiertech/gatsby-theme-pages-core in the dependecy tree. There is version 0.5.0 specified in `dependencies` in `package.json`. And there is version 0.4.0, which is a dependency of @made-up-scope/gatsby-theme-base. Yarn also says that it hoisted version 0.5.0. Since versions 0.5.0 and 0.4.0 are pre-1.0, semantic versioning assertions do not apply, i.e. version 0.5.0 is not a drop-in replacement for version 0.4.0. Therefore, the `yarn.lock` file contains two separate entries for versions 0.5.0 and 0.4.0:

```bash:yarn.lock
...
"@maiertech/gatsby-theme-pages-core@^0.4.0":
  version "0.4.0"
  resolved "https://registry.yarnpkg.com/@maiertech/gatsby-theme-pages-core/-/gatsby-theme-pages-core-0.4.0.tgz#d7226567f882c009c51415361666c90449637712"
  integrity sha512-ohzfpaL6Q4hZX0AZ8hS0tUqY+w6I6mr+cyYFTDqqAMPY3GBZPexFFgxCCspd1sAMJqaWgBmcDH6BkQYDXVymDA==
  dependencies:
  ...
"@maiertech/gatsby-theme-pages-core@^0.5.0":
  version "0.5.0"
  resolved "https://registry.yarnpkg.com/@maiertech/gatsby-theme-pages-core/-/gatsby-theme-pages-core-0.5.0.tgz#f8cc30886b85e635b3b0b952d6f488cfcb20f0ce"
  integrity sha512-x+A8idApFORR5vD8aTTDEqYi83OvcZL9Tdt168Cih9o+UbYWXb8ne+T+V7klHjnZ63UL0R4F908vo3yTeIVbNw==
  dependencies:
  ...
...
```

Note that `yarn.lock` does not tell us which packages were hoisted.

Let’s look at another example. This time we look at what `yarn why` tells us about package [browserslist](https://browserl.ist/), a dependency that is used by many packages:

```bash
yarn why v1.22.5
[1/4] Why do we have the module "browserslist"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "browserslist@4.16.3"
info Reasons this module exists
   - "gatsby" depends on it
   - Hoisted from "gatsby#browserslist"
   - Hoisted from "gatsby#autoprefixer#browserslist"
   - Hoisted from "gatsby#gatsby-legacy-polyfills#core-js-compat#browserslist"
   - Hoisted from "gatsby#babel-preset-gatsby#@babel#preset-env#@babel#helper-compilation-targets#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-colormin#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-merge-rules#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-minify-params#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-normalize-unicode#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-reduce-initial#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-merge-rules#caniuse-api#browserslist"
   - Hoisted from "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-merge-longhand#stylehacks#browserslist"
info Disk size without dependencies: "124KB"
info Disk size with unique dependencies: "3.81MB"
info Disk size with transitive dependencies: "3.81MB"
info Number of shared dependencies: 5
Done in 0.96s.
```

Yarn tells us that browserslist is a direct dependency of package [gatsby](https://www.gatsbyjs.com/) and it appears a few more times in the dependecy tree. All specified versions of browserslist are compatible with version 4.16.3, which was the latest version when I created this output. Therefore, Yarn hoisted version 4.16.3. The entry for browserslist in `yarn.lock` reveals which version declarations it actually found, all of them compatible with 4.16.3:

```bash:yarn.lock
...
browserslist@^4.0.0, browserslist@^4.12.0, browserslist@^4.12.2, browserslist@^4.14.5, browserslist@^4.16.1:
  version "4.16.3"
  resolved "https://registry.yarnpkg.com/browserslist/-/browserslist-4.16.3.tgz#340aa46940d7db878748567c5dea24a48ddf3717"
  integrity sha512-vIyhWmIkULaq04Gt93txdh+j02yX/JzlyhLYbV3YQCn/zvES3JnY7TifHHvvr1w5hTDluNKMkV05cs4vy8Q7sw==
  dependencies:
    caniuse-lite "^1.0.30001181"
    colorette "^1.2.1"
    electron-to-chromium "^1.3.649"
    escalade "^3.1.1"
    node-releases "^1.1.70"
...
```

Let’s look at one more example. This time I installed the package "browserslist" in my dependencies and pinned it to outdated version 4.16.2. This changed things quite a bit:

```bash
[1/4] Why do we have the module "browserslist"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "browserslist@4.16.2"
info Has been hoisted to "browserslist"
info This module exists because it’s specified in "dependencies".
info Disk size without dependencies: "124KB"
info Disk size with unique dependencies: "3.81MB"
info Disk size with transitive dependencies: "3.81MB"
info Number of shared dependencies: 5
=> Found "gatsby#browserslist@4.16.3"
info This module exists because "gatsby" depends on it.
info Disk size without dependencies: "124KB"
info Disk size with unique dependencies: "3.81MB"
info Disk size with transitive dependencies: "3.81MB"
info Number of shared dependencies: 5
...
8 more instances omitted.
...
=> Found "stylehacks#browserslist@4.16.3"
info This module exists because "gatsby#optimize-css-assets-webpack-plugin#cssnano#cssnano-preset-default#postcss-merge-longhand#stylehacks" depends on it.
info Disk size without dependencies: "124KB"
info Disk size with unique dependencies: "3.81MB"
info Disk size with transitive dependencies: "3.81MB"
info Number of shared dependencies: 5
Done in 1.96s.
```

Yarn hoisted version 4.16.2, which is the version I pinned in my dependencies. In all other instances where browserslist is further down in the dependency tree (10 total), Yarn stores a copy of version 4.16.3. This means that pinning one dependency to a specific version triggerd a massive change in the layout of `node_modules`. There are now 10 nodes with 10 copies of version 4.16.3 and one hoisted node with one copy of version 4.16.2 (instead of just one hoisted node with one copy of version 4.16.3). The bottom line from this observation is that you should never make assumptions about the layout of `node_modules`.

A quick look at `yarn.lock` reveals that it has now two entries for browserslist for versions 4.16.2. and 4.16.3:

```bash:yarn.lock
...
browserslist@4.16.2:
  version "4.16.2"
  resolved "https://registry.yarnpkg.com/browserslist/-/browserslist-4.16.2.tgz#f79d67cd37e8d80ff0835fe7bc456e406fb1582c"
  integrity sha512-oi5WJ1XukqFwgGsMxja1dySAzyWaXZqWSEWDedulO5M63JDw1rgGQbegfVZvxQyXLwkHm44xUbLsgP8C1iHeNg==
  dependencies:
    ...

browserslist@^4.0.0, browserslist@^4.12.0, browserslist@^4.12.2, browserslist@^4.14.5, browserslist@^4.16.1:
  version "4.16.3"
  resolved "https://registry.yarnpkg.com/browserslist/-/browserslist-4.16.3.tgz#340aa46940d7db878748567c5dea24a48ddf3717"
  integrity sha512-vIyhWmIkULaq04Gt93txdh+j02yX/JzlyhLYbV3YQCn/zvES3JnY7TifHHvvr1w5hTDluNKMkV05cs4vy8Q7sw==
  dependencies:
    ...
...
```

## 5 takeaways from hoisting

- Yarn tries to eliminate as many nodes as possible from the dependency tree by hoisting as many packages as possible.
- Hoisting works best if you [specify your dependencies with a caret (`^`)](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies). The more restrictive you are, e.g. by pinning dependencies, the more constraints you create for Yarn that make it hard to hoist packages.
- You can debug issues with conflicting dependencies with a combination of running `yarn why` and looking at `yarn.lock`.
- Hoisting can conceal missing dependencies because hoisted dependencies can be imported anywhere in your project. If you forget to declare a dependency in `package.json` and then import it, it will still work if Yarn happens to hoist this dependency from another node in the dependency tree. But it might stop working unexpectedly when the layout of `node_modules` changes because of something as minor as a pinned dependency.
- Yarn always [honors its basic guarantees for dependencies declared as `dependencies`, `devDependencies` and `peerDependencies` in `package.json`](https://classic.yarnpkg.com/blog/2018/04/18/dependencies-done-right/), i.e. when you import a dependency, Yarn will always deliver a version compatible with what you specified.
