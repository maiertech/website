---
title: Code Reviews
description: How to review code in agentic workflows.
---

## Agent diff reviews

When using Zed agent, you have full agent diff support. This means that you (the human) review code
created by an agent. Make many small code reviews while you iterate with the agent.

Agent diff support varies across ACP integrations in Zed:

- The ACP OpenCode integration does not support agent diffs.
- Additionally, you cannot run all OpenCode Go models in Zed agent, which means that for some
  OpenCode Go models there is no way to get agent diffs.
- The workaround for missing agent diffs is to commit uncommitted changes before a prompt. Then you
  can use Zed's `git: diff` to review the agent's changes.

## Pull request reviews

When you review a pull request, you often don't know whether it was created by a human or an agent.
Before starting an in-depth review, you need to figure out whether it is worth spending your time on
this PR.

Therefore, your first step should be to use an agent to read the issue and the pull request
description. Then you copy the branch diff into the chat and let the agent assess whether it is
worth reviewing this PR.

Use `git: branch diff` to create a branch diff. You can choose the branch to diff against. You can
send this diff to the chat, but Zed will always open a new chat with a review prompt and the branch
diff attached. But what you really want is to add the branch diff to the chat that has the issue and
PR description as context. You can copy-paste the branch diff into your original chat.

Once a PR passes the first assessment, there are a couple of things you can do:

- Run `git: branch diff` to do a manual code review. You can't nicely tick off reviewed files in Zed
  like in VS Code. You can just fold away a reviewed file or tick it off in the pull request on the
  Git provider's website.
- It's not possible to add review comments in Zed directly. You need to add them on the Git
  provider's website as well.
- It's always a good idea to ask an agent to look at the branch diff and suggest what to focus on in
  the review.
