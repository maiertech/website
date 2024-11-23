<script lang="ts">
	import { Logo } from '$lib/components';
	import navLinks from '$lib/nav-links';
</script>

<div class="header">
	<div class="logo"><Logo /></div>
	<div class="title">Thilo Maier</div>
	<nav>
		{#each navLinks.slice(1) as link (link.title)}
			<a href={link.href}>
				{link.title}
			</a>
		{/each}
	</nav>
</div>

<style>
	.header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: var(--size-fluid-1);
		font-family: var(--font-sans);
		color: var(--brand);
		padding: var(--size-5) 0;
	}

	.logo {
		width: var(--size-fluid-4);
	}

	.title {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-6);
	}

	nav {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		gap: var(--size-fluid-1);

		& > a {
			font-size: var(--font-size-fluid-1);
			font-weight: var(--font-weight-5);
			color: var(--link);
		}
	}
</style>
