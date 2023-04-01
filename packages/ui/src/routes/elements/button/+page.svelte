<script>
	import { Button } from '$lib';
</script>

<h1>Button</h1>

<div>
	<Button>SvelteKit</Button>
	<Button large>SvelteKit</Button>
	<Button type="accent">SvelteKit</Button>
	<Button type="accent" large>SvelteKit</Button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--size-3);
	}
</style>
