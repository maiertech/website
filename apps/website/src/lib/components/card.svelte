<div class="card">
	<div class="overflow">
		<slot />
	</div>
</div>

<style>
	.card {
		width: fit-content;
		max-width: 100%;
		overflow-x: auto;
		background: var(--surface-2);
		padding: var(--size-fluid-2);
		border-radius: var(--radius-2);
	}
</style>
