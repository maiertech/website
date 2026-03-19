# AGENTS.md

## Description

This is a content-driven website with three types of content:

1. Type post: An article that dives deeper into a topic.
2. Type note: A brief observation or thought.
3. Type video: A YouTube video instead of a post.

## Stack

- SvelteKit v2 with `adapter-node`.
- Svelte v5.
- TypeScript.
- Zod (for schemas and validation).
- TailwindCSS v4 and `tailwind-merge`.
- Mdsvex for authoring posts and notes.
- Private package `@maiertech/sveltekit-helpers` to import reusable components, Zod schemas and
  TypeScript types.
- PNPM as package manager.
- Deployment to Railway with zero config deployments.

## Conventions

- Prefer TailwindCSS in combination with `tailwind-merge` for styling. You can use plain CSS inside
  Svelte's `<style>` tag for complex styles.
- Use `$env/dynamic/private` for secrets in SvelteKit and `$env/static/private` environment
  variables that are not secrets.
- Comments always end with a period.

## Written Content

- Use American English.
- Be concise and clear.
- Use active voice and present tense.
- Write in a conversational but professional tone.
- Do not use "–" (en dash).
