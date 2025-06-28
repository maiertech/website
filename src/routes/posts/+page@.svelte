<script lang="ts">
	import { Ul } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-[clamp(1rem,2vw,1.5rem)] text-4xl font-bold">{data.seo.title}</h1>

<Ul>
	{#each data.posts as post (post.path)}
		<li>
			<a href={post.path}>{post.title}</a>
		</li>
	{/each}
</Ul>
