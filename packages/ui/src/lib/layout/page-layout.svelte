<div>
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}

	<main>
		<slot />
	</main>

	{#if $$slots.footer}
		<footer>
			<slot name="footer" />
		</footer>
	{/if}
</div>
