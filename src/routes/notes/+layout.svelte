<script lang="ts">
	import { Note, SeoCanonicalUrl } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<Note value={data.note}>
	{@render children()}
</Note>
