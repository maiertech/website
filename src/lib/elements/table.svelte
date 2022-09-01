<div class="table">
	<table>
		<slot />
	</table>
</div>

<style>
	div {
		max-width: 100%;
		overflow: hidden;
		overflow-x: auto;
		border: var(--border-size-2) solid var(--text-2);
		border-radius: var(--radius-2);
	}

	table {
		border-collapse: collapse;
		min-width: 100%;
	}
</style>
