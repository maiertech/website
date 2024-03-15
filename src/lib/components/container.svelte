<script>
	/** @type {string} */
	export let max_width = '80rem';
	export let padding = true;
</script>

<div class:padding style:--max-width={max_width}>
	<slot />
</div>

<style>
	div {
		max-width: var(--max-width);
		margin-inline: auto;
		padding-inline: 0;
	}

	.padding {
		padding-inline: var(--size-3);
	}

	@media (min-width: 768px) {
		.padding {
			padding-inline: var(--size-5);
		}
	}

	@media (min-width: 1024px) {
		.padding {
			padding-inline: var(--size-7);
		}
	}

	@media (min-width: 1440px) {
		.padding {
			padding-inline: 0;
		}
	}
</style>
