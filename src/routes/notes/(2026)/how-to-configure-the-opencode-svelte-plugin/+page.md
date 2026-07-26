---
title: How to configure the OpenCode Svelte plugin
description: TBD. Written when the post is published.
publishedDate: 2026-07-27
link: https://svelte.dev/docs/ai/opencode-plugin
---

<script>
	import { Figure } from '@maiertech/sveltekit-helpers';
	import SveltePluginImage from './SveltePluginImage.svelte';
</script>

When you work with Svelte and SvelteKit and and choose [OpenCode](https://opencode.ai) as your
harness, you can use the official `@sveltejs/opencode` plugin to magically configure the offical
Svelte MCP server and the official Svelte agent skills.

For a workspace configuration, create `.opencode/opencode.jsonc` in your project root:

```json
{
	"$schema": "https://opencode.ai/config.json",
	"plugin": ["@sveltejs/opencode"]
}
```

OpenCode will merge your workspace configuration with its global configuration. When you restart
OpenCode, the plugin is ready to use with a default configuration.

You can also customize the plugin configuration via the OpenCode TUI. Just and `.opencode/tui.json`:

```json
{
	"$schema": "https://opencode.ai/tui.json",
	"plugin": ["@sveltejs/opencode"]
}
```

After restarting OpenCode, you can use command `/svelte-plugin` to configure the plugin:

<Figure caption="Svelte plugin configuration with OpenCode's TUI.">
	<SveltePluginImage />
</Figure>

When you make a change to the configuration, OpenCode will create a `svelte.json` file that you
should commit to your repository.
