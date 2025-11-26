<script lang="ts">
	import { Ul } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-[clamp(1rem,2vw,1.5rem)] text-4xl font-bold">{data.seo.title}</h1>

<Ul>
	{#each data.notes as note (note.path)}
		<li>
			<a href={note.path}>{note.title}</a>
		</li>
	{/each}
</Ul>
