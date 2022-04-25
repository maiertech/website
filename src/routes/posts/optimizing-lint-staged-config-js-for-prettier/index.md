---
title: Optimizing lint-staged.config.js for Prettier
author: thilo
published: 2021-01-12
modified: 2021-10-11
description:
  In this post I explain how to optimize lint-staged.config.js so Prettier can
  format any supported file without listing file endings in the configuration.
category: legacy
---

When you use [lint-staged](https://github.com/okonet/lint-staged) to run
[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) on staged
files using [Husky](https://github.com/typicode/husky)'s pre-commit and pre-push
hooks, your `lint-staged.config.js` might look like this (or its JSON
equivalent):

```js:lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{md,mdx,css,yaml,yml}': ['prettier --write'],
};
```

This config file maintains file endings manually. If you add a file to your
project with a file ending supported by Prettier but not listed in your config,
that file will not be processed by Prettier. You have to remember to update file
endings manually in `lint-staged.config.js`.

Adding a file ending is not a big deal, but you can instead refactor
`lint-staged.config.js` to support any file endings that Prettier supports, even
future ones:

```js:lint-staged.config.js
const micromatch = require('micromatch');
const prettier = require('prettier');

// Figure out all extensions supported by Prettier.
const prettierSupportedExtensions = prettier
  .getSupportInfo()
  .languages.map(({ extensions }) => extensions)
  .flat();

const addQuotes = (a) => `"${a}"`;

module.exports = (allStagedFiles) => {
  // Match files for ESLint including dirs and files starting with dot.
  const eslintFiles = micromatch(allStagedFiles, ['**/*.{js,jsx,ts,tsx'], {
    dot: true,
  });

  // Match files for Prettier including dirs and files starting with dot.
  const prettierFiles = micromatch(
    allStagedFiles,
    prettierSupportedExtensions.map((extension) => `**/*${extension}`),
    { dot: true }
  );

  // Array of linters to be run in this sequence.
  const linters = [];

  // Add linters only when there are staged files for them.
  // 'prettier --write' causes lint-staged to never terminate when prettierFiles is empty.

  if (eslintFiles.length > 0)
    linters.push(`eslint --fix ${eslintFiles.join(' ')}`);

  if (prettierFiles.length > 0)
    linters.push(`prettier --write ${prettierFiles.map(addQuotes).join(' ')}`);

  return linters;
};
```

This config file exports a function that receives all staged files for
processing. This is what the config does:

1. Figure out which extensions Prettier supports.
1. Match all staged files that ESLint should process.
1. Match all staged files that Prettier can process.
1. Assemble the commands that lint-staged should run (`eslint` and/or
   `prettier`).

First I tried to do this without checking whether `prettierFiles` is empty. But
then I ran into an edge case where `prettierFiles` was empty and the pre-commit
hook would never terminate. While

```bash
eslint --fix
```

terminates correctly if it does not receive any files as argument,

```bash
prettier --write
```

displays its help page. This seems to trip up `lint-staged`.

This may still seem like overkill, but if you maintain shared helpers across all
of your projects, you can add this config and share it with minimal overhead.
