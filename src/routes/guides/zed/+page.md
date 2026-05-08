---
title: Zed guide
description: How to use Zed for agentic coding.
---

## Shortcuts

| Shortcut | Description         |
| :------- | :------------------ |
| `⌘ O`    | Open project.       |
| `⌘ B`    | Toggle left dock.   |
| `⌘ R`    | Toggle right dock.  |
| `⌘ ⇧ E`  | Show project panel. |
| `⌘ ⇧ G`  | Show Git panel.     |
| `⌘ ⇧ B`  | Show outline panel. |
| `⌃ G`    | Go to line.         |

## Sidebar

| Shortcut | Description            |
| :------- | :--------------------- |
| `⌥ ⌘ J`  | Toggle sidebar.        |
| `⇧ ⌘ A`  | Add folder to project. |

You can add multiple projects to the sidebar. A project is a GitHub repository. The sidebar shows
all agent sessions for a project, including sessions for worktrees. The default is that an agent
session runs on one project. The idea of the sidebar is to make switching between agent sessions
seamless.

If you want an agent session to run on more than one project, you can add the folder of the second
project with above shortcut. This creates a multi-root workspace.

## Agent panel

The agent panel is where you interact with the agent. Agent integration varies across providers. For
example, not all agents support code reviews in which you can acceppt or reject changes
individually.

| Shortcut | Description                     |
| :------- | :------------------------------ |
| `⌘ B`    | Show agent panel.               |
| `⇧ ␛`    | Enlarge agent panel.            |
| `@`      | Add to context.                 |
| `⌘ ⇧ >`  | Add selection to agent session. |

## Worktrees

Since v1, worktree support in Zed is usable. Using Git [worktrees](/guides/worktrees) to isolate
workspaces within the same project works seamless. Click the branch name at the top to create a
headless worktree. Then add a branch.

Zed keeps all worktrees in a configurable folder. However, it is opinionated about how worktrees are
organized within that folder. But since you can switch between worktrees in the UI, you don't need
to care where worktrees are located.

## Code reviews

Zed is a great choice for code reviews because unlike other AI coding tools, it lets you look at the
source code. It supports different review modes:

### Review uncommitted changes

| Shortcut | Description           |
| :------- | :-------------------- |
| `⌃ ⇧ R`  | Review agent changes. |

You can look at uncommitted changes with `git: diff` and stage or restore them one by one. The diff
is against the current branch.

If the uncommitted changes were made by an agent and the agent supports reviewing changes, you will
see a **Review changes** button in the chat. Alternatively, you can use the shortcut. In this review
mode, you can accept or reject changes one by one.

### Pull request review

| Shortcut         | Description                        |
| :--------------- | :--------------------------------- |
| `⌥ ⌘ G` then `R` | Send the diff to agent for review. |

With `git: branch diff`, you can create a diff between the default branch and the branch you are on.
This is useful for pull request reviews. Zed does not let you choose a different branch for a branch
diff.

If the default branch is `origin/main` but you always target `origin/develop` in pull requests, you
can configure `origin/develop` as the local branch in you local Git configuration. To find out the
default branch, look for `remotes/origin/HEAD` in

```bash
git branch -a
```

Run

```bash
git remote set-head origin develop
```

to update the ref `origin/HEAD` to `origin/develop` locally. Any `git: branch diff` will then pickup
this config.

Make use of these features for PR reviews:

- You can send the diff to your current agent for review. Unfortunatley, you cannot establish
  context before adding the diff tho the agent session.
- Use the Git graph to look at the PR's commit history.
- Use the file history to see how a file has changed over time.
- Add review comments to individual files via your Git provider's PR website.

## Resolve merge conflicts

Zed has built-in merge conflict resolution (not tested yet).
