<script>
	/** @type {'brand' | 'accent' | 'warning'} */
	export let color = 'brand';

	/** @type {'default' | 'large'} */
	export let type = 'default';
</script>

<span
	class:large={type === 'large'}
	class:accent={color === 'accent'}
	class:warning={color === 'warning'}
>
	<slot />
</span>

<style>
	span {
		display: inline;
		border-radius: var(--radius-round);
		color: var(--surface-1);
		background-color: var(--brand);
		padding-block: var(--size-1);
		padding-inline: var(--size-2);
		font-weight: var(--font-weight-5);
		font-size: var(--font-size-0);
	}

	.large {
		font-size: var(--font-size-1);
		font-weight: var(--font-weight-6);
		padding-inline: var(--size-3);
	}

	.accent {
		background-color: var(--accent);
	}

	.warning {
		background-color: var(--warning);
	}
</style>
