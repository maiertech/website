<script lang="ts">
	import Tags from '$lib/components/tags.svelte';

	import type { Post } from '$models/content.model';

	export let post: Post;

	// Topic labels are short form. Use titles as labels.
	$: tags = post.topics?.map((topic) => ({ ...topic, label: topic.title }));
</script>

{#if post.topics}
	<footer>
		Published in <Tags {tags} inverse />.
	</footer>
{/if}
