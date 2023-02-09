<script>
	import Tags from '$lib/components/tags.svelte';

	/** @type {import('$lib/types').Post}*/
	export let post;

	// Topic labels are short form. Use titles as labels.
	$: tags = post.topics?.map((topic) => ({ ...topic, label: topic.title }));
</script>

{#if tags}
	<footer>
		Published in <Tags {tags} inverse />.
	</footer>
{/if}
