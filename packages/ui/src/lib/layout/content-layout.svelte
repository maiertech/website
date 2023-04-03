<div>
	{#if $$slots.start}
		<aside id="start">
			<slot name="start" />
		</aside>
	{/if}

	<slot />

	{#if $$slots.end}
		<aside id="end">
			<slot name="end" />
		</aside>
	{/if}
</div>
