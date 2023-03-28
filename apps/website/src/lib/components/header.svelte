<script context="module">
	import navLinks from '$lib/data/navigation';

	/** @type {import('@sveltejs/kit').Load} */
	export const load = function () {
		return { props: { navLinks } };
	};
</script>

<script>
	import Logo from '$lib/components/logo.svelte';
	import { ContainerWithPadding } from 'ui';
</script>

<ContainerWithPadding>
	<header>
		<a href="/">
			<div class="logo"><Logo /></div>
			<div class="title">Thilo Maier</div>
		</a>
		<nav>
			{#each navLinks as link (link.title)}
				<a href={link.href}>
					{link.title}
				</a>
			{/each}
		</nav>
	</header>
</ContainerWithPadding>

<style>
	header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: var(--size-fluid-1);
		padding: var(--size-5) 0;
	}

	header > a {
		display: flex;
		align-items: center;
		gap: var(--size-fluid-1);
		text-decoration: none;
	}

	.logo {
		width: var(--size-fluid-4);
	}

	.title {
		font-size: var(--font-size-fluid-2);
		font-weight: 600;
	}

	nav {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		gap: var(--size-fluid-1);
	}

	nav > a {
		font-size: var(--font-size-fluid-1);
	}
	nav > a:hover {
		text-decoration: underline var(--link);
	}
</style>
