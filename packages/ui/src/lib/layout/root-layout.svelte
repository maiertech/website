<script>
	import { Container } from '$lib';
</script>

<div class="wrapper">
	{#if $$slots.header}
		<header>
			<Container>
				<slot name="header" />
			</Container>
		</header>
	{/if}

	<div class="main">
		<Container>
			<slot />
		</Container>
	</div>

	{#if $$slots.footer}
		<footer>
			<slot name="footer" />
		</footer>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-4);
		min-height: 100vh;
	}

	header {
		flex-shrink: 0;
	}

	.main {
		flex: 1;
		max-width: 80rem;
		margin-inline: auto;
	}

	footer {
		flex-shrink: 0;
	}
</style>
