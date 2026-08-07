<script lang="ts">
	import { H1 } from '@maiertech/sveltekit-helpers';
	import { PostList } from '$lib/components';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<H1 class="mb-8">{data.seo.title}</H1>

<PostList values={data.posts} as="h2" />
