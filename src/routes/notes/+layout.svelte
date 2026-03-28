<script lang="ts">
	import { NoteHeader, SeoCanonicalUrl } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<NoteHeader value={data.note} class="mb-8" />

{@render children()}
