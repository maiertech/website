<div class="page">
	{#if $$slots.header}
		<div class="header">
			<slot name="header" />
		</div>
	{/if}

	<main>
		<slot />
	</main>

	{#if $$slots.footer}
		<div class="footer">
			<slot name="footer" />
		</div>
	{/if}
</div>
