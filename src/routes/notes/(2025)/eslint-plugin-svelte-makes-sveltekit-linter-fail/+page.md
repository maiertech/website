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

The linter rejects links where `href` is provided as a variable. I did not investigate the change in
detail, but I linked the GitHub discussion above. As a workaround, I pinned `eslint-plugin-svelte`
to v3.11.0 in `package.json`.
