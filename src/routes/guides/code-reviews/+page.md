---
title: Code Reviews
description: How to review code in agentic workflows.
---

## Agent diff reviews

| Shortcut | Description      |
| :------- | :--------------- |
| `⌃ ⇧ R`  | Show agent diff. |

In an agent diff review, you (the human) review code created by an agent. The idea is to make many
small code reviews while you iterate with the agent.

Agent diff support varies across ACP integrations in Zed. The OpenCode ACP integration does not
support agent diffs. The workaround for missing agent diffs is to commit uncommitted changes before
a prompt. Then you can use Zed's `git: diff` (project diff) to review the agent's changes.

However, the reality about agent diffs is that with agents changing bigger chunks of code in one go,
agent diff reviews make less sense because it all comes down to pull request reviews.

## Pull request reviews

The days of old-school manual pull request reviews are over. Agents not only create pull requests,
but they should also be used to review them.

The first thing I do when reviewing a pull request is create a worktree on the pull request branch
and then figure out whether I should spend my time on reviewing it. Creating a worktree with Zed is
little overhead and comes in handy when I request changes from the pull request author and will have
to review it again later.

Things I do to decide whether I should spend my time on reviewing a pull request:

- I look at the pull request description and the ticket.
- I look at the Git tree in Zed to understand the context of the pull request branch.
- I use `git: branch diff` in Zed to look at the branch diff. By default, the branch diff goes
  against the default branch, which is usually `origin/main`. Zed lets you choose the branch to diff
  against.
- With Zed, you can also add the branch diff to the context of the current chat using
  `@Branch Diff`. Then the agent does not need to consume tokens to figure out the branch diff.

Once I have decided it's worth diving deeper, I do the following steps:

- Use a code review skill and run it against the ticket and pull request description. The skill
  should check if the pull request solves the ticket, assess that the code is in line with all
  repository requirements, and verify that there are no bugs, code smells, or anti-patterns.
- I also let the agent walk me through the changes in selected files.
- You can't tick off reviewed files in Zed like in VS Code. Instead, you need to tick off reviewed
  files on the pull request page on the Git provider's website. The same applies to review comments.

## Tweaking the branch diff in Zed

If the default branch is `origin/main` but you always target `origin/develop` in pull requests, you
can configure `origin/develop` as the default branch in your local Git configuration. To find out
the default branch, look for `remotes/origin/HEAD` in

```bash
git branch -a
```

Run

```bash
git remote set-head origin develop
```

to update the ref `origin/HEAD` to `origin/develop` locally. Any `git: branch diff` will then pick
up this config.
