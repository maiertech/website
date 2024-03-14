<div class="root">
	{#if $$slots.header}
		<div class="header">
			<slot name="header" />
		</div>
	{/if}

	<div class="content">
		<slot />
	</div>

	{#if $$slots.footer}
		<div class="footer">
			<slot name="footer" />
		</div>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-4);
		min-height: 100vh;
	}

	.header {
		flex-shrink: 0;
	}

	.content {
		flex: 1;
	}

	.footer {
		flex-shrink: 0;
	}
</style>
