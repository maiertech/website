---
title: Route matching in SvelteKit
author: thilo
published: 2022-02-13
modified: 2022-06-16
description:
  This post explores how SvelteKit's filesystem-based router matches a requested
  route to a page or an endpoint in src/routes.
category: web-development
tags:
  - sveltekit
links:
  - title: SvelteKit Routing (YouTube video by Tan Li Hau)
    href: https://www.youtube.com/watch?v=uyde7dAQwkA
---

<script>
  import Example from './_example/stackblitz.svelte';
  import Card from '$lib/components/card.svelte';
</script>

The [SvelteKit docs](https://kit.svelte.dev/docs#routing) state that

> At the heart of SvelteKit is a filesystem-based router. This means that the
> structure of your application is defined by the structure of your codebase —
> specifically, the contents of `src/routes`.

In this post, we will explore how SvelteKit's
[filesystem-based router](https://kit.svelte.dev/docs#routing) matches a
requested route to a page or an endpoint. SvelteKit transforms each route file
in `src/routes` into a page or an endpoint. Conversely, SvelteKit needs to match
a requested route to a route file. This is called route matching.

A filesystem-based router makes route matching straightforward: the route can be
interpreted as the subpath in `src/routes` and often there is only one matching
route file. But what happens when there are multiple matching route files? How
does SvelteKit decide which route file it uses to render a page or endpoint?

In this post, we look at a SvelteKit example and explore the rules that
SvelteKit applies to decide which page or endpoint to serve. You will take the
most out of this post if you follow along:

<Example />

## Duplicate route files are not permitted

When you have the example up and running, click route `/green` in the preview.
SvelteKit matches this request to page
[`src/routes/green.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/green.svelte).
This is the filesystem-based router at work, which takes the route and looks for
the corresponding route file in `src/routes`.

Now click route `/red`. This time SvelteKit matches the request to page
[`src/routes/red/index.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/red/index.svelte),
which is equivalent to `src/routes/red.svelte`.

Create file `src/routes/red.svelte` in the example and copy the content of file
`src/routes/red/index.svelte`. You should see this error message in the
terminal:

```bash
$ svelte-kit dev
> Duplicate route files: src/routes/red
```

<Card>

**Rule 1: Duplicate route files are not permitted.**

You cannot have both `src/routes/red/index.svelte` and `src/routes/red.svelte`.
SvelteKit won't let you.

</Card>

Delete `src/routes/red.svelte` and run

```bash
npm run dev
```

to restart the development server.

## Matching against path segments

The SvelteKit router matches strings of route segments to path segments. Path
segments inside `src/routes` can be static (`.../static/...`) or dynamic
(`.../[dynamic]/...`) with square brackets. Dynamic path segments match any
string. Static path segments require an exact match. The second rule describes
the order in which SvelteKit matches route segments to path segments:

<Card>

**Rule 2: SvelteKit matches route segments to path segments left to right.**

</Card>

Let's revisit the `/red` route from before. Now that we know what dynamic path
segments are, we realize that there were three more candidate pages:

```
src/routes/[color].svelte

src/routes/[nocolor].svelte

src/routes/[colour]/index.svelte
```

These are not duplicate routes because the strings inside `[]` differ. We
already know from the previous section, that `/red` is not rendered with any of
the above candidate pages. The reason is this rule:

<Card>

**Rule 3: Static path segments take precedence over dynamic path segments.**

E.g., `src/routes/green.svelte` (static) takes precedence over
`src/routes/[color].svelte` (dynamic).

</Card>

## Alphabetical order of path segments

Let's look at route `/blue` in the example. The candidate pages are:

```
src/routes/[color].svelte

src/routes/[nocolor].svelte

src/routes/[colour]/index.svelte
```

We need another rule to choose the page that is used to render `/blue`:

<Card>

**Rule 4: Index pages take precedence over non-index pages.**

This is only relevant for pages that are not considered duplicate routes, e.g.,
`src/routes/[colour]/index.svelte` takes precedence over
`src/routes/[color].svelte`.

</Card>

When matching route segment `blue`, we can use this rule to eliminate the first
two candidate pages. This results in page `src/routes/[colour]/index.svelte`
being rendered. You can confirm this by clicking on `/blue` in the example.

Let's delete page `src/routes/[colour]/index.svelte` in the example. To make the
workspace pick up this change, you need to click in the terminal and hit `⌃C`.
Restart the development server with `npm run dev`.

Now the two candidates for route `/blue` are:

```
src/routes/[color].svelte

src/routes/[nocolor].svelte
```

A look at the rendered page reveals that the router used
`src/routes/[color].svelte`. It did so because of this rule:

<Card>

**Rule 5: For two path segments of the same type, the first one in alphabetical
order takes precedence.**

E.g. `src/routes/[color].svelte` takes precedence over
`src/routes/[nocolor].svelte` because `color` comes before `nocolor` in
alphabetical order.

</Card>

## Matching with spread syntax

Let's look at route `/color/blue` in the example. The candidate pages are:

```
src/routes/color/[color].svelte

src/routes/color/[...rest].svelte
```

`[...rest]` in the second route is a dynamic path segment, which uses
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
and matches any path under `/color`, no matter how deep. We refer to it as a
spread segment. The following rule clarifies, which page the router chooses to
render `/color/blue`:

<Card>

** Rule 6: Dynamic path segments take precedence over spread segments.**

E.g. `src/routes/color/[color].svelte` takes precedence over
`src/routes/color/[...rest].svelte`.

</Card>

You can navigate to route `/color/blue/dark` to see an example of a route that
is rendered with `src/routes/color/[...rest].svelte`.

## Error pages

Last but not least, let's navigate to route `/blue/dark` in the example. This
time, there are no candidate pages. What does the router do? It falls back to
default error page
[`src/routes/__error.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/__error.svelte).

Note that as soon as there is one candidate page, including pages with spread
segments, the SvelteKit router does not fall back to an error page. This is what
we observed for route `/color/blue/dark` in the previous section. It was
rendered with `src/routes/color/[...rest].svelte` and not the default error
page.

SvelteKit allows you to configure error pages more granular per directory and
you can read up on how this works in the
[SvelteKit docs](https://kit.svelte.dev/docs/layouts#error-pages).
