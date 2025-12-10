<script lang="ts">
	import { NotePreview, H2, PostPreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="sr-only">Thilo Maier</h1>

<section class="mb-12 max-w-[45ch] text-xl lg:text-2xl">
	<p>{data.seo.description}</p>
</section>

<H2>Posts</H2>

<section class="@container mb-12">
	<div class="grid grid-cols-1 gap-6 @xl:grid-cols-2">
		{#each data.posts as post (post.path)}
			<PostPreview value={post} level={3} />
		{/each}
	</div>
</section>

<H2>Notes</H2>

<section class="@container mb-12">
	<div class="grid grid-cols-1 gap-6 @lg:grid-cols-2 @4xl:grid-cols-3">
		{#each data.notes as note (note.path)}
			<NotePreview value={note} level={3} />
		{/each}
	</div>
</section>
