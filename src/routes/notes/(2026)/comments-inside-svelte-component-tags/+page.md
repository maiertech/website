---
title: Comments inside Svelte component tags
description:
  Svelte now supports comments inside component tags, making inline documentation cleaner for
  components and HTML elements.
publishedDate: 2026-03-27
link: https://bsky.app/profile/dummdidumm.bsky.social/post/3mfc6vfuak22c
---

This Bluesky post about a small but meaningful improvement to comments in Svelte component tags
caused genuine excitement in the Svelte community.

Instead of commenting like this

```svelte
<!-- Tags may not be linked due to the wrapping anchor tag. -->
<Tags values={value.tags.map((tag) => ({ ...tag, path: undefined }))} class="@md:justify-end" />
```

you can now move your comment inside the component tag like this

```svelte
<Tags
	// Tags may not be linked due to the wrapping anchor tag.
	values={value.tags.map((tag) => ({ ...tag, path: undefined }))}
	class="@md:justify-end"
/>
```

This also works with HTML elements inside Svelte components:

```svelte
<iframe
	// Always render the iframe to preload, but hide it initially.
	bind:this={iframeRef}
	src="https://www.youtube.com/embed/{value.id}?enablejsapi=1&rel=0"
	title={value.title}
	allow="autoplay; picture-in-picture"
	allowfullscreen
	class={twMerge('h-full w-full border-none', !showPlayer && 'hidden')}
></iframe>
```
