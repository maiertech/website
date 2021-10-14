---
title: What you need to know about Gatsby’s File System Route API
author: thilo
date: 2021-03-27
updated: 2021-10-11
description:
  'Overview of Gatsby’s File System Route API, an alternative to gatsby-node.js
  for programmatic page generation and similar to dynamic routes in Next.js.'
category: legacy
links:
  - title: 'Announcing Gatsby’s new File System Route API'
    href: https://www.gatsbyjs.com/blog/fs-route-api/
  - title: Gatsby File System Route API documentation
    href: https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/
---

<script context="module">
  export const prerender = true;
</script>

The new
[File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/)
in Gatsby takes inspiration from
[dynamic routes in Next.js](https://nextjs.org/docs/routing/dynamic-routes). The
main difference is that the File System API retrieves data from Gatsby’s GraphQL
layer, while in Next.js for dynamic routes you have to write custom code to
retrieve data from any data source that can be tapped with JavaScript.

## Programmatic page generation with `gatsby-node.js`

[Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)
used to be the only way to generate pages programamtically inside a
`gatsby-node.js`. You can think of Gatsby Node APIs as a collection of hooks
with which you can hook into Gatsby’s build process to manipulate nodes in
Gatsby’s GraphQL layer and to generate pages programamtically. In my
[Gatsby themes](https://github.com/maiertech/gatsby-themes) I usually create the
following API functions inside `gatsby-node.js`:

- [`onCreateNode`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateNode)
  is called when a new node is created. You can use this function to derive new
  nodes from existing nodes or to add fields to existing nodes.
- [`createPages`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)
  is called after the GraphQL layer is ready. You can query nodes and then
  create pages from queried nodes.
- [`createSchemaCustomization`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization)
  is called to override Gatsby’s
  [schema inference](https://www.gatsbyjs.com/docs/schema-inference/). This is
  called
  [schema customization](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/).
  You do not have to customize your GraphQL schema. Schema inference is robust
  and works well. In my Gatbsy themes I customize the schema and introduce
  custom types to simplify GraphQL queries.

A typical sequence for programmatic page generation looks like this:

1. Source nodes from various data sources.
1. Transform nodes and derive new nodes.
1. Generate pages from a subset of nodes.

This involves two types of GraphQL queries:

1. A **node selection query**, executed inside `createPages`, to select nodes
   from which pages should be generated. If you are familiar with Next.js, this
   is the equivalent of
   [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
1. A **page query** exported from a template and run during page generation.
   This is the equivalent of
   [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
   in Next.js.

The File System Route API does not make `gatsby-node.js` obsolete. It is an
alterantive API for programmatic page generation that complements
`gatsby-node.js` and can replace it in certain scenarios. With the File System
Route API, you trade in full control and complexity for a more simple but more
opinionated approach that covers many common scenarios, but not all.

Before we dive into the File System Route API, let’s recall that directory
[`src/pages` has special routing powers in Gatsby](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#routes-defined-in-srcpages).
Any React component in this directory is turned into a page whose route
corresponds to the file path. This is called file-system based routing.

## Generating pages for an entire collection with collection routes

With the File System Route API you can place React components in `src/pages`
that have additional information encoded in their filename and/or pathname.
Component `src/pages/posts/{Post.title}.js` with `{}` notation in the filename
triggers page generation for each GraphQL `Post` node. `{Post.title}` is
interpreted as node selection query to select a collection of nodes from which
to create pages and their routes. In this example Gatsby creates this query
under the hood

```graphql
allPost {
  nodes {
    id
    title
  }
}
```

and generates a page for each `id` using the default export of file
`{Post.title}.js`, which also has to export a page query that receives `id` as
query parameter.

As a convention, the value between `{}`, in this case `Post.title`, is
[slugified](https://github.com/sindresorhus/slugify) and used as part of the
route. For example, title **What you need to know about Gatsby’s File System
Route API** would result in
`what-you-need-to-know-about-gatsby-s-file-system-route-api`. And the route of
the generated page is

```bash
/posts/what-you-need-to-know-about-gatsby-s-file-system-route-api
```

which is the relative path to `{Post.title}.js` inside `src/pages` plus the
slugified title.

## Client-only routes without generating pages

You can also use `[]` notation with the File System Route API to create
client-only routes. Gatsby does not generate pages for client-only routes, i.e.
client-only routes cannot be used as entry points for the site. For example,
file `src/pages/users/[id].js` results in client-only routes following this
pattern: `/users/:id` (`:id` is the
[route paramters notation from Express](https://expressjs.com/en/guide/routing.html)).
A `params` object with prop `id` is passed into the React component availalbe as
default export in file `[id].js`. If you know Next.js this should sound
familiar.

A common use case for `[]` notation in Gatsby is a fallback for a collection
route. For example, you could complement `src/pages/products/{Product.name}.js`
with `src/pages/products/[name].js`. In this scneario, the `{}` collection route
takes precedence and for everything else the `[]` client-only route is used.

## Catch-all routes

With the File System Route API you can use `[]` notation to create a catch-all
route and delegate all routes in a subtree of your site to a custom React app.
For example, `/src/pages/dashboard/[...].js` will handle all `/dashboard/*`
routes. You can access sub-routes like this

```jsx
function App(props) {
  const splat = props.params[‘*’]
}
```

and pass them into a router like [React Router](https://reactrouter.com/).

## 5 takeways from Gatsby’s File System Route API

- The File System Route API in Gatby does not make `gatsby-node.js` obsolete,
  but rather complements it and can replace it in certain use cases.
- `{}` notation adapts the concept of dynamic routes or file-system based
  routing to Gatsby’s GraphQL layer, which is Gatsby’s unique selling point to
  access data from various sources. There are more types of GraphQL queries that
  can be expressed with `{}` notation than covered in this post. Check the
  [Gatsby File System Route API documentation](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/).
- `[]` notation adds an API that is similar to dynamic routes in Next.js, but
  for client-side routes only.
- The File System Route API can help reduce the lines of code required for
  programmatic page generation. But because you need to encode GraphQL queries
  in filenames, it feels a little opinionated. I would expect most Gatsby sites
  to go for a mixed approach for programmatic page generation, i.e. reach for
  the File System Route API for simple scenarios and for `gatsby-node.js` for
  more complex ones.
- If you are comfortable using `gatsby-node.js`, there is no need to migrate
  anything to the File System Route API.
