<script context="module">
	import navLinks from '$lib/data/navigation';

	/** @type {import('@sveltejs/kit').Load}*/
	export const load = function () {
		return { props: { navLinks } };
	};
</script>

<script>
	import GitHubIcon from '$lib/components/github.svelte';
	import MastodonIcon from '$lib/components/mastodon.svelte';
	import RSSIcon from '$lib/components/rss.svelte';
	import SocialIcons from '$lib/components/social-icons.svelte';
	import { track } from '@vercel/analytics';

	/** @type {import('$lib/types').SocialIcon[] } */
	const icons = [
		{
			id: 'mastodon',
			title: 'Mastodon',
			href: 'https://maier.social/@thilo',
			component: MastodonIcon,
			onclick: () => {
				track('Mastodon icon clicked');
			}
		},
		{
			id: 'github',
			title: 'GitHub',
			href: 'https://github.com/maiertech',
			component: GitHubIcon
		},
		{
			id: 'rss',
			title: 'RSS',
			href: '/rss.xml',
			component: RSSIcon
		}
	];
</script>

<div class="wrapper">
	<nav aria-label="Footer">
		{#each navLinks as link (link.title)}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
	<div class="center">
		<SocialIcons {icons} />
		<p>&copy; {new Date().getFullYear()} Thilo Maier</p>
	</div>
</div>

<style>
	.wrapper {
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
