<script lang="ts">
	import { page } from '$app/state';
	import {
		ContentLayout,
		PostHeader,
		SeoCanonicalUrl,
		SeoFediverseCreator,
		SeoLdPost
	} from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	// Coerce `post` to not be undefined.
	let post = $derived(page.data.post!);
</script>

<SeoLdPost value={post} />
<SeoFediverseCreator username="@thilo@maier.social" />
<SeoCanonicalUrl origin={data.origin} />

<ContentLayout>
	{#snippet header()}
		<PostHeader value={post} class="mb-12" />
	{/snippet}

	{@render children()}
</ContentLayout>
