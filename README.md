# @maiertech/website

## Content Collections

This project uses [Content Collections](https://www.content-collections.dev/) to manage and organize
content. Collections are built outside of [SvelteKit](https://svelte.dev/docs/kit/introduction)
before the dev server launches or before a build. Collection update when files change, but these
updates are not part of SvelteKit's HMR. You need to manually refresh a page to see collection
changes.

Because collections run outside of SvelteKit, they do not have access to any SvelteKit-specific
features or APIs. For instance, they can't access `$env` or `$lib` and they can't reference dynamica
resources such as an image URL generated with SvelteKit.

Content Collections are defined in `content-collections.ts` in the project root. To avoid that this
file becomes a monolith, I moved the collection definitions to the `src/collections` folder. Each
collection is defined in a subfolder. The definition includes transformations, but the files that
make up a collection can be outside this folder. Some collections are defined by Markdown files in
subfolders of `src/routes`.

To make it easier to access collections from within SvelteKit, they can be accessed through
`$lib/server/collections`. For instance, collections may depend on the filesystem order of files,
which is not deterministic. Collections in `$lib/server/collections` mostly add sorting by a
specific field.

## YouTube thumbnails and OG images

If links to YouTube thumbnails and OG images are part of the content collections, it means that they
cannot be generated at build time with SvelteKit. If you use a service to generate the URLs, you can
either put the generated URLs into the frontmatter or dynamically generate URLs during a collection
transformation.

Co-locating a thumbnail or OG image with a page Markdown file is not a great option. When you
import the image into the page, which generates a path, you would need to write it to the page head
right then and there. You would also need to repeat this for every single page.
