<script>
	/** @type {import('$lib/types').Color} */
	export let type = 'brand';

	export let large = false;
</script>

<button class:large class:accent={type === 'accent'}>
	<slot />
</button>

<style>
	button {
		font-size: var(--font-size-0);
		font-weight: var(--font-weight-5);
		border-radius: var(--radius-2);
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

	@media (hover: hover) {
		button:hover {
			background-color: var(--brand-alt);
			outline: var(--border-size-1) dashed var(--brand-alt);
		}

		button:hover.accent {
			background-color: var(--accent-alt);
			outline: var(--border-size-1) dashed var(--accent-alt);
		}
	}
</style>
