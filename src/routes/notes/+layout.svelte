<script lang="ts">
	import { page } from '$app/state';
	import { Note, SeoCanonicalUrl, SeoFediverseCreator } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoFediverseCreator username="@thilo@mastodon.nl" />
<SeoCanonicalUrl origin={data.origin} />

{#if page.data.note}
	<Note value={page.data.note}>
		{@render children()}
	</Note>
{/if}
