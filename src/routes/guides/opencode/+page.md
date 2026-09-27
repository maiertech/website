---
title: OpenCode
description: How to use and configure OpenCode.
---

OpenCode is my harness of choice. Whether I work with Zed or in the terminal, I always use OpenCode
with the same configuration.

## Skills

- Global skills go in `~/.agent/skills`.
- Project skills go in `.agent/skills`.

## Config

- The global configuration goes in `~/.config/opencode/opencode.jsonc`.
- Project overrides go in `.opencode/opencode.jsonc`.

A project config is merged with the global config, and project overrides take precedence. OpenCode
picks up the configuration no matter whether you use it in the terminal or via ACP in Zed.

### Default model

You can set the default model with

```json
{
	"model": "opencode-go/glm-5.3-flash"
}
```

and look up the model IDs [here](https://opencode.ai/docs/go/#endpoints). Pricing information
(including inference promotions) is listed [here](https://opencode.ai/go).

### Disabled providers

You can disable providers with

```json
{
	"disabled_providers": ["opencode"]
}
```

This one turns off OpenCode Zen models.

### Voice dictation

To make voice dictation work properly with OpenCode, disable past summaries:

```json
{
	"experimental": {
		"disable_paste_summary": true
	}
}
```

### MCP servers

For MCP servers, you need to decide whether they belong in the global or project config.

#### GitHub

```json
{
	"mcp": {
		"github": {
			"type": "remote",
			"url": "https://api.githubcopilot.com/mcp/",
			"enabled": true,
			"oauth": false,
			"headers": {
				"Authorization": "Bearer {env:GITHUB_TOKEN}"
			}
		}
	}
}
```

#### Railway

```json
{
	"mcp": {
		"railway": {
			"type": "local",
			"command": ["railway", "mcp"]
		}
	}
}
```

This requires the Railway CLI to be installed locally.
