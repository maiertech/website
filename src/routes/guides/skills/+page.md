---
title: Skills guide
description: How to manage agentic skills.
---

## Installing skills

You can install skills from [skills.sh](https://skills.sh) with the Skills CLI using
`npx skills add` and `npx skills add -g`. `npx skills` does not require anything installed locally.
Starting with Node v26, you can install the Skills CLI via Homebrew: `brew install skills`. If you
opt for this method, you do not need the `npx` prefix in the commands listed on this page.

You need to be mindful that skills can be malicious. Your first instinct should be to distrust any
skill for which you cannot verify that it is legit. You should also always read the skill to check
that it does not do anything fishy.

## Where should I install my skills?

Project-specific skills should be installed into `.agents/skills` in your project. Non-project-specific
skills should be installed into global `~/.agents/skills`. Both directories are the default directories
when using `npx skills add` and `npx skills add -g`. Many agents honor these two standardized
directories:

- Zed agent (with any supported provider)
- OpenCode via ACP in Zed (with any connected model)
- OpenCode in the terminal (with any connected model)

There are still many agents that roll their own skill directories, e.g. Claude Code. You can create
a symbolic link, e.g. `ln -s ~/.agents/skills ~/.claude/skills`, to avoid having to install skills
into multiple directories. Or you can choose to use models from non-compliant vendors only through
harnesses that support standard skill directories. I recommend using a harness that is
agent-agnostic. [Zed](/guides/zed) and [OpenCode](/guides/opencode) are great options.

## `npx skills`

| Command                | Description                      |
| :--------------------- | :------------------------------- |
| `npx skills list`      | List installed workspace skills. |
| `npx skills list -g`   | List installed global skills.    |
| `npx skills update`    | Update installed skills.         |
| `npx skills remove`    | Remove a workspace skill.        |
| `npx skills remove -g` | Remove a global skill.           |
