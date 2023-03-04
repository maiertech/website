# @maiertech/maier.tech

This is my [Turborepo](https://turborepo.org/)-powered monorepo for my website https://maier.tech. This turborepo uses [npm](https://www.npmjs.com/) as a package manager.

## Apps

- `website`: My website https://maier.tech built with SvelteKit.

## Packages

- `eslint-config-custom`: SvelteKit's ESLint configuration.

## Utilities

This turborepo has some additional tools already set up for you:

- [ESLint](https://eslint.org/) is delegated to each repository.
- [Prettier](https://prettier.io) is configured globally.

## CLI

### Run tasks

```bash
turbo run <task>
```

can run any NPM scripts in any package as long as it has been defined in the `pipeline` in `turbo.json`. By default, `turbo run` runs matching tasks in all packages. However, the sequence depends on the `pipeline`.

You can use `--filter` to run a task only in packages, which match the filter, e.g.

```bash
turbo run build --filter=website
```

runs the build command for the website only.

## Build

```
npm run build
```

runs `turbo run build`, which builds all packages. Turborepo determines the exact sequence of running tasks with the `pipeline` in `turbo.json`.

## Develop

```
npm run dev
```

spins up all development servers of packages that have a `dev` task.

## Workspaces

You can still use workspace commands to manage dependencies. Installing, uninstalling and updating a package in a specific workspace:

```bash
npm install <package> -w=<workspace>

npm uninstall <package> -w=<workspace>

npm update <package> -w=<workspace>
```
