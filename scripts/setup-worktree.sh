#!/usr/bin/env bash
# Run from inside a new worktree to copy the main worktree's .env and install dependencies.
set -euo pipefail

worktree=$(git rev-parse --show-toplevel 2>/dev/null) || {
	echo "setup-worktree: not inside a git worktree" >&2
	exit 1
}

common_dir=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || {
	echo "setup-worktree: cannot determine the main worktree" >&2
	exit 1
}

if [ "$(basename "$common_dir")" != ".git" ]; then
	echo "setup-worktree: cannot determine the main worktree from $common_dir" >&2
	exit 1
fi

main=$(dirname "$common_dir")

if [ "$(realpath "$worktree")" = "$(realpath "$main")" ]; then
	echo "setup-worktree: $worktree is the main worktree; run this from a new worktree" >&2
	exit 1
fi

cd "$worktree"

if [ -f "$main/.env" ] && [ ! -e .env ]; then
	cp "$main/.env" .env
	echo "Copied $main/.env to $worktree/.env"
fi

pnpm install
