<script lang="ts">
	import navLinks from '$lib/nav-links';
	import { SocialIcon } from '@maiertech/sveltekit-helpers';
	import { siBluesky, siGithub, siMastodon, siRss } from 'simple-icons';
</script>

<div
	data-component="Footer"
	class="flex flex-col items-center gap-6 bg-surface-muted py-[clamp(1.5rem,3vw,2rem)]"
>
	<nav aria-label="Footer" class="flex flex-wrap justify-center gap-[clamp(1rem,2vw,1.5rem)]">
		{#each navLinks as link (link.title)}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
	<div class="flex gap-5">
		<SocialIcon href="/rss.xml" ariaLabel="Subscribe to my RSS feed">
			<svg class="block h-8 w-8" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siRss.path} />
				<title>{siRss.title}</title>
			</svg>
		</SocialIcon>
		<SocialIcon href="https://bsky.app/profile/maier.tech" ariaLabel="Follow me on BlueSky">
			<svg class="block h-8 w-8" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siBluesky.path} />
				<title>{siBluesky.title}</title>
			</svg>
		</SocialIcon>
		<SocialIcon
			href="https://mastodon.nl/@thilo"
			decorator="mastodon"
			ariaLabel="Follow me on Mastodon"
		>
			<svg class="block h-8 w-8" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siMastodon.path} />
				<title>{siMastodon.title}</title>
			</svg>
		</SocialIcon>
		<SocialIcon href="https://github.com/maiertech" ariaLabel="Follow me on GitHub">
			<svg class="block h-8 w-8" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siGithub.path} />
				<title>{siGithub.title}</title>
			</svg>
		</SocialIcon>
	</div>
	<p>&copy; {new Date().getFullYear()} Thilo Maier</p>
</div>
