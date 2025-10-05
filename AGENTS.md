# AGENTS.md

## Description

This is a content-driven website with three types of content:

1. Post: An article that dives deeper into a topic.
2. Note: A brief observation or thought.
3. Video: A YouTube video instead of a post.

## Stack

- SvelteKit v2 with `adapter-node`.
- Deployment to Railway.com with their zero-configuration deployments.
- Svelte v5.
- TypeScript.
- Zod schemas.
- TailwindCSS v4 and `tailwind-merge`.
- Mdsvex for authoring posts and notes.
- Package `@maiertech/sveltekit-helpers` to import reusable components, Zod schemas and TypeScript
  types.
- PNPM as package manager.

## Conventions

- Use PascalCase for both Svelte component names and their file names (e.g., PostCard.svelte).
- Always use Svelte v5, never v4.
- Prefer TailwindCSS in combination with tailwind-merge for styling, but you can use plain CSS
  inside Svelte's `<style>` tag for complex styles.
- Use `$env/dynamic/private` for secrets in SvelteKit and `$env/static/private` environment
  variables that are not secrets.
- Don't return or throw SvelteKit's `error` function. It knows what to do.
- Comments always end with a period.

## Written Content

- Use American English.
- Be concise and clear in your explanations.
- Use active voice and present tense.
- Write in a conversational but professional tone.

## svelte-mcp-server

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and
SvelteKit documentation. Here's how to use the available tools effectively:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with
titles, use_cases, and paths. When asked about Svelte or SvelteKit topics, ALWAYS use this tool at
the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections
(especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation
sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions. You MUST use this tool whenever writing
Svelte code before sending it to the user. Keep calling it until no issues or suggestions are
returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code. After completing the code, ask the user
if they want a playground link. Only call this tool after user confirmation and NEVER if code was
written to files in their project.
