<script lang="ts">
	import { PostHeader, SeoCanonicalUrl, SeoLdPost } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoLdPost value={data.post} />
<SeoCanonicalUrl origin={data.origin} />

<PostHeader value={data.post} class="mb-12" />

{@render children()}
