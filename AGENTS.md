# Multi-Agent Instructions for @maiertech/website

## Project Overview

This is a personal website with posts and notes built using modern web technologies.

## Tech Stack

- **Package Manager**: PNPM
- **Framework**: SvelteKit v2 with Svelte v5
- **Language**: TypeScript with strict type checking
- **Validation**: Zod for schema validation and type inference
- **Styling**: TailwindCSS v4 with tailwind-merge for class optimization
- **Content**: Mdsvex for authoring posts and notes in Markdown
- **Dependencies**: Imports reusable components, Zod schemas, and TypeScript types from the private package `@maiertech/sveltekit-helpers`

## Repository Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── schemas/        # Zod validation schemas
│   └── mdsvex/
│       └── layouts/    # MDX layout templates
└── routes/             # SvelteKit file-system router
```

## Development Guidelines

### Code Style Requirements

- **Svelte**: Always use Svelte v5 syntax and runes
- **HTML/Components**: Do not use self-closing tags for Svelte components and HTML elements
- **Styling**: Use TailwindCSS for styling and tailwind-merge for class merging
- **Comments**: Use proper punctuation and end with a period
- **TypeScript**: Leverage strict typing and Zod schemas for validation

### Writing Style Guidelines

- **Language**: Use American English
- **Tone**: Be concise and clear in explanations
- **Voice**: Use active voice and present tense
- **Style**: Write a tad informal, but not too casual
- **Formatting**: Don't use em dashes

## Agent-Specific Instructions

### Development Agents
- Focus on maintaining TypeScript strict typing
- Ensure Svelte v5 compatibility in all components
- Use existing schemas from `@maiertech/sveltekit-helpers` when possible
- Follow TailwindCSS utility-first approach

### Content Agents
- Follow MDX best practices for posts and notes
- Maintain consistent front matter structure
- Use American English and active voice
- Keep content informal but professional

### Testing Agents
- Prioritize type safety validation
- Test component rendering with Svelte v5 features
- Validate schema compliance with Zod

## Build Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run linting and formatting checks
- `pnpm check` - Run Svelte and TypeScript checks