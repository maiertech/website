<script lang="ts">
	import navLinks from '$lib/nav-links';
	import { track } from '@vercel/analytics';
	import { SocialIcon } from '@maiertech/sveltekit-helpers';
	import 'iconify-icon';
</script>

<div class="footer">
	<nav aria-label="Footer">
		{#each navLinks as link (link.title)}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
	<div class="social-icons">
		<SocialIcon
			on:click={() => {
				track('Mastodon icon clicked');
			}}
			href="https://maier.social/@thilo"
			decorator="mastodon"
		>
			<iconify-icon icon="simple-icons:mastodon" height="100%"></iconify-icon>
		</SocialIcon>
		<SocialIcon href="https://github.com/maiertech">
			<iconify-icon icon="simple-icons:github" height="100%"></iconify-icon>
		</SocialIcon>
		<SocialIcon href="/rss.xml">
			<iconify-icon icon="simple-icons:rss" height="100%"></iconify-icon>
		</SocialIcon>
	</div>
	<p>&copy; {new Date().getFullYear()} Thilo Maier</p>
</div>

<style>
	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-5);
		font-family: var(--font-sans);
		background: var(--surface-2);
		padding-block: var(--size-fluid-3);
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--size-fluid-2);

		& a {
			color: var(--link);
		}
	}

	.social-icons {
		display: flex;
		gap: var(--size-4);
		color: var(--link);

		& iconify-icon {
			display: block; /* Prevent inline gap below icon. */
			inline-size: var(--size-7);
			block-size: var(--size-7);
		}
	}
</style>
