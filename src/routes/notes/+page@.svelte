<script lang="ts">
	import { H1 } from '@maiertech/sveltekit-helpers';
	import { NoteList } from '$lib/components';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<H1 class="mb-8">{data.seo.title}</H1>

<NoteList values={data.notes} as="h2" />
