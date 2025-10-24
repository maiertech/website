---
id: 7554f455-59b8-4522-aaa2-c461e007404a
title: Using GitHub Copilot in the terminal
description:
  Add GitHub Copilot support to any terminal with the GitHub CLI to enable command suggestions and
  explanations.
publishedDate: 2025-08-12
link: 'https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli'
---

If you already use GitHub Copilot, there is an easy way to add Copilot to any terminal, not just
inside VS Code:

1. Install the [GitHub CLI](https://cli.github.com/).
2. Run `gh auth login` to log in to GitHub.
3. Run `gh extension install github/gh-copilot` to add the Copilot extension to the GitHub CLI.

You can then run `gh copilot explain` followed by a command in `""` to explain the command. Or you
can run `gh copilot suggest` with an explanation in `""` of what you want to do in the terminal.

Copilot does not have permission to run any commands it suggests. There is a simple text-based UI
that guides you through your options. The Copilot extension does not auto-update. You have to run
`gh extension upgrade gh-copilot` to upgrade the extension.

Copilot support via the GitHub CLI is better than not having any AI support, but using Copilot
within VS Code's terminal gives you much better context and better UI ergonomics.
