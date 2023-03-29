<script>
	import Tags from '$lib/components/tags.svelte';

	/** @type {import('zod').z.infer<typeof import('$lib/schemas/content').TopicsSchema>} */
	export let topics;
</script>

{#if topics.length > 0}
	<footer>
		Published in <Tags tags={topics} color="accent" />.
	</footer>
{/if}
