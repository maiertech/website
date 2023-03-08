<script>
	import GitHub from '$lib/icons/github.svelte';
	import Mastodon from '$lib/icons/mastodon.svelte';
	import RSS from '$lib/icons/rss.svelte';
	import Twitter from '$lib/icons/twitter.svelte';

	const icons = {
		github: { component: GitHub, name: 'GitHub' },
		mastodon: { component: Mastodon, name: 'Mastodon' },
		rss: { component: RSS, name: 'RSS' },
		twitter: { component: Twitter, name: 'Twitter' }
	};

	const sizes = { small: 'w-4', medium: 'w-6', large: 'w-8' };

	/** @type {'github' | 'mastodon' | 'rss' | 'twitter'} */
	let selected_icon = 'github';

	/** @type {'small' | 'medium' | 'large'} */
	let selected_size = 'large';
</script>

<div class="container p-10 space-y-4">
	<h1>Icons</h1>

	<p>
		Icons are unstyled SVGs. Due to
		<a href="https://tailwindcss.com/docs/preflight#images-are-block-level">Tailwind's reset,</a>
		they are block-level elements like all other replaced elements. They should be used only with Flexbox
		or Grid.
	</p>

	<label>
		Icons:
		<select bind:value={selected_icon} class="select w-36">
			<option value="github">GitHub</option>
			<option value="mastodon">Mastodon</option>
			<option value="rss">RSS</option>
			<option value="twitter">Twitter</option>
		</select>
	</label>

	<div class="flex gap-4">
		<label>
			<input type="radio" bind:group={selected_size} name="size" value="small" />
			small
		</label>

		<label>
			<input type="radio" bind:group={selected_size} name="size" value="medium" />
			medium
		</label>

		<label>
			<input type="radio" bind:group={selected_size} name="size" value="large" />
			large
		</label>
	</div>

	<div class="flex gap-1 items-center">
		<svelte:component this={icons[selected_icon].component} class={sizes[selected_size]} />
		<div>{icons[selected_icon].name}</div>
	</div>
</div>
