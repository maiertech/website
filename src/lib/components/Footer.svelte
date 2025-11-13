<script lang="ts">
	// import { getCommitHash } from '$lib/data.remote';
	import navLinks from '$lib/nav-links';
	import { SocialIcon } from '@maiertech/sveltekit-helpers';
	import { siBluesky, siGithub, siRss } from 'simple-icons';

	// const hash = $derived(await getCommitHash());
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
		<SocialIcon href="https://github.com/maiertech" ariaLabel="Follow me on GitHub">
			<svg class="block h-8 w-8" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siGithub.path} />
				<title>{siGithub.title}</title>
			</svg>
		</SocialIcon>
	</div>
	<!-- {#if hash}
		<p>
			<a
				href="https://github.com/maiertech/website/tree/{hash}"
				target="_blank"
				rel="noopener noreferrer"
			>
				{hash.slice(0, 7)}
			</a>
		</p>
	{/if} -->
	<p>&copy; {new Date().getFullYear()} Thilo Maier</p>
</div>
