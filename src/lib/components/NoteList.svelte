<script lang="ts">
	import { NotePreview, type Note } from '@maiertech/sveltekit-helpers';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		values: Note[];
		as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		class?: string;
	}

	let { values, as, class: className }: Props = $props();
</script>

<div data-component="NoteList" class={twMerge(className, 'flex flex-wrap gap-6')}>
	{#each values as note (note.path)}
		<NotePreview value={note} {as} class="grow basis-2xs" />
	{/each}
</div>
