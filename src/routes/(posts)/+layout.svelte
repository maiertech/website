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
		<PostHeader post={data.post} class="mb-12" />
	{/snippet}

	{@render children()}
</ContentLayout>
