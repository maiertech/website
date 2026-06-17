---
title: Code Reviews
description: How to review code in agentic workflows.
---

## Agent diff reviews

When using Zed agent, you have full agent diff support. This means that you (the human) review code
created by an agent. Make many small code reviews while you iterate with the agent.

Agent diff support varies across ACP integrations in Zed:

- The OpenCode ACP integration does not support agent diffs. But OpenCode models that run inside the
  Zed agent do support agent diffs.
- The workaround for missing agent diffs is to commit uncommitted changes before a prompt. Then you
  can use Zed's `git: diff` (project diff) to review the agent's changes.

## Pull request reviews

When you review a pull request, you often don't know whether it was created by a human or an agent.
Before starting an in-depth review, you need to figure out whether it is worth spending your time on
this pull request.

Therefore, your first step should be to use an agent to read the issue and the pull request
description. Add the branch diff (diff between the pull request branch and the default branch,
usually `origin/main`) with `@Branch Diff`. Let the agent assess whether it is worth reviewing this
pull request.

You can also use `git: branch diff` to create a branch diff. In this view, you can choose the branch
to diff against. You can send this diff to the chat, but Zed will always open a new chat with a
review prompt and the branch diff attached. This way, you can't add a branch diff to an existing
chat.

Once a pull request passes the first assessment, there are a couple of things you can do:

- Do a manual code review on the branch diff. You can't tick off reviewed files in Zed like in VS
  Code. Instead, you need to tick off reviewed files on the pull request page on the Git provider's
  website.
- It's not possible to add review comments in Zed directly. You also need to add them on the Git
  provider's pull request page.
- It's always a good idea to ask an agent to look at the branch diff and suggest what to focus on in
  the review.
