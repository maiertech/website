<script lang="ts">
	import { Posts } from '$lib/components';
	import { Button, NotePreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="mb-12 max-w-[45ch] text-xl lg:text-2xl">
	<p>{data.seo.description}</p>
</section>

<section class="mb-12 flex flex-wrap gap-4">
	{#each data.notes as note (note.path)}
		<NotePreview value={note}></NotePreview>
	{/each}
</section>

<section class="mb-12">
	<Posts posts={data.posts} />
</section>
