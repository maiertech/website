<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';

	onMount(() => {
		Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID, {});
	});
</script>
