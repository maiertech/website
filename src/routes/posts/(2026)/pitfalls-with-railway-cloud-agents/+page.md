---
title: Pitfalls with Railway cloud agents
author: thilo
publishedDate: 2026-09-27
description: TODO
tags:
  - ai
  - productivity
---

I have been using [OpenCode](https://opencode.ai) as my harness at work and in my side projects for
a few months now. I don't have strong preferences about harnesses, as long as they let me avoid
getting locked into one of the big AI labs. A concern I have with any harness is that I am not
comfortable running it on the same laptop that stores my entire digital life. An agent going rogue
on my laptop could have really bad consequences.

## Local vs. cloud

The obvious solution is to move software development to a separate computer, be it in a local
sandbox, on hardware on the local network, or in the cloud. I have been dealing with this idea on
and off for more than a decade. But at one point I came to the conclusion that local development
with no layers between me and my code is the way to go. However, agentic development (and frequent
supply chain attacks on dependencies) made me revisit this topic.

If you are following AI FOMO content in podcasts and on YouTube, you might think that spending
between a few hundred and a few thousand bucks on a local server to run your agents or AI models is
the most normal thing to do.

When I read about [Railway cloud agents](https://docs.railway.com/cloud-agents), I thought that this
was the perfect opportunity to test a workflow where agents do not run on my laptop, without having
to make a big upfront investment. The idea of cloud agents is simple: Railway helps you spin up a VM
with your favorite harness installed, your global skills installed, and authentication with your
model provider configured. And then you just do what you would do locally on the cloud agent VM.

Let's dive a little bit deeper into how Railway cloud agents work.

## Cloud agent preferences

Make sure you have the [Railway CLI](https://docs.railway.com/cli) installed and are logged in. I
use OpenCode in the examples. You can use any of the supported agents instead.

You need to do a one-time setup to configure your preferences for Railway cloud agents. Run

```bash
railway ca setup
```

This creates `~/.railway/agent-prefs.json`:

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
		"projectId": "<projectId>",
		"projectName": "Cloud Agents",
		"environmentId": "<environmentId>",
		"environmentName": "production"
	},
	"theme": "terminal"
}
```

This configuration makes sure that OpenCode is configured and your global skills are copied into the
cloud agent. If you want to change your preferences, rerun `railway ca setup`. Now we are ready to
create cloud agents.

## Creating and managing cloud agents

Cloud agents cost nothing when they do not run. But you are billed as soon as you start one. You
have to actively pause a cloud agent to avoid being charged. That's a potential footgun because an
always-on VM on Railway is not cheap.

Spin up a new cloud agent with

```bash
railway code --opencode --new --name <agent-name>
```

Railway automatically connects to the cloud agent and spins up OpenCode. If you want to get any
serious work done on the cloud agent, you should add an entry to your `~/.ssh/config`. You can do
this with a stupid little hack:

```bash
railway ca desktop --opencode --agent website --dry-run
```

Copy the displayed SSH connection, `railway-agent-<agent-name>`, into your `~/.ssh/config`. This
assumes that you already have an SSH key configured that Railway can reuse. In my generated
configuration, I had a bad line and had to replace

```bash
IdentityFile /path/to/.ssh/id_ed25519.pub
```

with

```bash
IdentityFile /path/to/.ssh/id_ed25519
```

You need to reference the private key. Now run

```bash
ssh railway-agent-<agent-name>
```

The cloud agent will spin up OpenCode for you. You can also SSH into your cloud agent with
[Zed remote development](https://zed.dev/docs/remote-development) or [Herdr](https://herdr.dev/).
It's important to note that at this point you are authenticated with OpenCode, and if you have a Go
subscription, you will be able to use it. That's pretty neat.

The downside is that nothing else is configured: any OpenCode customizations are not carried over,
no repository is cloned to the cloud agent, and other configurations, such as authenticating with a
private NPM registry, are not carried over. Some configurations are easy to set up via SSH, and they
won't get lost as long as you do not delete your cloud agent. But environment variables cannot be
added to a running cloud agent, which means you need to be mindful of which environment variables
you will need when you create a new cloud agent.

To wrap up this section, here is an overview of the commands you need to manage your cloud agents.

| Command                                 | Description                                      |
| --------------------------------------- | ------------------------------------------------ |
| `railway ca list`                       | List all servers.                                |
| `railway code get-config <server_name>` | Get the configuration for a server.              |
| `railway ca wake <server_name>`         | Wake up an existing server (billing starts).     |
| `railway ca sleep <server_name>`        | Put an existing server to sleep (billing stops). |
| `railway ca ssh <server_name>`          | SSH into a server.                               |
| `railway ca delete <server_name>`       | Delete a server.                                 |

## Potential pitfalls

- I used to like the idea of disposable workspaces that I pitched in my post
  [A better development workflow with disposable workspaces](/posts/a-better-development-workflow-with-disposable-workspaces).
  Cloud agents seem like a natural fit: you create one for each task and throw it away when you are
  done. But this approach only works if cloud agents are as convenient as local development. Every
  additional layer of abstraction and indirection makes local development feel like the better
  option.
- I don't mind configuring a physical piece of hardware as a one-off: the configuration is stored on
  the device and won't go anywhere. Although cloud agents persist configurations when put to sleep,
  they still feel ephemeral and brittle. Before long, you will have to do the configuration all over
  again, because you forgot to add an environment variable when you created the cloud agent. To be
  fair, this will only get better as Railway improves the developer experience.
- If you run multiple cloud agents or, God forbid, forget to turn off a cloud agent, you will feel
  the billing pain. How much extra are you willing to spend each month on cloud-agent compute, on
  top of your agent subscription? I would argue that if you spent only $20 per month on cloud agent
  compute, you would have a business case to buy a beefy mini PC.

## Conclusion

Railway cloud agents sound like an appealing option for agentic development. They isolate agents
from my laptop and home network, which is exactly what I was looking for. But they also add friction
and latency to my development workflow. Cloud agents feel like GitHub Codespaces reloaded for the
agentic age. Metered usage does not make sense for heavy users. Just go and buy a Mac mini. You will
break even pretty fast. But if you just want to try out remote agentic workflows without making a
hardware commitment, spending a few bucks on Railway cloud agents is a great option.
