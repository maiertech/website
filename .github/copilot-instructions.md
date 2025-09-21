# @maiertech/website

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Overview

This is my personal website with posts and notes built with SvelteKit v2, Svelte v5, TypeScript, and TailwindCSS v4.

## Working Effectively

### Prerequisites - CRITICAL Authentication Setup
**REQUIRED**: Create a GitHub Personal Access Token (classic) with `repo` and `read:packages` permissions before any setup.
- `repo` permission is required to retrieve last modified dates for posts from the GitHub API.
- `read:packages` permission is required to install the private package `@maiertech/sveltekit-helpers`.
- Set the token as environment variable: `export GITHUB_TOKEN=your_token_here`

### Bootstrap, Build, and Test the Repository
Run these commands in order:

1. **Install PNPM** (if not available):
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies** - takes ~25 seconds:
   ```bash
   pnpm install --frozen-lockfile
   ```
   **NEVER CANCEL**: Wait for completion. If authentication fails, ensure GITHUB_TOKEN is set correctly.

3. **Format code** - takes ~4 seconds:
   ```bash
   pnpm run format
   ```

4. **Lint code** - takes ~4 seconds:
   ```bash
   pnpm run lint
   ```
   Must pass before committing or CI will fail.

5. **Type check** - takes ~8 seconds:
   ```bash
   pnpm run check
   ```
   Must pass before committing or CI will fail.

6. **Build application** - takes ~15-30 seconds. **NEVER CANCEL**. Set timeout to 120+ seconds:
   ```bash
   pnpm run build
   ```

### Run the Application

**Development server** - starts in ~2 seconds:
```bash
pnpm run dev
```
Access at: http://localhost:5173/

**Preview built application**:
```bash
pnpm run preview
```
Access at: http://localhost:4173/

### Environment Variables Setup
Copy `.env.example` to `.env.development` and configure:
```bash
cp .env.example .env.development
```

Required variables (use dummy values for development):
- `GITHUB_TOKEN` - Your GitHub token (same as used for package installation)
- `EO_API_KEY` - EmailOctopus API key (dummy: "key")
- `EO_LIST_ID` - EmailOctopus list ID (dummy: "id") 
- `VIRALCARDS_API_KEY` - OG image generation key (dummy: "key")

## Validation

### Build Time Expectations
- **NEVER CANCEL** any build or long-running commands
- **Install**: ~25 seconds (depends on network)
- **Format**: ~4 seconds
- **Lint**: ~4 seconds
- **Check**: ~8 seconds
- **Build**: ~15-30 seconds (**NEVER CANCEL** - set timeout to 120+ seconds)
- **Dev server startup**: ~2 seconds

### Manual Validation Scenarios
After making code changes, ALWAYS validate by:

1. **Start the development server**:
   ```bash
   pnpm run dev
   ```

2. **Navigate to key pages** and verify they load without errors:
   - Homepage: http://localhost:5173/
   - Posts: http://localhost:5173/posts/
   - Notes: http://localhost:5173/notes/
   - Any specific pages you modified

3. **Check browser console** for JavaScript errors

4. **Test responsive design** if making UI changes

5. **Verify content rendering** for posts/notes if modifying content or layouts

### Pre-commit Validation
ALWAYS run before committing or the CI will fail:
```bash
pnpm run format && pnpm run lint && pnpm run check
```

## Tech Stack

- **Package Manager**: PNPM (required - do not use npm or yarn)
- **Framework**: SvelteKit v2
- **UI Library**: Svelte v5
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with tailwind-merge
- **Content**: Mdsvex for authoring posts and notes
- **Validation**: Zod for schema validation and type inference
- **Testing**: Playwright (configured but no tests currently)
- **Private Package**: `@maiertech/sveltekit-helpers` (requires GitHub authentication)

## Repository Structure

- `src/lib/components/`: Svelte components
- `src/lib/schemas/`: Zod schemas
- `src/lib/mdsvex/layouts/`: Layouts for mdsvex
- `src/lib/server/resolvers/`: Server-side data resolvers
- `src/routes/`: SvelteKit file-based routing
  - `src/routes/posts/`: Blog posts organized by year
  - `src/routes/notes/`: Short notes organized by year
  - `src/routes/api/`: API endpoints
- `static/`: Static assets
- `.github/workflows/ci.yml`: GitHub Actions CI pipeline

## Code Style

- Always use Svelte v5 syntax (no legacy Svelte 4 patterns)
- Do not use self-closing tags for Svelte components and HTML elements
- Use TailwindCSS for styling and tailwind-merge for class merging
- Comments use proper punctuation and end with a period
- Use TypeScript strictly - no `any` types
- Follow existing patterns for posts and notes structure

## Writing Style

- Use American English
- Be concise and clear in explanations
- Use active voice and present tense
- Write in a slightly informal but professional tone
- Avoid em dashes

## Common Tasks

### Adding New Posts
Posts are located in `src/routes/posts/(YEAR)/slug/` with:
- `+page.svx` or `+page.svelte` - Content
- `meta.ts` - Metadata (title, description, tags, etc.)
- `+page.server.ts` - Server-side data loading

### Adding New Notes  
Notes follow the same pattern in `src/routes/notes/(YEAR)/slug/`

### Troubleshooting

**"Cannot find module '@maiertech/sveltekit-helpers'"**: 
- Ensure GITHUB_TOKEN environment variable is set with `read:packages` permission
- Run `pnpm install --frozen-lockfile` again

**"Module '$env/static/private' has no exported member"**:
- Ensure environment variables are set in `.env.development`
- Check `.env.example` for required variable names

**Build failures**:
- Always run `pnpm run format && pnpm run lint && pnpm run check` first
- **NEVER CANCEL** builds - wait for completion even if it takes 30+ seconds

**Development server issues**:
- Ensure all environment variables are set (use dummy values for development)
- Check that GITHUB_TOKEN is properly configured
