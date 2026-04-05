---
id: 7gBw-4471YM
title: How to install Node.js LTS on Mac with Homebrew
description:
  Learn how to install the latest Node.js LTS on a Mac with Homebrew and keep your local setup
  aligned with your production deployment.
aspectRatio: '16 / 9'
publishedDate: 2025-09-30
timestamps:
  - timestamp: '00:00'
    label: 'Introduction'
  - timestamp: '00:28'
    label: 'Installing Node.js with Homebrew'
  - timestamp: '01:20'
    label: 'Using Node’s download helper'
  - timestamp: '02:23'
    label: 'Installing the LTS version with Homebrew'
  - timestamp: '03:19'
    label: 'Uninstalling the LTS version with Homebrew'
---

Learn how to install the Node.js LTS version on a Mac with Homebrew.

This short video shows why matching your local Node version with the one used in deployment matters,
how to check the version you have installed locally, and how to switch from the currently installed
version to the latest long-term support version. It also covers how to uninstall and replace a
pinned Homebrew Node version cleanly.

#WebDevelopment #NodeJS #Homebrew

## Links

- [Homebrew](https://brew.sh/)

- [Node.js download helper](https://nodejs.org/en/download)

## Transcript

### Introduction

In this video, I'd like to talk about how to install Node.js and not just the normal version but the
LTS version, the long-term support version. When you do web development, you need a version of
Node.js installed on your development machine because most of the web development tooling runs on
Node.js. And the easiest way to install Node.js on a Mac is with Homebrew.

### Installing Node.js with Homebrew

So I'm assuming that you have Homebrew installed. Then just switch to your terminal, type
`brew install node` and this will install the latest Node.js version. So let's type `node -v` to
check which version we have. And we have version 24.9.0, which at the time of recording is the
latest version.

But usually what you want to do is you want to align the Node version that you have locally
installed with the Node version that you use when you deploy your web app to one of the big cloud
providers, for example, Vercel or Cloudflare. And they usually use the LTS version, which stands for
long-term support. So how can we install the LTS version of Node?

### Using Node's download helper

To install the LTS, the long term support version of Node, let's go to the Node.js website,
nodejs.org. "Get Node.js", which brings us to the download section. And there we have a tool that
helps us create the commands that we need to install the Node.js version the way we want.

So in the first dropdown, you see the latest version is the 24.9.0, which was the one that we just
installed with Homebrew. And there is a 22.20.0, which is marked as LTS for long-term support. There
are, by the way, multiple LTS versions because a long-term support version normally runs for a
couple of years. So there's always an overlap, but we want the latest LTS version. So we choose
22.20.0, which at the time of recording is the latest one for macOS. And then I use Homebrew to
install it and I work with PNPM.

### Installing the LTS version with Homebrew

So this gives us an installation command, but before we use this command, let's uninstall the old
version. So back in the terminal, we do a `brew uninstall node`. And now I double check that it's
gone with `node -v`. It's not found.

And now what I actually would like to type is `brew install node@lts`. But unfortunately, there is
no tag "LTS". So the idea would be LTS points to the latest LTS version, but it's not supported by
Homebrew. So we still have to type the version, which is 22. So it's `brew install node@22`. Let's
double check. And we have version 22.20.0 installed locally.

### Uninstalling the LTS version with Homebrew

If you want to uninstall the Node LTS version, for example, once it's upgraded to a new one then
it's not enough to type `brew uninstall node` because we pinned the Node version, in our case, to
version 22. So we have to type `brew uninstall node@22` and we can verify with `node -v` that it's
gone.

I hope this short video helped you install the long-term support version of Node.js. If you like
this video, hit like and subscribe and see you in the next one.
