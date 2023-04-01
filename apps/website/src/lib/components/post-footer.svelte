<script>
	import Tags from '$lib/components/tags.svelte';

	/** @type {import('$lib/types').Topic[]} */
	export let topics;
</script>

{#if topics.length > 0}
	<footer>
		Published in <Tags tags={topics} type="accent" />.
	</footer>
{/if}
