---
id: YdULRvgNODg
title: How to install agent skills as dependencies
description:
  Learn how to install agent skills as project dependencies in VS Code with GitHub Copilot and
  Skills.sh.
aspectRatio: '16 / 9'
publishedDate: 2026-03-30
---

In this video, I explain what agent skills are, how they work, and why they matter for AI-assisted
development. You will learn how skills use progressive disclosure, what a `SKILL.md` file contains,
and how to discover and install skills through the [Skills.sh](https://skills.sh/) registry.

I also walk through a practical example in VS Code with GitHub Copilot: installing the official
Svelte skills, reviewing the security audits, understanding the `skills-lock.json` file, and using
`npx skills` commands. If you want to make your coding agent more capable, this video is for you.

#AgentSkills #GitHubCopilot #VSCode #Agents #CodingAssistant

## Links

- [Agent Skills: What are skills?](https://agentskills.io/what-are-skills)
- [Agent Skills: Specification](https://agentskills.io/specification)
- [Skills.sh](https://skills.sh/)
- [Official Svelte skills](https://skills.sh/sveltejs/ai-tools)
- [skills NPM package (GitHub)](https://github.com/vercel-labs/skills)
- [`npx skills` bug: Project-level check/update is broken](https://github.com/vercel-labs/skills/pull/565)

## Timestamps

```
00:00 Introduction
00:23 What are agent skills?
01:49 Progressive disclosure
03:30 SKILL.md
04:37 Discovering skills
06:58 npx skills
08:09 Installing skills for GitHub Copilot
10:59 Security risk assessment
13:54 Skills with references
16:52 What skills does the agent have?
18:21 More npx skills commands
20:21 Wrap-up
```

## Transcript

### Introduction

Hi, I'm Thilo, a developer based in the Netherlands. Today I would like to talk about agent skills.

I've recently started playing around with agent skills because I've heard so much about them, but I
had no clue what they are and how they work. In this video, I'd like to share with you what I
learned. So, let's get started.

### What are agent skills?

There's actually a website, it's called [agentskills.io](https://agentskills.io/home), and it's a
combination of introduction to skills, but also a specification that explains what skills are. So
let's have a look at this website. And here it says "Agent Skills are a lightweight, open format for
extending AI agent capabilities with specialized knowledge and workflows."

So, it's a little bit like you can literally inject a skill into your agent. You need to remember
that the agent and the models that the agent uses are trained on a limited set of data. I mean it's
a ginormous set of data, but it's still limited. Not everything is in there. And if you have
specialized tasks that you want your agent to do, you can provide it a skill that helps the agent to
understand and to acquire the skill.

So at its core, a skill is a folder containing a `SKILL.md` file. So it's just a Markdown file. And
this file includes metadata in the frontmatter of the Markdown file. It has to have at least a name
and a description. And then plain text instructions that tell an agent how to perform a specific
task.

### Progressive disclosure

To understand what skills are and what problem they solve, we have to understand the concept of
progressive disclosure.

If you have worked before with agents, you know that context is limited. It's limited in the sense
that the more stuff you put into the context, like the longer your prompt, the more files you put
into the context, if you add images to the context, the more tokens will be generated and sent to
the model, and the more expensive your prompt will be.

But context is also limited in the sense that once the context starts getting fuller, the quality of
the responses that your model generates start degrading, and in the worst case, it starts
hallucinating. That's why it's really important to manage what goes into your context. So, our goal
is to keep the context as minimal as possible and as relevant as possible for the task that the
agent is supposed to solve. And the concept we use for that is called progressive disclosure.

And skills use this concept, which means the agent is aware of the skills that it has access to, but
it doesn't load them into the context. Only when the task matches a skill, will the agent load the
`SKILL.md` file into the context.

### SKILL.md

Let's have a look at a `SKILL.md` file. This is a simple example, and you can see it's just a normal
Markdown file. It has a frontmatter with a `name` and `description` property. They're both required.
And the description also should be concise. It shouldn't like be very long or contain a lot of
words. Just what is needed for the agent to match the skill to a task. So, in this example it says:
"Extract PDF text, fill forms, merge files, use when handling PDFs."

And the rest of the `SKILL.md` file is just plain Markdown written in English. And that's the whole
point of skills. When you come across a skill, you should be able to read and understand the
`SKILL.md` file because it's just written in English. There is no complex abstraction or
domain-specific language. It's just English.

### Discovering skills

Now let's discuss how you can discover skills that you may want to use in your project. And luckily,
there is a website, it's called [Skills.sh](https://skills.sh), it's done by Vercel, on which you
can discover all kinds of skills. So this is the website. It's basically a search box. You can
search for skills.

Let me quickly show what we're gonna do now. So this is my scenario. I have a SvelteKit website. I
use it in combination with GitHub Copilot. And I use VS Code as my IDE. And I want to install the
two official Svelte skills in this repository.

So usually, when you want to install this skill, you probably got a hint from somewhere. In this
case, I got the hint from the Svelte docs that these two skills exist and are maintained by the
Svelte team. So I can now go ahead and search for them. And the first one is actually the skill I'm
looking for. Actually, there are two. You see that the Svelte team maintains two skills. One is
called svelte-code-writer. And the other one is about best practices. So let's have a look at the
second one. And we see that there is an installation command which we can copy-paste to install the
skill into our project.

But let's first look at the `SKILL.md` file because, as we mentioned before, it's just Markdown. And
then if we want to learn about Svelte best practices, we could also just read through the file
because it's easy to understand. There are examples, so there's like nothing kind of mysterious here
happening.

Alright, then let's go back here and copy this command, but before we do that, we need to talk about
a tool because this website comes with a command-line tool.

### `npx skills`

So the tool is called skills. It's an NPM package. And you can run it with NPX, which is just a
convenient way to run an NPM package that is also a command-line tool without having to install it
globally on your machine. And if you're using PNPM you can use the PNPM equivalent, which is
`pnpm dlx skills`.

Let's have a look at what this does. So this is the GitHub repository. And this is a command-line
tool that complements the Skills.sh website. You can think of the Skills.sh website as a registry
for skills, just in the same way that the NPM registry is a registry for NPM packages. So when you
want to install an NPM package, you use `npm install` or `pnpm install`. And the equivalent for
skills is the skills command-line tool, which you use by running `npx skills add`. But now let's
look at a practical example.

### Installing skills for GitHub Copilot

So we're now in my VS Code editor. And this is the source code of my website maier.tech. It's cloned
into a Git worktree. And at the moment, the only configuration I have for agents is the `AGENTS.md`
file. It contains a general description about this repository, about the stack we're using, about
some conventions, and how I write my content. For example, there are the content types: a post, a
note, and a video. And the `AGENTS.md` file will end up in the context with every single prompt that
you make.

But now we want to install the skills. So let's open the terminal and go back to Skills.sh. And I'm
going to copy this command. This command will help us install these two skills. And then just paste
it.

And first about the warnings. I'm using PNPM in this project, so there are some configurations which
NPM thinks are not correct. So you can just ignore them, but we could also use instead of
`npx skills`, we could use the `pnpm dlx skills`. It's the same.

But what we have here is now an overview, so we're gonna install this skill from this repository,
and then we have two skills that we can install. The first one is svelte-code-writer. So we select
that, and the second one is svelte-core-bestpractices. We select this, too. We hit return. And then
the tool detected we're using this with GitHub Copilot.

And I have now two installation options. I can install skills globally. They would end up in the
root directory, my home directory. Or we can install the skills in a project. If we install skills
in project and it says here in brackets “Install in current directory (committed with your
project)", it means they are project dependencies. That's what we're gonna do. So we hit return.

And then there is an installation summary which shows these projects will end up in a directory
called `.agents/skills`. And this is a standardized directory, and this can vary between different
agents that you use.

### Security risk assessment

Now the second piece of information is a security risk assessment. And for each skill, Vercel
conducts three independent audits. And we see the results of the audits here. If you want to see
more, we can click on this URL. And then we end up here in the overview. And when we click on the
first skill and we scroll down, we see on the right hand side the security audits. So let's have a
look at the first one.

The first one is the Gen Agent Trust Hub. And here it says the skill uses NPX to download and
execute @sveltejs/mcp. That's the MCP server, the official MCP server. This is a trusted resource
maintained by the official Svelte organization. So we know that this is safe to use, so I'm not
gonna go through all of this.

And then the second audit is by socket.dev. Also happy.

And the third audit is a warning, so we need to look at this one, and it says unverifiable external
dependency detected, runtime URL that controls agent. And then if you read on, "potentially
malicious external URL detected, the skill requires running external code via `npx @sveltejs/mcp`.""
So that's the official MCP server. So no need to worry about this one.

We can then go to the second package. And the security audit here is all good. So here in this one,
it describes, for example, the skill content is purely educational and referential. Well, no
surprise, this is about best practices, providing guidance on writing idiomatic Svelte 5 code, and
so on. The second audit by Socket is also fine. And also this one comes back without any issues.

So we've convinced ourselves that these skills are fine to use, so we can confidently hit yes. And
then we see that our project was updated. So there are two things that have changed. First, we have
a `skills-lock.json` file. And you can think of this file. It's like a package lock file for PNPM or
for NPM. So the idea is we lock the exact hash of the skill that we're using because it's being
installed from a GitHub repository. And that will also help us later on to detect if there is an
updated version of the skill.

### Skills with references

And then there's this directory `.agents/skills`. And we have two subdirectories for each skill. So
let's look at them. The first one is svelte-code-writer. It only contains the `SKILL.md` file. And
here we can just read like the description. It says yeah, "CLI tools for Svelte5 documentation,
lookup and code analysis. MUST be used whenever creating, editing, or analyzing any Svelte component
(.svelte) or Svelte module (.svelte.ts/.svelte.js)." And so on.

Interesting here that they use the word MUST, so they want to compel the agent to really use this if
it works with a Svelte file. And that's kind of influencing the prompt a little bit. Prompt
engineering to make sure it really does what you want. But other than that, we have only text here,
but it's a description of how to use the official Svelte MCP server.

Let's look at the second skill. The second skill also has a `SKILL.md`, but it also has a folder
with references. And then here the description says "Guidance on writing fast, robust, modern Svelte
code. Load this skill whenever in a Svelte project and asked to write/edit or analyze a Svelte
component or module. So this, as we mentioned before, was all about Svelte best practices.

So let's look into the references directory. We see in this directory there are only additional
Markdown files. And let me quickly search here for `@attach`. And then we see in the Markdown code
it has a `references/@attach.md`. And this is part of the progressive disclosure that we discussed
earlier. And the idea is then when the agent has detected that it should use the skill based on the
`SKILL.md` file, then it will read through it, and initially will only have the `SKILL.md` file
loaded into its context.

But if it sees oh I'm using this, for example, I want to use this `@attach`, it will progressively
disclose the next file, which is the `@attached.md`, and load that into the context, and then we can
look at it. And it's also just a Markdown file, and then can continue from there, and there's
probably more examples and more kind of best practices about this specific part of Svelte.

### What skills does the agent have?

So now we know the skills are installed, and let's close all these files, but then we need to double
check to be really sure that the agent can find our skills. So one thing we can do is we can do an
`npx skills list`. And that will list all the locally installed skills, and we see
svelte-code-writer and svelte-core-bestpractices are both installed. But that doesn't mean that the
agent is aware of these skills. So let's double check.

And let's ask the agent: "Which skills do you have?" And then it's working on it, and we see the
first two skills are indeed the skills that are installed locally. But you might be wondering what
are all the other skills? And so this is like we're using GitHub Copilot, and it comes with certain
skills active and loaded by default, and these are the other skills.

So now we know that the agent is aware of the skills and they can pull in these skills into the
context if the description of the skill matches the task at hand.

### More `npx skills` commands

Before we wrap this up, I want to make you aware there are more `npx skills` commands that you
should be aware of. The first one `npx skills list`, you already know to lists the skills that are
installed.

The second one is `npx skills check`, which allows you to check if there's an updated version of a
skill that you have installed. And I need to add that at the moment this is buggy. So it works for
globally installed skills, but it doesn't work for locally installed skills. But there are issues
open on the GitHub repository, and I expect this to be fixed soon.

So once this is fixed, it will be exactly the same mechanism of like what you're currently doing
with your NPM packages. So that you regularly check if there's updates and then you would update the
packages, you would review the changes, and you can do the same thing with skills. So it means that
skills are real project dependencies which we're tracking and which we have to maintain and update.

The third command is `npx skills remove`, and as the name suggests, you can remove a skill that you
installed into your project. So let's try this out. I copy the first skill. Then we do a
`npx skills remove`. And then it says: "Are you sure you want to uninstall skill(s)?" Yes. And then
we see it's gone. But we also see this is still buggy. So there are still two skills in the
`skills-lock.json`, but this should also be fixed very soon.

### Wrap-up

So to wrap up, in this video, you learned what skills are. They're basically just a Markdown file
that can have attachments, which are other Markdown files, or even executable code. And you can
install skills via a registry called Skills.sh by Vercel.

And before you install a skill, you should always look at the security audits there and also
manually review the skills that you want to install. Because just like with normal NPM packages,
also skills can be malicious because they can potentially execute things on your machine that you
don't want them to execute. But with the `skills-lock.json` file, skills are now real project
dependencies that are locked-in in a file, and that we can double check if they're outdated, and
that we have to update and maintain.

If you enjoyed this video, don't forget to like and subscribe. And also check out my website
maier.tech. You'll find a transcript of the video there. And I hope to see you in the next video.
Bye.
