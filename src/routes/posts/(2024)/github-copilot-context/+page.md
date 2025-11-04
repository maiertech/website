---
title: How to provide better context in GitHub Copilot prompts
author: thilo
publishedDate: 2024-11-15
description:
  Learn to provide better context in GitHub Copilot prompts using inline chat, context shortcuts,
  chat participants, and project instructions for improved AI suggestions.
tags:
  - ai
  - github
---

GitHub Copilot is an AI-powered coding assistant for VS Code that was released in October 2021. I've
been using it for a while but couldn't really warm up to it. While I had occasional "wow" moments, I
often found myself wrestling with Copilot. But I have to admit, I was using Copilot without ever
reading the docs. After all, it's AI and shouldn't need a manual, right? Big mistake!

In this post, I will share how to provide better context in Copilot prompts, which dramatically
increased the perceived quality of the suggestions Copilot makes.

## Why context matters for AI models

When an AI model delivers poor results, it's often because it lacks context. For any AI model, if
you are not happy with a response, ask yourself whether you provided enough context.

At the same time, providing good context is easier said than done. That's because there are no clear
rules on how to write good prompts. It's mostly trial and error. However, the tooling around an AI
model should make it easy to provide better context. That's why Copilot offers several ways to
provide better context.

## GitHub Copilot's four ways

GitHub Copilot offers four modes of interacting with it and providing context. In the following
sections, I will explain how to provide context effectively in each mode.

### Code completion

While you type, Copilot makes suggestions in the form of ghost text. You can respond to these
suggestions with the following keyboard shortcuts:

| Shortcut | Description                                  |
| :------- | :------------------------------------------- |
| ⇥        | Accept ghost text.                           |
| ⌘→       | Accept ghost text bit by bit.                |
| ␛        | Cancel suggestion.                           |
| ⌘⏎       | Show alternative suggestions (if available). |

The default context is always the current file. Other than that, you can't add additional context in
this mode. But you can always add Copilot instructions to your project, which I will discuss further
down.

### Inline Chat

Hit `⌘I` at your current cursor position, or after making a selection, and write a prompt. Inline
chat is useful for small code additions or refactorings. You can use Copilot's most powerful
shortcut to add context: `⌘/`. You can add any workspace file to the context. You can also add the
entire codebase to the context, but chances are that this is not specific enough and will not
improve Copilot suggestions.

You can also use one of the following commands at the beginning of your prompt. These commands work
best on a selection. Think of a command as a prompt shortcut. The commands are:

| Command    | Description                               |
| :--------- | :---------------------------------------- |
| `/explain` | Explain the code.                         |
| `/fix`     | Fix the selected code.                    |
| `/tests`   | Write unit tests for the selected code.   |
| `/docs`    | Add a code comment to the current symbol. |

### Ask Copilot chat

This is the original Copilot chat without the ability to edit code. You should be aware of the
following shortcuts:

| Shortcut | Description                   |
| :------- | :---------------------------- |
| ^⌘I      | Open and close the chat.      |
| ^L       | Clear the chat.               |
| ⌥⌘B      | Toggle the secondary sidebar. |

The default context in Ask Copilot is always the current file and the current selection. You can
augment the context by adding these variables to your prompt:

| Context      | Description            |
| :----------- | :--------------------- |
| `#selection` | Add current selection. |
| `#editor`    | Add current editor.    |
| `#file`      | Add a file.            |
| `#codebase`  | Add entire codebase.   |

Of course, you can also just use `⌘/` instead, just like in the inline chat.

Ask Copilot comes with four experts (referred to as chat participants in the docs). You can tag one
of them with `@` at the beginning of your prompt. The experts are:

| Participant  | Expertise                                                 |
| :----------- | :-------------------------------------------------------- |
| `@workspace` | Answers questions about the workspace.                    |
| `@vscode`    | Answers questions about VS Code.                          |
| `@github`    | Answers questions about the repo and can do a web search. |
| `@terminal`  | Answers questions about the terminal.                     |

Tagging a chat participant also gives Copilot more context about your prompt. Some participants can
be combined with commands. Here are some examples:

| Command                   | Description                               |
| :------------------------ | :---------------------------------------- |
| `@workspace /explain`     | Explain the current editor or selections. |
| `@workspace /fix`         | Fix the selected code.                    |
| `@workspace /new`         | Scaffold a new file or project.           |
| `@vscode /search`         | Search within workspace.                  |
| `@vscode /startDebugging` | Create a debug config.                    |
| `@terminal /explain`      | Explain something in the terminal.        |

You can display available commands by typing the participant, e.g., `@workspace`. You can also use
these commands without tagging a participant. VS Code will infer the participant whenever possible.

Lastly, there are two more commands that do not add context but are useful: `/clear` clears the chat
and `/help` shows participants and commands.

### Copilot Edits chat

Copilot Edits is the latest addition to Copilot. It adds the ability to let Copilot make edit
suggestions for one or more files. While this is super powerful, a second chat also adds confusion.
Not everything discussed in the previous section for Ask Copilot works in Copilot Edits. The
shortcut `⌘/` works as you would expect.

At this point, it is not really clear to me how Ask Copilot and Copilot Edits will be consolidated
in the future. In any case, you should remember the following shortcuts:

| Shortcut | Description                   |
| :------- | :---------------------------- |
| ⇧⌘I      | Open Copilot Edits.           |
| ⌥⌘B      | Toggle the secondary sidebar. |

Weirdly, there is no shortcut to start a new Copilot Edits session. You need to click on `+` to
start a new session.

### Copilot instructions

Last but not least, you can add global context by adding a project-specific
`.github/copilot-instructions.md` with information about your project. There is no right or wrong
for what to put in this file. But I recommend adding a few points about the tech stack and the
non-technical context. Copilot will add the content of this file to every prompt as context. Here is
an example of what I put in my `copilot-instructions.md` for the repository for this website:

```markdown
- This website is a personal blog.
- The writing style for posts is concise, to the point, and not too formal.
- The website is built with Svelte v4 and SvelteKit v2.
- It uses Mdsvex to author posts.
- It uses Tailwind for styling.
- It uses pnpm.
```

You can also add styling preferences, code conventions, or anything else that you think is relevant.
