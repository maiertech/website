---
title: Skills guide
description: How to manage agentic skills.
---

## Installing skills

You can install skills from [skills.sh](https://skills.sh) with the Skills CLI using
`npx skills add` and `npx skills add -g`. `npx skills` does not require anything installed locally.
Starting with Node v26, you can install the Skills CLI via Homebrew for better performance:
`brew install skills`. If you opt for this method, you do not need the `npx` prefix in all commands
listed on this page.

You need to be mindful that skills can be malicious. Your first instinct should be to distrust any
skill for which you cannot corroborate that it is legit. You should also always read the skill to
verify that it does not do anything fishy. There is no harm in installing a skill, but before
letting it loose on your agent, you really need to verify that it is safe to use.

Let's take the [official Svelte skills](https://svelte.dev/docs/ai/skills) as an example. On the
[Svelte skills page on skills.sh](https://skills.sh/sveltejs/ai-tools) you can double-check from
which repository the skills will be installed. Since the
[repository is managed by the Svelte team](https://skills.sh/sveltejs/ai-tools), you can be
confident that these skills are legit and you can use the command from skills.sh to install them.

## Where should I install my skills?

Project-specific skills should be installed into your workspace in directory `.agents/skills` if you
want to share them with your team. When you install workspace skills into `.agents/skills`, chances
are that your agent will be able to discover them (there are notable exceptions, e.g. Claude Code).

Skills that are not project-specific (global skills) should be installed into your home directory.
For global skills, there is even less support for the `~/.agents/skills` directory, e.g. Claude Code
and the Zed agent do not read skills from this directory.

As a workaround, you can install global skills into `~/.agents/skills` and create a symbolic link to
whatever directory your agent requires:

| Agent        | Symbolic link                                 |
| ------------ | --------------------------------------------- |
| Claude Code  | `ln -s ~/.agents/skills ~/.claude/skills`     |
| Mistral Vibe | `ln -s ~/.agents/skills ~/.vibe/skills`       |
| Zed agent    | `ln -s ~/.agents/skills ~/.config/zed/skills` |

## List skills

Run

```bash
npx skills list
```

to list installed workspace skills. Run

```bash
npx skills list -g
```

to list globally installed skills.

## Update skills

Run

```bash
npx skills update
```

to update installed skills. You will be prompted if you would like to update workspace skills or
global skills.

## Remove skills

Run

```bash
npx skills remove
```

to remove a workspace skill. Run

```bash
npx skills remove -g
```

to remove a global skill.

## Skills I use

| Skill                     | Type      | Link                                                                       |
| ------------------------- | --------- | -------------------------------------------------------------------------- |
| modern-web-guidance       | global    | https://www.skills.sh/googlechrome/modern-web-guidance/modern-web-guidance |
| nuxt-ui                   | workspace | https://www.skills.sh/nuxt/ui/nuxt-ui                                      |
| svelte-code-writer        | workspace | https://www.skills.sh/sveltejs/ai-tools/svelte-code-writer                 |
| svelte-core-bestpractices | workspace | https://www.skills.sh/sveltejs/ai-tools/svelte-core-bestpractices          |
