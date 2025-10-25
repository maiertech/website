---
id: 0e097c40-6bc3-43c3-8fa7-2645ce37a7e3
title: eslint-plugin-svelte makes SvelteKit linter fail
description:
  'eslint-plugin-svelte v3.12.x breaks the SvelteKit linter (svelte/no-navigation-without-resolve);
  pinned to v3.11.0 as a workaround.'
publishedDate: 2025-09-21
link: https://github.com/sveltejs/eslint-plugin-svelte/issues/1353
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
  import Image from './Image.svelte';
</script>

When I upgraded this website's dependencies, I ended up with `eslint-plugin-svelte` v3.12.x. It
broke the CI lint task and produced the following errors:

<Figure caption="eslint-plugin-svelte v3.12.x causes the SvelteKit linter to fail with svelte/no-navigation-without-resolve errors." class="mb-8">
  <Image />
</Figure>

The linter flags links where `href` is provided as a variable. To understand why, you should read
more about the
[svelte/no-navigation-without-resolve rule](https://sveltejs.github.io/eslint-plugin-svelte/rules/no-navigation-without-resolve/)
and check out the GitHub discussion I linked above. I find providing `href` as a variable a common
use case and am surprised that this rule made it into the recommended rules. It looks like this rule
needs more tweaking.

As a workaround, you can add this to your `eslint.config.js`:

```json
{
	"rules": {
		"svelte/no-navigation-without-resolve": [
			"error",
			{
				"ignoreLinks": true
			}
		]
	}
}
```
