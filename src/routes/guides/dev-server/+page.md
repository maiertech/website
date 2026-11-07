---
title: Dev server
description: How to configure a Linux dev server.
---

## Ubuntu

- Your user is `root`. No other users are configured.
- Clone projects into `/root/projects`.
- Run `sudo apt update` and `sudo apt upgrade` regularly.
- Connect with Zed to edit files.

## GitHub CLI

The GitHub CLI handles human access to GitHub on the dev server. The agent uses the GitHub MCP
server instead. Install it by following the Debian/Ubuntu instructions:

https://github.com/cli/cli/blob/trunk/docs/install_linux.md

To update, run `sudo apt update` and then `sudo apt install gh`.

To authenticate, run `gh auth login` and choose `https`. The command prints a URL and an auth code.
Open the URL in a browser on your local laptop and enter the code there.

## Git config

Add `~/.gitconfig`:

```ini
[user]
	name = <username>
	email = <email>

[github]
	# GitHub username for command-line tools.
	user = <username>

[init]
	defaultBranch = main

[color]
	# Colour terminal command output when possible.
	ui = auto

[pull]
	# Default to rebasing on pulls.
	rebase = true

[fetch]
	# Always prune when fetching (and pulling).
	prune = true

[core]
	editor = zed --wait

[credential "https://github.com"]
	helper =
	helper = !/usr/bin/gh auth git-credential

[credential "https://gist.github.com"]
	helper =
	helper = !/usr/bin/gh auth git-credential
```

Verify it by running `git config -l` in a git repository and checking that `user.email` is correct.

## OpenCode

Install OpenCode by running:

```bash
curl -fsSL https://opencode.ai/v2/install | bash
```

Then run `opencode`, run `/connect`, and connect to the OpenCode Console. Docs:
https://opencode.ai/docs/

Add `~/.config/opencode/opencode.jsonc`. Model IDs are listed at
https://opencode.ai/docs/go/#endpoints.

```jsonc
{
	"$schema": "https://opencode.ai/config.json",
	"policies": [
		// Turn off OpenCode Zen models.
		{ "action": "provider.use", "resource": "opencode", "effect": "deny" }
	],
	"model": "opencode-go/claude-haiku-5-5",
	"default_agent": "plan",
	"mcp": {
		"servers": {
			"github": {
				"type": "remote",
				"url": "https://api.githubcopilot.com/mcp/",
				"disabled": false,
				"oauth": false,
				"headers": {
					// Reads the token from ~/.config/opencode/GITHUB_TOKEN (see below).
					"Authorization": "Bearer {file:./GITHUB_TOKEN}"
				}
			}
		}
	}
}
```

Add `~/.config/opencode/cli.jsonc`:

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

### GitHub token

Do not set `GITHUB_TOKEN` in `.bashrc`. It only applies to interactive shells, and Zed starts a
non-interactive shell. Instead, store the token in a file that OpenCode reads. This keeps the token
out of the global environment.

1. Create `~/.config/opencode/.editorconfig` before the token file, so Zed applies it:

   ```ini
   [GITHUB_TOKEN]
   insert_final_newline = false
   ```

   This stops Zed from adding a final newline, so the token file contains only the token.

2. In Zed, create `~/.config/opencode/GITHUB_TOKEN` and paste in a GitHub API token.

3. Restrict the file to your user:

   ```bash
   chmod 600 ~/.config/opencode/GITHUB_TOKEN
   ```

## Node

1. Run `sudo apt update` and `sudo apt install unzip`.
2. Run the official fnm install script: https://github.com/Schniz/fnm
3. In a new shell, `fnm --version` should print a version.
4. Run `fnm install 26` and then `fnm default 26` to make Node 26 the global default.

## PNPM

Run the official PNPM installation script: https://pnpm.io/installation

## GitHub registry

Add `~/.npmrc`, replacing `token` with a GitHub token that has the `read:packages` scope:

```ini
//npm.pkg.github.com/:_authToken=token
```

## Skills

Run:

```bash
npx skills add mattpocock/skills
```
