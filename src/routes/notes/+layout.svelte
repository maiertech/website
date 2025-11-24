<script lang="ts">
	import { page } from '$app/state';
	import { Note, SeoCanonicalUrl } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

{#if page.data.note}
	<Note value={page.data.note}>
		{@render children()}
	</Note>
{/if}
