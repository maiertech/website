<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Note, SeoFediverseCreator, SeoCanonicalUrl } from '@maiertech/sveltekit-helpers';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoFediverseCreator username="@thilo@maier.social" />
<SeoCanonicalUrl origin={data.origin} />

{#if page.data.note}
	<Note value={page.data.note}>
		{@render children()}
	</Note>
{/if}
