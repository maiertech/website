<script context="module">
	import navLinks from '$data/navigation';

	/** @type {import('@sveltejs/kit').Load}*/
	export const load = function () {
		return { props: { navLinks } };
	};
</script>

<script>
	import Container from '$lib/components/container.svelte';
	import SocialIcons from '$lib/components/social-icons.svelte';
	import * as Fathom from 'fathom-client';
	import GitHubIcon from './icon-github.svelte';
	import MastodonIcon from './icon-mastodon.svelte';

	/** @type {import('$lib/types').SocialIcon[] } */
	const icons = [
		{
			id: 'mastodon',
			title: 'Mastodon',
			href: 'https://maier.social/@thilo',
			component: MastodonIcon,
			onclick: () => {
				Fathom.trackGoal('0R92Q3LP', 0);
			}
		},
		{
			id: 'github',
			title: 'GitHub',
			href: 'https://github.com/maiertech',
			component: GitHubIcon
		}
	];
</script>

<footer>
	<Container>
		<nav aria-label="Footer">
			{#each navLinks as link (link.title)}
				<a href={link.href}>{link.title}</a>
			{/each}
		</nav>
		<div class="center">
			<SocialIcons {icons} />
			<p>&copy; 2023 Thilo Maier</p>
		</div>
	</Container>
</footer>

<style>
	footer {
		background: var(--surface-2);
		padding-block: var(--size-fluid-3);
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--size-fluid-2);
		padding-bottom: var(--size-fluid-3);
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-fluid-2);
	}
</style>
