---
title: MCP guide
description: How to setup and configure MCP servers.
---

In the [Skills guide](/guides/skills) I mentioned that the `.agents/skills` workspace directory is a
convention that many agents honor. Unfortunately, there is no such standardization for MCP servers.

## How do I configure MCP servers?

1. **Option 1 (agent-vendor-specific workspace config):** Add an agent-vendor-specific config to
   your workspace. You will have to add one config per agent, e.g. `.vibe/config.toml` for Mistral
   Vibe. Since you cannot share MCP server configs across agents, you will have to add multiple
   workspace configs if you want to use multiple agents. If you configure an MCP server for Zed by
   adding it to `.zed/settings.json` in your workspace, you can at least share the MCP server config
   with every model supported by the Zed agent.

2. **Option 2 (agent-vendor-specific global configs):** Every agent vendor offers a custom way to
   configure an MCP server globally in your home directory. Again, you have to add one config per
   agent vendor. Like before, you can add MCP servers to `~/.config/zed/settings.json`, which makes
   them available to every model supported by the Zed agent.

3. **Option 3 (use MCP server extensions):** A selection of MCP servers can be installed as
   extensions in Zed. This makes them available globally to the Zed agent and all supported models.

## Configuration examples

### Svelte MCP server

This MCP server makes most sense when configured in a workspace. For Zed, you need to add
`.zed/settings.json` to your workspace with the following config:

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

For Mistral Vibe support, you need to add `.vibe/config.toml` with the following config:

```toml
[[mcp_servers]]
name = "Svelte"
transport = "stdio"
command = "npx"
args = ["-y", "@sveltejs/mcp"]
```

### GitHub MCP server

This one is not project-specific and should be added globally. You can install it as an extension in
Zed. This results in this config in `~/.config/zed/settings.json`:

```json
  "context_servers": {
    "mcp-server-github": {
      "enabled": true,
      "remote": false,
      "settings": {
        "github_personal_access_token": "token",
      },
    },
  },
```

Token permissions depend on what you want to do with the MCP server. Start with `repo` permissions
for read-only access.
