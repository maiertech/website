---
title: Managing environment variables with Vercel
author: thilo
publishedDate: '2025-08-10'
description:
  How to manage environment variables in Vercel for any project and environment, and easily sync
  them to your local .env file.
tags:
  - productivity
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
	import VercelDashboardImage from './VercelDashboard.svelte';
</script>

One really underrated benefit of deploying to Vercel is the ability to manage environment variables
for production, preview, and local development directly in the Vercel dashboard. You can pull any
variables configured for local development directly into a local `.env` file.

In many projects, creating the initial `.env` file can be a painful process. I usually start with
the provided `.env.example` file and then have to figure out where to get the required values. For
instance, I need to generate a `GITHUB_TOKEN` with the correct permissions. When I accidentally
delete the `.env` file, for example, because I want to start fresh and clone the repository again, I
have to start over.

Now I add any variables that would go in my local `.env` to the Vercel dashboard. On the dashboard,
you can assign a variable to all or selected environments. For example, a `DATABASE_ID` might be
different in production than in preview. Vercel gives you all the flexibility you need.

Here is a look at my Vercel dashboard in one of my SvelteKit projects:

<Figure caption="The Vercel dashboard can be used to manage environment variables." class="mb-8">
	<VercelDashboardImage />
</Figure>

`VERCEL_URL` is a Vercel system environment variable that Vercel sets automatically. Therefore, it
is not defined for production and preview. But for local development, it needs to be set to
`localhost:5173`. I also have a `GITHUB_TOKEN` to access the GitHub API, which is the same for
production and preview. For local development, I can set it to `${GITHUB_TOKEN}`, which refers to
the variable I have configured in my local VS Code as described in
[this note](/notes/env-vars-in-vscode).

Once your environment variables are configured, you can use the
[Vercel CLI](https://vercel.com/docs/cli) and run

```sh
vercel env pull .env
```

to pull all local development environment variables into a local `.env` file. When you run this the
first time, the Vercel CLI gives you hints on how to link your local repository to the corresponding
Vercel project. If you make changes to the environment variables in the Vercel dashboard, run the
command again. This approach also works really well for shared secrets in a team.
