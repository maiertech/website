<script>
	/** @type {import('$lib/types').SocialIcon[]} */
	export let icons;
</script>

<div>
	{#each icons as icon (icon.id)}
		<a
			data-sveltekit-reload
			rel={icon.id === 'mastodon' ? 'me' : undefined}
			href={icon.href}
			on:click={icon.onclick}
			class="icon"
		>
			<svelte:component this={icon.component} title={icon.title} />
		</a>
	{/each}
</div>

<style>
	div {
		width: fit-content;
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-fluid-2);
	}

	a {
		color: var(--link);
	}

	.icon {
		width: var(--size-fluid-4);
	}
</style>
