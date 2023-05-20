<script>
	/** @type {import('$lib/types').ElementType} */
	export let type = 'brand';

	export let large = false;
</script>

<span class:large class:accent={type === 'accent'}>
	<slot />
</span>

<style>
	span {
		display: inline;
		font-size: var(--font-size-0);
		font-weight: var(--font-weight-5);
		border-radius: var(--radius-round);
		color: var(--surface-1);
		background-color: var(--brand);
		padding-block: var(--size-1);
		padding-inline: var(--size-2);
	}

	.large {
		font-size: var(--font-size-1);
		font-weight: var(--font-weight-6);
		padding-inline: var(--size-3);
	}

	.accent {
		background-color: var(--accent);
	}
</style>
