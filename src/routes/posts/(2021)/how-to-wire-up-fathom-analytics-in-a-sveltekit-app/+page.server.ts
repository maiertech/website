import type { PageServerLoad } from './$types';
import { transformPostWithLastmodDate } from '$lib/server/transformations';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await transformPostWithLastmodDate(meta, event);
	const { title, description } = post;

	return { examples, post, seo: { title, description } };
};

const examples = {
	'hard-wired-site-id': `<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	onMount(() => {
		Fathom.load('ABCDEFG');
	});
</script>`,
	'site-id-in-env-variables': `<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID);
	});
</script>`,
	'extreme-eu-isolation': `<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID, {
			url: 'https://cdn-eu.usefathom.com/script.js'
		});
	});
</script>`,
	'tracking-client-side-route-changes': `<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID, {
			url: 'https://refreshing-golden-years.maier.tech/script.js'
		});
	});

	// Track page view when path changes.
	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>`,
	'social-icons': `<script>
	export let icons;
</script>

<div>
	{#each icons as icon (icon.key)}
		<a href={icon.href} on:click={icon.onclick}>
			<span>{icon.title}</span>
			<svelte:component this={icon.component} />
		</a>
	{/each}
</div>
`
};
