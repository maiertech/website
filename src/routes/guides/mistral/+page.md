---
title: Mistral guide
description: How setup and configure Mistral.
---

## Mistral Vibe CLI

Install with `brew install mistral-vibe`. Generate an API key
[here](https://console.mistral.ai/codestral/cli). This creates an API key of type `Vibe`, which you
can manage [here](https://admin.mistral.ai/organization/api-keys).

Then run

```sh
vibe --setup
```

and paste the generated API key when prompted.

## Use Mistral Vibe with Zed

You have two options for using Mistral Vibe with Zed:

1. Install Mistral Vibe from the Zed ACP registry. With the configuration from the previous step,
   there is nothing else you need to configure.
2. You can also use Mistral with Zed's agent. Create an API key
   [here](https://admin.mistral.ai/organization/workspaces?profile_dialog=api-keys) and copy it into
   the Mistral config (Zed LLM Providers).

## Directories

| Directory        | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| `.agents/skills` | workspace | Cross-harness skills directory. |
| `~/.vibe/skills` | global    | Global skills directory.        |
| `.vibe/mcp`      | workspace | Workspace MCP directory.        |
| `~/.vibe/mcp`    | global    | Global MCP directory.           |
