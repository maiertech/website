<script>
	import { Badge } from '$lib';
</script>

<h1>Badge</h1>

<div>
	<Badge>SvelteKit</Badge>
	<Badge large>SvelteKit</Badge>
	<Badge type="accent">SvelteKit</Badge>
	<Badge type="accent" large>SvelteKit</Badge>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--size-3);
	}
</style>
