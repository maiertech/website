---
title: How to use GitHub CLI to configure SSH authentication to GitHub
author: thilo
published: 2021-10-20
modified: 2022-06-28
description:
  Setting up SSH authentication to GitHub used to be a tedious multi-step
  process. Now it is a breeze if you let GitHub CLI do the hard work for you.
topics: [dx]
tags: [github]
---

Authenticating to [GitHub](https://github.com/) with SSH can be difficult to
configure. It is a multi-step process, which is
[outlined in the GitHub docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
Alternatively, you can use the [GitHub CLI](https://cli.github.com/) to automate
SSH configuration and take the pain out of this process.

## Why should you authenticate to GitHub with SSH?

When working with GitHub repositories, you can interact with the platform in
different ways, each of which requires a different authentication method:

- **Website:** authenticate with username, password and 2FA.
- **Command-line:** authenticate with a personal access token or SSH key.
- **VS Code:** authenticate with OAuth token (which is automatically created
  upon the first login with VS Code).
- **GitHub CLI:** authenticate with OAuth token for commands using the GitHub
  API and one of the command line authentication methods mentioned above for
  basic commands such as cloning, fetching, pulling and pushing.

This post is about configuring SSH authentication for the command line. You can
read up on the
[two command line authentication options in the docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line).
There is no right or wrong choice between the two. Both, personal access token
and SSH key, have their pros and cons. I like the SSH key option because you set
it up once and all applications supporting SSH to interact with GitHub can
piggyback on the generated SSH key. If you need more fine-grained control over
the permissions you grant to applications, personal access tokens are a better
choice.

## SSH key generation and uploading

If you do not have GitHub CLI installed, you can do so with `brew install gh`.
Run `gh auth login` and answer the prompts. Choose SSH as the preferred
protocol. You do not need to enter a password for the generated SSH key. Just
hit ↵. You can revoke SSH keys uploaded to GitHub at any time if you think that
it has been compromised.

```bash
$ gh auth login

? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations? SSH
? Generate a new SSH key to add to your GitHub account? Yes
? Enter a passphrase for your new SSH key (Optional)
? How would you like to authenticate GitHub CLI? Login with a web browser

! First copy your one-time code: 66B8-DDEE
- Press Enter to open github.com in your browser...
✓ Authentication complete. Press Enter to continue...
```

The last question will redirect you to your GitHub account page where you need
to paste the copied code. Review and accept the permissions that you will grant
to GitHub CLI. This creates an OAuth token for GitHub CLI. After your SSH key
has been generated and uploaded to GitHub, you will see this confirmation:

```bash
✓ Configured git protocol
✓ Uploaded the SSH key to your GitHub account: /Users/thilo/.ssh/id_ed25519.pub
✓ Logged in as maiertech
```

Before you can use the generated key to authenticate to GitHub on the command
line, you need to verify the SSH key fingerprint of the server to which it will
connect. This is to ensure that you are connecting to GitHub and not some other
server. Run this command:

```bash
$ ssh -T git@github.com

The authenticity of host 'github.com (140.82.114.3)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Before typing yes, you need to verify that the displayed RSA fingerprint is
correct. Open a new terminal and copy this comparison statement into the
terminal, but do not run it:

```bash
[[ "fingerprint1" == "fingerprint2" ]] && echo "Equal" || echo "Not equal"
```

Next, copy the RSA fingerprint from the above output (from your terminal, not
from this website) and paste it to replace `fingerprint1`. Then go to
[GitHub's SSH key fingerprints page](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints),
copy the RSA fingerprint and paste it to replace `fingerprint2`. Run the
comparison command. If both fingerprints match, type yes to respond to the above
prompt. You should see the following confirmation message:

```bash
Warning: Permanently added 'github.com,140.82.114.3' (RSA) to the list of known hosts.
```

The Github domain github.com has now been added to `~/.ssh/known_hosts` together
with its public key. Any SSH operation in any application now trust GitHub's
server and public key and can authenticate to GitHub.
