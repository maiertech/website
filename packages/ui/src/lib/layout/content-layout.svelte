<div class="content">
	{#if $$slots.start}
		<aside class="start">
			<slot name="start" />
		</aside>
	{/if}

	<div class="page">
		<slot />
	</div>

	{#if $$slots.end}
		<aside class="end">
			<slot name="end" />
		</aside>
	{/if}
</div>
