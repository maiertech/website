---
title: Zed guide
description: How to use Zed for agentic coding.
---

## Basic shortcuts

| Shortcut | Description         |
| :------- | :------------------ |
| `⌘ O`    | Open project.       |
| `⌥ ⌘ O`  | Open recent.        |
| `⌃ ⌘ B`  | Manage branches.    |
| `⌘ B`    | Toggle left dock.   |
| `⌘ R`    | Toggle right dock.  |
| `⌘ ⇧ E`  | Show project panel. |
| `⌘ ⇧ G`  | Show Git panel.     |
| `⌘ ⇧ B`  | Show outline panel. |
| `⌃ ↹`    | Tab switcher.       |

## Focused work

| Shortcut                            | Description                               |
| :---------------------------------- | :---------------------------------------- |
| `⇧ ␛`                               | Enlarge panel.                            |
| `workspace: toggle all docks`       | Keyboard shortcut does not work reliably. |
| `workspace: toggle centered layout` | Focus view.                               |

## Find and explore

| Shortcut    | Description                          |
| :---------- | :----------------------------------- |
| `⌘ P`       | Find and open file.                  |
| `⌘ F`       | Find in editor.                      |
| `⇧ ⌘ F`     | Find in project (string).            |
| `⌘ T`       | Go to symbol.                        |
| `⌘ K` `⌘ H` | Call hierarchy: show incoming calls. |

Search results are shown as multibuffers that can be augmented with an outline view on the side.

## Code navigation

| Shortcut | Description |
| :------- | :---------- |
| `⌃ G`    | Go to line. |

## Sidebar

| Shortcut | Description            |
| :------- | :--------------------- |
| `⇧ ⌘ A`  | Add folder to project. |

You can add multiple projects to the sidebar. A project is a GitHub repository. The sidebar shows
all agent sessions for a project, including sessions for worktrees. The idea of the sidebar is to
make switching between agent sessions seamless.

If you want an agent session to run on more than one project, you can add the folder of the second
project with the shortcut above. This creates a multi-root workspace.

## Agentic coding

### Agent sidebar

| Shortcut | Description     |
| :------- | :-------------- |
| `⌥ ⌘ J`  | Toggle sidebar. |

The sidebar shows agent sessions sorted per project. It falls short of alternative agentic IDEs. For
instance, it does not sort sessions by worktree. It also does not offer a workflow to archive all
sessions on a specific worktree once the worktree is removed. The sidebar starts behaving
erratically when archiving a session fails. That's why I don't use the sidebar at all.

### Using Zed as a harness

You can use Zed as a harness with [Zed agent](https://zed.dev/docs/ai/zed-agent). Most developers
already use another harness that they have tweaked, be it from one of the big labs or an alternative
such as [OpenCode](https://opencode.ai/). It makes little sense to use Zed as a harness because you
would have to configure skills and MCP servers again in Zed. Instead, it makes more sense to use
your harness of choice within Zed.

### Agent panel

| Shortcut | Description                     |
| :------- | :------------------------------ |
| `⌘ ?`    | Focus the agent panel.          |
| `⌘ N`    | New agent.                      |
| `@`      | Add to context.                 |
| `⌘ ⇧ >`  | Add selection to agent session. |

The agent panel is where you interact with your harness of choice. This can be via ACP integration
or via the terminal. For OpenCode, the ACP integration leaves much to be desired. That's why I use
OpenCode via the terminal. Other harnesses may give you a better ACP integration. For example, some
integrations let you accept or reject agent changes individually.

### Worktrees

| Shortcut | Description       |
| :------- | :---------------- |
| `⌃ ⌘ W`  | Manage worktrees. |

The default worktree directory configuration in Zed is

```json
{
	"git": {
		"worktree_directory": "../worktrees"
	}
}
```

By default, Zed co-locates worktrees with the main project directory. Inside the worktree directory,
Zed places the worktree in `project_name/worktree_name/project_name`. The
[second `project_name` is a bug](https://github.com/zed-industries/zed/issues/58055). But it's
currently not configurable.

A positive detail about Zed's worktree implementation is that you can create a worktree from an
existing branch. This is handy for code reviews.

## Code reviews

Check out the [code reviews guide](/guides/code-reviews).

## Configuration

| Directory                     | Type    |
| :---------------------------- | :------ |
| `.zed/settings.json`          | project |
| `~/.config/zed/settings.json` | global  |
