# @maiertech/website

This is the source code for my website https://www.maier.tech.

## NPM registries

This repository installs package @maiertech/sveltekit-helpers from the GitHub NPM registry, which
requires authentication. .npmrc looks like this:

```
# https://pnpm.io/npmrc#registry
registry=https://registry.npmjs.org/
@maiertech:registry=https://npm.pkg.github.com/

# https://pnpm.io/npmrc#url_authtoken
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

I use environment variable `GITHUB_TOKEN` to authenticate to the private registry.

`GITHUB_TOKEN` is available by default in GitHub Actions and Codespaces. But the token's permissions
need to be augmented. In **Package settings** for package `@maiertech/sveltekit-helpers`:

- Add maiertech/website to **Manage Codespaces access**.
- Add maiertech/website to **Manage Actions access**.

On Vercel and for local development, you need to make the personal access token (classic) available
as environment variable `GITHUB_TOKEN`.

## Debugging

Use the **JavaScript Debug Terminal** in VS Code (no `launch.json` necessary).
