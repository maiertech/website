<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';

	onMount(() => {
		Fathom.load('FATHOM_SITE_ID', {
			includedDomains: ['maier.tech']
		});
	});
</script>
