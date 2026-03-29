<script lang="ts">
	import { NotePreview, type Note } from '@maiertech/sveltekit-helpers';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		values: Note[];
		level: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
	}

	let { values, level, class: className }: Props = $props();
</script>

<div data-component="NoteList" class={twMerge(className, 'flex flex-wrap gap-6')}>
	{#each values as note (note.path)}
		<NotePreview value={note} {level} class="grow basis-2xs" />
	{/each}
</div>
