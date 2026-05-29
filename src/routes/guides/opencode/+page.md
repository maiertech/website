---
title: OpenCode
description: How to use and configure OpenCode.
---

## Running OpenCode

### OpenCode in the terminal

I run OpenCode in the terminal only to configure it, e.g. to connect to LLM providers with API keys.

### OpenCode via ACP in Zed

With this option I get access to all OpenCode Go models while enjoying a polished integration with
Zed:

- Access project skills in `.agent/skills` and global skills in `~/.agent/skills`.
- Access MCP servers configured for Zed and in `~/.config/opencode/opencode.jsonc`.
- No pull request-style reviews for agent code changes.

### OpenCode models in Zed agent

With this option I can access a subset of OpenCode Go models:

- Access project skills in `.agent/skills` and global skills in `~/.agent/skills`.
- Access MCP servers configured for Zed.
- Pull-request-style reviews for agent code changes.

## OpenCode Go models

For coding I currently use these models:

- opencode-go/qwen3.7-max (default)
- opencode-go/kimi-k2.6
- opencode-go/glm-5.1

## Configuration

### Default model

```json
{
	"model": "opencode-go/qwen3.7-max"
}
```

### MCP servers

Since I use OpenCode within Zed only, there is no real point configuring MCP servers for OpenCode.
It makes sense to configure MCP servers in Zed instead. For reference, two MCP server examples.

#### Railway MCP server

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

#### Context7 MCP server

```json
{
	"mcp": {
		"context7": {
			"type": "remote",
			"url": "https://mcp.context7.com/mcp"
		}
	}
}
```

This MCP server is a remote server.
