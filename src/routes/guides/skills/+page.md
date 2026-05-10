---
title: Skills guide
description: How to manage agentic skills.
---

## Install skills

You can install skills from [skills.sh](https://skills.sh) with `npx skills add`. You need to be
mindful that skills can be malicious. Your first instinct should be to distrust any skill for which
you cannot corroborate that it is legit. You should also always read the skill to verify that it
does not do anything fishy. There is no harm in installing a skill, but before letting it loose on
your AI, you really need to verify that it is safe to use.

Let's take the [official Svelte skills](https://svelte.dev/docs/ai/skills) as an example. On the
[Svelte skills page on skills.sh](https://skills.sh/sveltejs/ai-tools) you can double check from
which repository the skills will be installed. Since the
[repository is managed by the Svelte team](https://skills.sh/sveltejs/ai-tools), you can be
confident that these skills are legit and you can use the command from skills.sh to install them.

## Installation directory

Directories in which agents look for skills are a mess:

| Directory              | Type    | Description                                           |
| :--------------------- | :------ | :---------------------------------------------------- |
| `.agents/skills`       | project | Visible by Zed agent and other agents but not Claude. |
| `~/.agents/skills`     | global  | Neither visible by Zed agent nor Claude.              |
| `.claude/skills`       | project | Visible by Claude Code only.                          |
| `~/.claude/skills`     | global  | Visible by Claude Code only.                          |
| `~/.config/zed/skills` | global  | Visible by Zed agent only.                            |

As a workaround, you can install skills globally into `~/.agents/skills` and create the following
symbolic links:

- `ln -s ~/.agents/skills ~/.config/zed/skills`
- `ln -s ~/.agents/skills ~/.claude/skills`

## List skills

Use `npx skills` to manage agent skills. Run

```bash
npx skills list
```

to list installed project skills. Run

```bash
npx skills list -g
```

to list globally installed skills.

## Update skills

Run

```bash
npx skills update
```

to update installed skills. You will be prompted if you would like to update project skills or
global skills.

## Remove skills

Run

```bash
npx skills remove
```

to remove a project skill. Run

```bash
npx skills remove -g
```

to remove a global skill.
