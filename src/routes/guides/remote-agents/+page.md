---
title: Remote Agents
description: How to use Railway Cloud Agents.
---

In order to reduce the risk of an agent going rogue on my laptop, I run my agents on another
computer. This guide describes how to do this in the cloud with Railway Cloud Agents.

## Agent preferences

You need to do a one-time setup to configure your preferences for Railway cloud agents. Run

```bash
railway ca setup
```

which creates `~/.railway/agent-prefs.json`:

```json
{
	"version": 1,
	"agent": "opencode",
	"skills": {
		"enabled": true,
		"source": "universal"
	},
	"mcp": {
		"enabled": true
	},
	"defaultProject": {
		"projectId": "projectId",
		"projectName": "Cloud Agents",
		"environmentId": "environmentId",
		"environmentName": "production"
	},
	"theme": "terminal"
}
```

This configuration makes sure that OpenCode is configured and your global skills are copied into the
cloud agent. If you want to change your preferences, rerun `railway ca setup`.

## Creating a cloud agent

Since cloud agents cost nothing when you do not run them, I create one cloud agent per GitHub
repository. Let's take repository [maiertech/website](https://github.com/maiertech/website) as an
example. Create a new cloud agent with

```bash
railway code --opencode --new --name opencode-ca
```

and quite the cloud agent. Note that at this point you are billed for the cloud agent until you put
it to sleep. Now you need to add the cloud agent to your local SSH config:

```bash
railway ca desktop --opencode --agent website --dry-run
```

Copy the displayed SSH connection `railway-agent-website` in your `~/.ssh/config`. This assumes that
you already have an SSH key configured that can be reused. In my configuration I had a bad line in
the generated SSH config. I had to replace

```bash
IdentityFile /Users/thilo/.ssh/id_ed25519.pub
```

with

```bash
IdentityFile /Users/thilo/.ssh/id_ed25519
```

Now run

```bash
ssh railway-agent-website
```

and check if you have access to your OpenCode Go subscription. Next, I add the following lines to
the top of `/root/.config/opencode/opencode.jsonc`:

```jsonc
"$schema": "https://opencode.ai/config.json",
"disabled_providers": ["opencode"],
"model": "opencode-go/gpt-6-luna",
"default_agent": "plan",
```

And last but not least, need to clone the repository into `/app/website` using the GitHub CLI.

## Commands

| Command                                 | Description                                      |
| --------------------------------------- | ------------------------------------------------ |
| `railway ca list`                       | List all servers.                                |
| `railway code get-config <server_name>` | Get the configuration for a server.              |
| `railway ca wake <server_name>`         | Wake up an existing server (billing starts).     |
| `railway ca sleep <server_name>`        | Put an existing server to sleep (billing stops). |
| `railway ca ssh <server_name>`          | SSH into a server.                               |
| `railway ca delete <server_name>`       | Delete a server.                                 |

## Why remote agents suck

- Agent web search does not originate from a residential IP.
- I like the idea of a disposable code agent. But the reality is that I have to custmize too many
  settings before I can use a cloud agent, e.g. OpenCode settings or auth to a private NPM registry.
- If you forget to turn an agent off, it gets prohibitively expensive.
