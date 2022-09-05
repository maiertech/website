# maier.tech

This is the source code for my personal website https://maier.tech. Written with
[SvelteKit](https://kit.svelte.dev/) and hosted on [Vercel](https://vercel.com/).

## Frontmatter

https://github.com/maiertech/maier.tech/blob/main/src/models/frontmatter.model.ts

| Property  | Description                                                |
| :-------- | :--------------------------------------------------------- |
| published | Posts with future published date will not be linked.       |
| unpublish | When set to true, route throws 404 and post is not linked. |
