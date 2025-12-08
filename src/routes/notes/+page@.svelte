<script lang="ts">
	import { H1, LinkPreview, type LinkMeta } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const links = $derived.by(() =>
		data.notes.map((note) => ({
			href: note.path,
			text: note.title,
			description: note.description,
			ogImageUrl: note.ogImageUrl
		}))
	);
</script>

<H1>{data.seo.title}</H1>

<div class="@container">
	<div class="grid grid-cols-1 gap-4 @lg:grid-cols-2 @4xl:grid-cols-3">
		{#each links as link (link.href)}
			<LinkPreview value={link} />
		{/each}
	</div>
</div>
