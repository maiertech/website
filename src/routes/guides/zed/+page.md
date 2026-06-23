---
title: Zed guide
description: How to use Zed for agentic coding.
---

## Project navigation

| Shortcut | Description            |
| :------- | :--------------------- |
| `⌘ O`    | Open project.          |
| `⌥ ⌘ O`  | Open recent.           |
| `⌃ ⌘ W`  | Manage worktrees.      |
| `⌃ ⌘ B`  | Manage branches.       |
| `⌘ B`    | Toggle left dock.      |
| `⌘ R`    | Toggle right dock.     |
| `⌘ ⇧ E`  | Show project panel.    |
| `⌘ ⇧ G`  | Show Git panel.        |
| `⌘ ⇧ B`  | Show outline panel.    |
| `⌥ ⌘ J`  | Toggle sidebar.        |
| `⌘ ?`    | Focus the agent panel. |
| `⌃ ↹`    | Tab switcher.          |

## Focus

| Shortcut                            | Description                               |
| :---------------------------------- | :---------------------------------------- |
| `⇧ ␛`                               | Enlarge panel.                            |
| `workspace: toggle all docks`       | Keyboard shortcut does not work reliably. |
| `workspace: toggle centered layout` | Focus view.                               |

## Finding

| Shortcut                      | Description                   |
| :---------------------------- | :---------------------------- |
| `⌘ P`                         | Find and open file.           |
| `⌘ F`                         | Find in editor.               |
| `⇧ ⌘ F`                       | Find in project (string).     |
| `⌘ T`                         | Go to symbol.                 |
| `editor: find all references` | Starts with symbol at cursor. |

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

## Agent panel

The agent panel is where you interact with the agent. Agent integration varies across providers. For
example, not all agents support code reviews where changes can be accepted or rejected individually.

| Shortcut | Description                     |
| :------- | :------------------------------ |
| `⌘ N`    | New agent.                      |
| `@`      | Add to context.                 |
| `⌘ ⇧ >`  | Add selection to agent session. |

## Worktrees

Worktree support in Zed has been usable since version 1.0. Using Git worktrees to isolate workspaces
within the same project is seamless. Click the branch name at the top to create a headless worktree,
then add a branch.

Zed keeps all worktrees in a configurable folder and is opinionated about how worktrees are
organized within it. Since you can switch between worktrees in the UI, you don't need to worry about
where worktrees are located.

## Code reviews

Check out the [code reviews guide](/guides/code-reviews).

## Configuration

| Directory                     | Type    |
| :---------------------------- | :------ |
| `.zed/settings.json`          | project |
| `~/.config/zed/settings.json` | global  |

### MCP servers

You need to decide whether an MCP server should be defined as a global server or a project server.

#### Context7 MCP server

This MCP server should be installed as a global server:

```json
{
	"context_servers": {
		"context7": {
			"url": "https://mcp.context7.com/mcp"
		}
	}
}
```

It is a remote MCP server with rate limiting when used without authentication.

#### GitHub MCP server

The GitHub MCP server should be defined as a global server. This configuration should work:

```json
{
	"context_servers": {
		"github": {
			"url": "https://api.githubcopilot.com/mcp/"
		}
	}
}
```

This config should prompt you to log in with your GitHub credentials. But because of a bug with
GitHub's MCP server, this does not work. Instead you have to install the GitHub MCP server
extension, which adds this config:

```json
{
	"context_servers": {
		"mcp-server-github": {
			"enabled": true,
			"remote": false,
			"settings": {
				// Zed settings token.
				"github_personal_access_token": "token"
			}
		}
	}
}
```

The extension runs an MCP server that communicates with GitHub locally.

#### Railway MCP server

The Railway MCP server should be defined as a global server:

```json
{
	"context_servers": {
		"railway": {
			"command": "railway",
			"args": ["mcp"]
		}
	}
}
```

It requires the Railway CLI to be installed, which runs the MCP server locally.

#### Svelte MCP server

This MCP server should be defined as a project server:

```json
{
	"context_servers": {
		"Svelte": {
			"command": "npx",
			"args": ["-y", "@sveltejs/mcp"]
		}
	}
}
```

This is a local MCP server that runs on demand via `npx`.
