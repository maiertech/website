<script lang="ts">
	import {
		ContentLayout,
		PostHeader,
		SeoFediverseCreator,
		SeoLdPost
	} from '@maiertech/sveltekit-helpers';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
</script>

<SeoLdPost post={data.post} />
<SeoFediverseCreator username="@thilo@maier.social" />

<ContentLayout>
	{#snippet header()}
		<PostHeader post={data.post} />
	{/snippet}
	<article>
		{@render children()}
	</article>
</ContentLayout>

<style>
	article {
		display: grid;
		/* Prevent grid blowout: https://courses.joshwcomeau.com/css-for-js/07-css-grid/16-managing-overflow. */
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: var(--size-fluid-3);
		margin-bottom: var(--size-fluid-4);
	}
</style>
