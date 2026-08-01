# AGENTS.md

## Description

This is a content-driven website with three types of content:

1. Type post: A long-form, evergreen article.
2. Type note: A short link post, a single external URL with a few sentences of framing.
3. Type video: A support page for one of my own YouTube videos

## Stack

- SvelteKit v2 with `adapter-node`.
- Svelte v5.
- TypeScript.
- Zod (for schemas and validation).
- TailwindCSS v4 and `tailwind-merge`.
- `@skeletonlabs/skeleton` v5.
- Mdsvex for authoring posts and notes.
- Content Collections for the content pipeline.
- Private package `@maiertech/sveltekit-helpers` for reusable components, Zod schemas and types.
- PNPM as package manager.

## Conventions

- Prefer TailwindCSS in combination with `tailwind-merge` for styling. You can use plain CSS inside
  Svelte's `<style>` tag for complex styles.
- Follow the best practices for Skeleton v5 as outlined in https://www.skeleton.dev/llms-svelte.txt.
- Comments always end with a period.

## Authoring

- A post must be evergreen content and relevant in the long-term.
- A note usually shares a link.
- A video page hosts the transcription of one of my own YouTube videos.
- Use American English.
- Be concise and clear.
- Use active voice and present tense.
- Write in a conversational but professional tone.
- Do not use en dashes or em dashes.

## Checks

Before you create or update a pull request, run `pnpm lint` and `pnpm check`. You can try fixing
formatting errors with `pnpm format`.
