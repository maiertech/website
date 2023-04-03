<div>
	<slot />
</div>

<style>
	div {
		margin-inline: auto;
		max-width: 80rem;
		padding-inline: var(--size-3);
	}

	@media (min-width: 768px) {
		div {
			padding-inline: var(--size-5);
		}
	}

	@media (min-width: 1024px) {
		div {
			padding-inline: var(--size-7);
		}
	}

	@media (min-width: 1440px) {
		div {
			padding-inline: 0;
		}
	}
</style>
