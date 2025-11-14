---
title: PNPM minimumReleaseAge
description:
  Learn how PNPM's minimumReleaseAge setting helps protect your project from compromised packages
  and improves supply chain security.
publishedDate: 2025-11-14
link: https://pnpm.io/blog/releases/10.16
---

After the recent NPM supply chain attacks, GitHub, the owner of the
[NPM registry](https://www.npmjs.com/),
[announced several measures](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
to make publishing NPM packages more secure. That's great, but as a consumer of the NPM registry,
you can do more than hope for the registry to fix the publishing process.

In version 10.16, PNPM introduced the `minimumReleaseAge` setting. This allows you to specify a
minimum age that a published package must have before PNPM will install it. The idea behind delayed
dependency updates is that most compromised packages are taken down quickly. If you require
published packages to be at least a day old, this lowers the likelihood of pulling a compromised
package into your project.

You can add `minimum-release-age=1440` (in minutes) to your `.npmrc` file to enforce a 1-day minimum
age. This is just one of several measures you should take. In general, it's advisable to minimize
the number of dependencies you pull into your project.
