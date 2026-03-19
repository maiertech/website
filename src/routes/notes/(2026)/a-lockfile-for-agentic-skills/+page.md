---
title: A lockfile for agentic skills
description: TODO
publishedDate: 2026-03-19
link: https://github.com/vercel-labs/skills
---

I recently started exploring [agentic skills](https://agentskills.io/home). A skill is a Markdown
file with some metadata that describes a task or best practice, e.g. how to use SvelteKit's new
[remote functions](https://svelte.dev/docs/kit/remote-functions). The nice thing about skills is
that they can be shared and reused.

Vercel's [Skills.sh](https://skills.sh/) is a registry for skills. It is to agentic skills what the
[NPM registry](https://www.npmjs.com/) is to NPM packages. Vercel also provides a CLI called
`skills` to install skills from the registry into your project's `.agents/skills` folder. If you
live on the cutting edge of AI, nothing newsworthy here.

But skills may be updated and improved in the future, just like NPM packages, and there was no way
to track updates. You had to manually install a skill again and then version control would reveal if
there was a change. This has changed recently. Vercel's CLI now generates a `skills-lock.json` when
you install your first skill. Add this to version control and then it's easy to check if there are
skill updates with `npx skills check`.

There are still some rough edges, e.g. `npx skills remove` does not update the lockfile.

But beyond the teething problems it's fascinating to see that agentic skills are evolving into
managed project dependencies.
