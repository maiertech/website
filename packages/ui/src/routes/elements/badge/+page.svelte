<script>
	import { Badge } from '$lib';
</script>

<h1>Badge</h1>

<div>
	<Badge>Svelte</Badge>
	<Badge type="large">SvelteKit</Badge>
	<Badge color="accent">Svelte</Badge>
	<Badge color="accent" type="large">SvelteKit</Badge>
	<Badge color="warning">Svelte</Badge>
	<Badge color="warning" type="large">SvelteKit</Badge>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--size-3);
	}
</style>
