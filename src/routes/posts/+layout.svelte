<script lang="ts">
	import { page } from '$app/state';
	import type { PostType } from '@maiertech/sveltekit-helpers';
	import {
		ContentLayout,
		PostHeader,
		SeoFediverseCreator,
		SeoLdPost
	} from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Coerce `post` to not be undefined.
	let post = $derived(page.data.post as PostType);
</script>

<SeoLdPost {post} />
<SeoFediverseCreator username="@thilo@maier.social" />

<ContentLayout>
	{#snippet header()}
		<PostHeader value={post} class="mb-12" />
	{/snippet}

	{@render children()}
</ContentLayout>
