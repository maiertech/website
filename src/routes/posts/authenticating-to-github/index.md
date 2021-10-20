---
title: Authenticating to GitHub
author: thilo
date: 2021-10-20
updated: 2021-10-20
description: TO BE WRITTEN
category: creating-web-apps
tags:
  - github
---

<script context="module">
  export const prerender = true;
</script>

Authenticating to GitHub using an SSH key is a little bit of a hassle to
configure.

```bash
gh auth login
```

- What account do you want to login to: GitHub.com
- Preferred protocol: SSH
- Generate a new SSH key and add to your account: yes
- Passphrase: no (You can revoke your key any time).
- How would you like to authenticate: login with a web browser.
- Follow the authentication steps.

The key will be uploaded. You can now authenticate to GitHub in a set and forget
manner.

- Let GitHub CLI do the heavy lifting for authentication.
- Why authenticate with SSH instead of credential helpers?
- Install GitHub CLI with Homebrew.
