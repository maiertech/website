# @maiertech/website

## Content Collections

This project uses [Content Collections](https://www.content-collections.dev/) to manage and organize
content. Content Collections run outside of [SvelteKit](https://svelte.dev/docs/kit/introduction).
That's why they cannot access any SvelteKit-specific resources, such as `$env` or `$lib`.

Content Collections are defined in `content-collections.ts`. Each collection is defined in a
subfolder of `src/collections`. The files of a collection do not have to be in this subfolder. Some
collections are defined by Markdown files in subfolders of `src/routes`. Within SvelteKit,
collections or derivatives can be accessed via `$lib/server/collections`.
