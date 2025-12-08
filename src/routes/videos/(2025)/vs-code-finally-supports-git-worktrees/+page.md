---
id: x1mjUh6-azc
title: VS Code finally supports Git Worktrees
description:
  'Discover Git worktrees in VS Code: work on multiple branches simultaneously without stashing,
  create clean workspaces, and boost your productivity.'
publishedDate: 2025-12-05
---

Ever been stuck switching between branches when you need to work on multiple issues? Git worktrees
solves this problem perfectly!

## What you will learn

✅ Create #Git worktrees in #VSCode to work on multiple branches without stashing.

✅ Understand how #Worktrees link to your repo's Git history without cloning.

✅ Set up separate #Workspaces with independent dependencies for each issue.

✅ Create pull requests from worktrees and clean them up after merging.

✅ Boost your #Productivity by working on multiple #GitHub issues in parallel.

## Links

- [VS Code v1.103 release notes](https://code.visualstudio.com/updates/v1_103#_git-worktree-support)
- [VS Code worktrees docs](https://code.visualstudio.com/docs/sourcecontrol/overview#_worktrees)
- [Git Worktree Menu extension](https://marketplace.visualstudio.com/items?itemName=CodeInKlingon.git-worktree-menu)

## Timestamps

```
00:00 What are Git worktrees?
01:11 Limitations of native Git worktree support
02:01 From GitHub issue to Git worktree
03:03 What Git worktrees look like on the file system
04:31 Git worktrees are separate workspaces
05:43 Creating a pull request
06:24 Deleting a Git worktree
08:04 The git.detectWorktrees setting
09:08 Pull your changes into the main branch
09:35 Wrap up
```

## Transcript

### What are Git worktrees?

In this video, I would like to show you a feature in VS Code, which was rolled out recently in
version 1.103, which is the July 2025 edition. And this version added support for Git worktrees.

If you've had a situation like you're working on a feature, and then all of a sudden you have to
make a quick fix for something else, you have to stash your changes away, you have to commit your
changes, and then check out another branch, do your feature, and then come back, in such a scenario,
Git worktrees will help you because it allows you to have multiple branches of the same Git
repository available in different workspaces, and you can work on them completely independently.

So the idea is kind of you create a new workspace without cloning the entire repository. Then you do
your thing, you create a pull request, and when your pull request is merged, you can dispose of that
separate workspace. And this is a feature which is part of Git. It has been in Git for a while. It's
called Git worktrees. And in this video, I'd like to show to you how Git worktrees work.

### Limitations of native Git worktree support

Before we get started, I'd like to point out that the Git worktree support in Visual Studio Code is
not complete yet. There are some handy features missing. So for example, at the moment, it's not
possible to automatically copy certain files like a `.env` file when you create a worktree. But I
hope that they will add this soon.

If you really need this feature, there are many extensions out there. I can recommend the Git
Worktree Menu extension. It's basically obsolete now with the VS Code support of Git worktrees. But
it does have that feature that allows you to automatically copy certain files into your worktree. So
if that's important to you, have a look at this extension. So now let's get started with Git
worktrees in VS Code.

### From GitHub issue to Git worktree

So here I have an issue. It's not really relevant what the issue is about, I want to use a Git
worktree to work on the issue. So let’s just remember the issue number 1026. And then move over to
VS Code.

So, in VS Code, go to the source control view and then make sure that repositories is open and in
repositories hit the three dots, go to worktrees, create worktree. And then you can either select an
existing branch, but normally you want to create a new branch and you can name the branch, whatever
you want or whatever convention you have. I'll just name it website. And then the issue number 1026.
And then it will create a new folder. And here's our worktree. In case you're wondering why I have
additional worktrees, I'm working on other issues as well.

So let's quickly have a look at what happened on the file system.

### What Git worktrees look like on the file system

So, this is my folder in which I have cloned projects. You see, I cloned the website into this
folder. And when we open the folder, let me just turn on hidden files. We see that this is the
folder where the `.git` folder is located and it contains all the history information for Git.

So Git stores the changes that I make and commits in this folder and then has a way to sync the
changes to the remote repository. And then we see that there is another folder called
`website.worktrees`. This is created by VS Code. And inside this folder, we see the worktrees. The
new one is website-1026.

If I open this folder, we can see that there is no `.git` folder in there. And that's because this
is not a clone that is separate to the originally cloned repository. It is linked to the history. So
the The `website.worktrees` subfolder website-1026 is linked to the history in this `.git` folder.

Now let's go back to VS Code. And then right click the worktree. And then we say open worktree in
current window. And then we have the Git worktree with branch website-1026.

### Git worktrees are separate workspaces

Before I fix the things that I wanted to fix in this issue, let's have a quick look at the console.
Let’s do a `pnpm outdated`. And we see something which is a little odd at first glance. We see that
like all the packages are missing. And the reason why they're missing is because this is a
completely separate workspace with separate dependencies.

So when we work in a worktree and we open the worktree, we first have to install the dependencies.
So we need to run a `pnpm i`. Then let's do a `pnpm outdated` again. And now we see all the
dependencies are installed, even though a lot of dependencies are outdated, but that's what I'm
going to fix in this issue as well.

So, I will work on my issue now and we'll fast forward in the video and then I’ll be back to create
the pull request, which just works as we're used to. And once the pull request is successfully
merged, we can dispose of the worktree.

### Creating a pull request

All right, so I'm back.

I made the changes. I created a commit. I pushed the branch, and now we have to create a pull
request. All right, so let's create this.

And then let's verify that the CI task completed successfully. Okay, looks all good. Then we're
gonna do a squash and merge.

And then we go back to VS Code.

### Deleting a Git worktree

And we can see in the commit graph that our commit got merged into main. And now we're done with our
worktree, and we can dispose of it. So remember, we're still inside our Git worktree which was in a
separate directory. We click on it, worktrees, and we say delete worktree.

But we cannot delete the worktree that we're currently in. So we need to switch back to the main
repository. Let's open the folder. And as mentioned before, VS Code organizes the worktrees in a
sub-directory `website.worktrees`. So `website` was just the name of the repository, and then a
`.worktrees`. So we need to go up one level. We choose the original main repository.

We go to the source control view and here we have an overview of the worktrees that we have
currently created. So I have multiple ones, because I'm working on multiple issues at the same time.
Let's make this a little bit bigger to see exactly the branches we work on. And we need to pick the
worktree on branch website-1026. We go to worktrees, and then delete worktree. So now the worktree
is deleted.

Let's verify this on the file system. So we see the folder website-1026 is deleted.

### The `git.detectWorktrees` setting

So back in VS Code, I just wanna say a few things about this view. So this view is maybe a little
bit confusing, because it shows us the main branch, which is a normal cloned GitHub repository, and
it shows us all the active worktrees that we have. And also here it shows the consolidated changes.
So this doesn't mean that there are any changes in the main branch. The changes are actually in
other worktrees. So if this view is confusing to you, there is a setting that we can use. And this
setting is called `git.detectWorktrees`. It's by default, it's set to `true`. We can set it to
`false`. We need to reload VS Code for this setting to take effect. It's scanning the repositories
And then we have the normal view. Now we only see the main branch here, and it's a little less
confusing.

### Pull your changes into the main branch

Before we wrap up, there is one thing still missing.

We have to pull in the changes into the main branch. So all we have to do is a `git pull`. And then
we have the changes. So, in the graph on the left hand side, we see that we're all good. The local
main branch is up to date with the remote main branch. And the next time we'll create a worktree, we
create it from the latest changes.

### Wrap up

Now you have an idea about how Git worktrees work. And from my experience, they're really useful
when you work on multiple issues in parallel. And you don't have to do things like stashing changes
away to work on some other issue. Instead of doing that, you simply create a worktree. And if you
get used to this workflow, I think your productivity will go up.

If you enjoyed this video, don't forget to like and subscribe and see you in the next video.
