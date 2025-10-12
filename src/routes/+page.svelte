<script lang="ts">
	import { Posts } from '$lib/components';
	import { NotePreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="sr-only">Thilo Maier</h1>

<section class="mb-12 max-w-[45ch] text-xl lg:text-2xl">
	<p>{data.seo.description}</p>
</section>

<h2 class="mb-4 text-2xl font-bold">Notes</h2>

<section class="mb-12 flex flex-wrap gap-4">
	{#each data.notes as note (note.path)}
		<NotePreview value={note}></NotePreview>
	{/each}
</section>

<h2 class="mb-4 text-2xl font-bold">Posts</h2>

<section class="mb-12">
	<Posts posts={data.posts} />
</section>
