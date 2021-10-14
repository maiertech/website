---
title: Husky v6 pitfalls
author: thilo
date: 2021-04-02
updated: 2021-10-11
description:
  Upgrading Husky from v4 to v6 turned out to be more complicated than I
  expected. In this post I explain how to migrate a simple v4 configuration to
  v6.
category: legacy
links:
  - title: 'What’s new in husky 5'
    href: https://dev.to/typicode/what-s-new-in-husky-5-32g5
  - title: Husky docs
    href: https://typicode.github.io/husky/
---

<script context="module">
  export const prerender = true;
</script>

_I published this post originally for Husky v5. v6 was released only two months
after v5. It ironed out some of the kinks of v5. To keep this post relevant, I
updated it for v6 and republished it._

[Husky](https://github.com/typicode/husky) is an NPM package which needs to be
installed in `devDependencies` in `package.json`. It installs Git hooks that can
be executed when certain Git commands run. The most common use case for Git
Hooks is a pre-commit hook which runs prior to a commit. I use a pre-commit hook
to run [lint-staged](https://github.com/okonet/lint-staged) to lint all files
that are part of a commit.

In husky v4 my hooks were configured in a `.huskyrc`:

```json:.huskyrc
{
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm run lint && npm test"
  }
}
```

Husky v4 took care of installing hooks automatically. In v6, instead of
maintaining a configuration file, you maintain hook files. You can use
[this script](https://github.com/typicode/husky-4-to-6) to migrate from v4 to
v6. This is the NPM version of the script:

```bash
npm install husky@6 --save-dev \
  && npx husky-init \
  && npm exec -- github:typicode/husky-4-to-6 --remove-v4-config
```

This creates a `.husky` folder with a `.gitignore` inside and an empty
pre-commit hook file `.husky/pre-commit`, which is the hook most commonly used
in projects. Add the pre-commit commands from your v4 configuration file. Since
hooks run outside of NPM, you need to type `npx lint-staged` instead of
`lint-staged`. The generated and modified pre-commit hook looks like this:

```bash:.husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

You can add additional hooks manually, e.g. create an empty pre-push hook with
this command

```bash
npx husky add .husky/pre-push
```

and add the pre-push commands from the v4 configuration file. The pre-push hook
now looks like this:

```bash:.husky/pre-push
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm test
```

To test the pre-commit hook you can try committing a file with a lint error,
which should fail. To test the pre-push hook, you can commit a file with a lint
error using the `--no-verify` option with `git commit` and then try pushing the
branch, which should fail.

Note that you should not create Git hooks manually since they need execute
permissions to run. `husky add` makes sure that permissions are correct.

Above migration script also adds the follwoing script to your `package.json`:

```json:package.json
"scripts": {
  ...
  "prepare": "husky install"
  ...
}
```

This ensures that all Git hooks are installed automatically whenever someone
clones your repository and runs `npm install`.

And finally, there is no point installing hooks in continuous integration (CI)
or services like [Netlify](https://www.netlify.com/) or
[Vercel](https://vercel.com/). Set environment variable `HUSKY` to `0` in CI to
suppress hooks.
