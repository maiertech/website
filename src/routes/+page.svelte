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

<section class="grid grid-cols-1 gap-[clamp(1.5rem,3vw,2rem)] md:grid-cols-2 lg:grid-cols-3">
	{#each data.topics as topic (topic.label)}
		<article
			class="flex flex-col items-start gap-[clamp(1.5rem,3vw,2rem)] rounded-md bg-secondary p-[clamp(1rem,2vw,1.5rem)]"
		>
			<h2 class="text-2xl font-semibold">{topic.label}</h2>
			<p class="flex-1 leading-6">{topic.description}</p>
			<Button href={topic.path}>Check out posts</Button>
		</article>
	{/each}
</section>
