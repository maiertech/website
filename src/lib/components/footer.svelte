<script lang="ts">
	import navLinks from '$lib/nav-links';
	import { track } from '@vercel/analytics';
	import { SocialIcon } from '@maiertech/sveltekit-helpers';
	import 'iconify-icon';
</script>

<div
	data-component="Footer"
	class="flex flex-col items-center gap-6 bg-secondary py-[clamp(1.5rem,3vw,2rem)]"
>
	<nav aria-label="Footer" class="flex flex-wrap justify-center gap-[clamp(1rem,2vw,1.5rem)]">
		{#each navLinks as link (link.title)}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
	<div class="flex gap-5">
		<SocialIcon href="https://bsky.app/profile/maier.tech" ariaLabel="Follow me on BlueSky">
			<iconify-icon icon="simple-icons:bluesky" height="100%" class="block h-8 w-8"></iconify-icon>
		</SocialIcon>
		<SocialIcon
			onclick={() => {
				track('Mastodon icon clicked');
			}}
			href="https://maier.social/@thilo"
			decorator="mastodon"
			ariaLabel="Follow me on Mastodon"
		>
			<iconify-icon icon="simple-icons:mastodon" height="100%" class="block h-8 w-8"></iconify-icon>
		</SocialIcon>
		<SocialIcon href="https://github.com/maiertech" ariaLabel="Follow me on GitHub">
			<iconify-icon icon="simple-icons:github" height="100%" class="block h-8 w-8"></iconify-icon>
		</SocialIcon>
		<SocialIcon href="/rss.xml" ariaLabel="Subscribe to my RSS feed">
			<iconify-icon icon="simple-icons:rss" height="100%" class="block h-8 w-8"></iconify-icon>
		</SocialIcon>
	</div>
	<p>&copy; {new Date().getFullYear()} Thilo Maier</p>
</div>
