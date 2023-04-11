<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	onMount(() => {
		Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID, {
			url: 'https://firefly.maier.tech/script.js',
			honorDNT: true
		});
	});

	// Track page view when path changes.
	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>
