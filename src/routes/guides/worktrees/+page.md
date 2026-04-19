---
title: Worktrees guide
description: Manual Git worktree management.
---

[Warp](/guides/warp) recognizes worktrees but does not support managing them. [Zed](/guides/zed)
supports worktree management but does not allow you to co-locate worktrees with the main repository.

## Create a worktree

I want the worktree to be co-located with my cloned repository. If the cloned repository is
`path/to/website`, the worktrees should reside in `path/to/website.worktrees`. This is a convention
that VS Code's worktree implementation uses and that I like better than a central `worktrees`
directory.

Suppose you need a worktree for issue 1234. Run:

```bash
git worktree add -b i-1234 ../website.worktrees/w-1234
```

to create branch `i-1234` in worktree `w-1234`.

Suppose you need a worktree to review pull request 1173, which uses branch `i-1172`. Run:

```bash
git worktree add ../website.worktrees/r-1173 i-1172
```

Using `r-1173` instead of `w-1173` as the worktree name makes it clear that this worktree is for
code review.

## Worktree management

Run:

```bash
git worktree list
```

in the main repository or in any derived worktree to list all worktrees. The worktree location above
is just a convention. Worktrees can be anywhere.

Run:

```bash
git worktree remove ../website.worktrees/w-1234
```

to remove a worktree.

Alternatively, Zed has great worktree management.
