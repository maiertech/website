<script lang="ts">
	import { H1, LinkPreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const links = $derived.by(() =>
		data.notes.map((note) => ({
			href: note.path,
			title: note.title,
			description: note.description
		}))
	);
</script>

<H1 class="mb-8">{data.seo.title}</H1>

<div class="@container">
	<div class="grid grid-cols-1 gap-5 @lg:grid-cols-2 @4xl:grid-cols-3">
		{#each links as link (link.href)}
			<LinkPreview value={link} />
		{/each}
	</div>
</div>
