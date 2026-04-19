---
title: Zed guide
description: How to use Zed for agentic coding.
---

## Shortcuts

| Shortcut | Description         |
| :------- | :------------------ |
| `⌘ B`    | Toggle left dock.   |
| `⌘ R`    | Toggle right dock.  |
| `⌘ ⇧ E`  | Show project panel. |
| `⌘ ⇧ G`  | Show Git panel.     |
| `⌘ ⇧ B`  | Show outline panel. |
| `⌘ ?`    | Show agent panel.   |
| `⌃ ⇧ R`  | Review changes.     |
| `@`      | Add to context.     |

## Worktrees

Workspace isolation is done with Git [worktrees](/guides/worktrees). You can manage worktrees with
`git: worktree`. This works well except for the creation of new worktrees. Zed thinks that all
worktrees it creates should be located in one central (but customizable) directory. And it does not
support creating worktrees from existing branches.

## Orchestration

Use one worktree per window. The UI is not designed to run multiple agents in parallel. You can do
this with one window per agent, but there is no good way to manage all the running agents.

## Code reviews

### Review files changed by agent

You can look at uncommitted changes with `git: diff`. You can stage or restore changes one by one,
but that is usually not what you want. When there are uncommitted changes made by an agent, you will
see the **Review changes** button. Alternatively, you can use the keyboard shortcut to open this
view. In this view, you can accept or reject the agent's changes one by one.

When you do this is up to you. You might do a few iterations with the agent without looking at the
code and then review, or you might review changes in every iteration. You can also copy all the
diffs and add them to your agent's context, or rather another agent's context, and let the agent do
a code review.

### Pull request review

One downside of Zed is that it does not yet have anything that matches
[GitHub's pull requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github).
You have to find a different workflow to do pull requests.

Since you can't create a worktree from the pull request branch in Zed, you need to create a worktree
for the review manually. With `git: branch diff`, you can create a diff between the default branch
on origin and the branch you are on. It is currently not possible to diff against another branch,
for example when you stack pull requests.

You can create a diff and send it to your current agent for a first review.

Two more useful features for exploring the pull request are the Git graph and the file history,
which you can access for each file with a right-click.

A big downside is that you cannot write line comments during a pull request review in Zed. You need
to switch context to the Git provider's website.

## Resolve merge conflicts

Zed has built-in merge conflict resolution (not tested yet).
