---
title: Dev server
description: How to configure a Linux dev server.
---

## Ubuntu

While many people probably just run their remote dev server with `root`, let's create a user with

```bash
sudo adduser <username>
```

and assign a password. Give that user `sudo` privileges:

```bash
sudo usermod -aG sudo <username>
```

In the Hetzner console, we assigned the server a public key that is used to SSH into the server as
the root user. We will reuse the same key for the newly created user:

```bash
mkdir -p /home/<username>/.ssh
cp /root/.ssh/authorized_keys /home/<username>/.ssh/authorized_keys
chown -R <username>:<username> /home/<username>/.ssh
chmod 700 /home/<username>/.ssh
chmod 600 /home/<username>/.ssh/authorized_keys
```

Next, SSH into the server as the new user and run `sudo -v` to verify that the user has `sudo`
privileges.

Since we create the Hetzner base image with an SSH key, the root user is not allowed to log in with
a username and password. This is good enough protection to justify allowing the root user to log in
via SSH, just in case we need to recover.

Last but not least, run

```bash
sudo apt update
sudo apt upgrade
```

## Install Homebrew

SSH into the server and run the official installation script from https://brew.sh/. A successful
installation will end with a warning prompting you to complete the following next steps:

```bash
==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
    echo >> /home/thilo/.bashrc
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> /home/thilo/.bashrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"
- Install Homebrew's dependencies if you have sudo access:
    sudo apt-get install build-essential
  For more information, see:
    https://docs.brew.sh/Homebrew-on-Linux
- Run brew help to get started
- Further documentation:
    https://docs.brew.sh
```

Run `brew doctor` to verify that Homebrew is installed correctly and `brew analytics off` to turn
off analytics permanently.

## Git

Run

```bash
brew install git
```

to override the system Git.

## GitHub token

Add the following line to the end of `.bashrc`:

```bash
export GH_TOKEN="<token>"
```

Name it `GH_TOKEN`, not `GITHUB_TOKEN` since the latter triggers OpenCode to list Copilot models
when using `/model`. `GH_TOKEN` gets `repo` for the GitHub MCP and in my case also `read:packages`
to access a private registry.

## OpenCode

Run

```bash
brew install anomalyco/tap/opencode-v2
```

Then run `opencode`, run `/connect`, and connect to the OpenCode Console. Add
`~/.config/opencode/opencode.jsonc`:

```jsonc
{
	"$schema": "https://opencode.ai/config.json",
	"policies": [
		// Turn off OpenCode Zen models.
		{ "action": "provider.use", "resource": "opencode", "effect": "deny" }
	],
	"model": "opencode-go/claude-haiku-5-5", // https://opencode.ai/docs/go/#endpoints.
	"default_agent": "plan",
	"mcp": {
		"servers": {
			"github": {
				"type": "remote",
				"url": "https://api.githubcopilot.com/mcp/",
				"disabled": false,
				"oauth": false,
				"headers": {
					"Authorization": "Bearer {env:GH_TOKEN}"
				}
			}
		}
	}
}
```

And then `~/.config/opencode/cli.jsonc`:

```jsonc
{
	"$schema": "https://opencode.ai/v2/cli.json",
	"theme": {
		"name": "opencode"
	},
	"diffs": {
		"wrap": "word"
	},
	"session": {
		"sidebar": "auto",
		"scrollbar": false,
		"thinking": "show"
	},
	"animations": true,
	"prompt": {
		"paste": "full"
	}
}
```

Restart your terminal to ensure it picks up `GH_TOKEN` and run

```bash
opencode service restart
```

OpenCode should now recognize the GitHub MCP server.

## GitHub CLI

While OpenCode will be using the GitHub MCP server to interact with GitHub, we still need the GitHub
CLI for human GitHub interactions. Run

```bash
brew install gh
```

and then

```bash
gh auth login
```

Choose **Login with a web browser** and then **HTTPS**. Open https://github.com/login/device in a
local browser and copy and paste the code from the dev server.

## Git config

Add `~/.gitconfig`:

```toml
[user]
	name = <firstname-lastname>
	email = <email>

[init]
	defaultBranch = main

[pull]
	# Default to rebasing on pulls.
	rebase = true

[fetch]
	# Always prune when fetching (and pulling).
	prune = true

[core]
	editor = nano # zed --wait will not work.

[credential "https://github.com"]
	helper =
	helper = !/home/linuxbrew/.linuxbrew/bin/gh auth git-credential

[credential "https://gist.github.com"]
	helper =
	helper = !/home/linuxbrew/.linuxbrew/bin/gh auth git-credential
```

Verify the configuration by running `git config -l` and checking that `user.email` is correct.

## Node and PNPM

Run

```bash
brew install node
brew install pnpm
```

To make sure that all projects can access the private GitHub registry, add `~/.npmrc`:

```bash
//npm.pkg.github.com/:_authToken=${GH_TOKEN}
```

## Skills

Install the Skills CLI with

```bash
brew install skills
```

and then run

```bash
skills add mattpocock/skills
```

If OpenCode does not recognize the skills run

```bash
opencode service restart
```
