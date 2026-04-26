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

## Sidebar

| Shortcut | Description            |
| :------- | :--------------------- |
| `⌥ ⌘ J`  | Toggle sidebar.        |
| `⇧ ⌘ A`  | Add folder to project. |

You can open multiple independent projects in the sidebar. For each project, you can run multiple
agents independently. You can also create a worktree for workspace isolation. However, the worktree
is still considered part of the project.

Therefore, you cannot open two worktrees of the same repository in the sidebar. But you can launch
an agent on a specific worktree and another agent on a different worktree. When you switch between
the agents, Zed switches between the worktrees. You can still work on two worktrees of the same
repository by opening them in separate windows.

You can also let the Zed agent work on two repositories at the same time. Add the main worktree of
the first project, and then add the main worktree of the second one by adding a folder to the
project. This creates a multi-root workspace. You can then create worktrees for all folders
simultaneously. Multi-root workspaces for external agents are not supported.

The sidebar is a step towards orchestration in Zed.

## Worktrees

The new sidebar tries to make it easier to create and manage Git [worktrees](/guides/worktrees).
Click the branch name at the top to create a new worktree without a branch. You can create the
branch later.

Zed keeps all worktrees in a configurable folder. However, it is opinionated about how worktrees are
organized within that folder and does not delete leftover empty directories from deleted worktrees.

## Agent panel

| Shortcut | Description                      |
| :------- | :------------------------------- |
| `⌘ ?`    | Show agent panel (not a toggle). |
| `⇧ ␛`    | Enlarge agent panel.             |
| `@`      | Add to context.                  |

## Code reviews

### Review uncommitted changes

You can look at uncommitted changes with `git: diff` and stage or restore them one by one.

### Review uncommitted changes by an agent

| Shortcut | Description     |
| :------- | :-------------- |
| `⌃ ⇧ R`  | Review changes. |

When the Zed agent has uncommitted changes, you will see a **Review changes** button in the chat.
This opens a view to accept or reject changes one by one. You can also open this view with the above
shortcut. Unfortunately, this view is not supported for external agents.

### Pull request review

One downside of Zed is that it does not yet have anything that matches
[GitHub's pull requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github).
You have to find a different workflow to do pull requests.

With `git: branch diff`, you can create a diff between the default branch and the branch you are on.
It is not yet possible to diff against another branch. This can be an issue if the branch you want
to merge into is not the default branch. In this case, you can point your local `HEAD` to another
branch.

Another great feature of this view is that you can create a diff and send it to your current agent
for a first round of code review.

Two more useful features for exploring a pull request are the Git graph and the file history, which
you can access for each file with a right-click.

There is currently no way to write review comments in Zed. You need to switch back to your Git
provider's website.

## Resolve merge conflicts

Zed has built-in merge conflict resolution (not tested yet).
