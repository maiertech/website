<script context="module" lang="ts">
	import navLinks from '$data/navigation';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = function () {
		return { props: { navLinks } };
	};
</script>

<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import SocialIcons from '$lib/components/social-icons.svelte';
	import type { SocialIcon } from '$models/content.model';
	import * as Fathom from 'fathom-client';
	import GitHubIcon from './icon-github.svelte';
	import MastodonIcon from './icon-mastodon.svelte';

	const icons: SocialIcon[] = [
		{
			id: 'mastodon',
			title: 'Mastodon',
			href: 'https://mastodon.maier.social/@thilo',
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
			<p>&copy; 2022 Thilo Maier</p>
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
