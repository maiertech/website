# @maiertech/website

## Overview

This is my personal website with posts and notes.

## Tech stack

- PNPM.
- SvelteKit v2.
- Svelte v5.
- TypeScript.
- Zod for schema validation and type inference.
- TailwindCSS v4 and tailwind-merge.
- Mdsvex for authoring posts and notes.
- It imports reusable components, Zod schemas and TypeScript types from the private package
  `@maiertech/sveltekit-helpers`.

## Repository structure

- `src/lib/components`: Svelte components.
- `src/lib/schemas`: Zod schemas.
- `src/lib/mdsvex/layouts`: Layouts for mdsvex.
- `src/routes`: File system router.

## Code style

- Always use Svelte v5 syntax.
- Use TailwindCSS for styling and tailwind-merge for class merging.
- Comments use proper punctuation and end with a period.
