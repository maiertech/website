<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		prev?: { title: string; path: string };
		next?: { title: string; path: string };
		class?: string;
	}

	let { prev, next, class: className }: Props = $props();
</script>

{#if prev || next}
	<nav
		class={twMerge(className, 'flex flex-wrap gap-6 border-t-2 border-secondary pt-8 text-primary')}
	>
		{#if prev}
			<div class="grow basis-2xs">
				<a href={prev.path} class="flex items-start justify-start">
					<ChevronLeft class="size-6 flex-none pt-1" />
					<span class="min-w-0 text-xl font-semibold text-pretty max-inline-xs">{prev.title}</span>
				</a>
			</div>
		{/if}
		{#if next}
			<div class="grow basis-2xs">
				<a href={next.path} class="flex items-start justify-end">
					<span class="min-w-0 text-right text-xl font-semibold text-pretty max-inline-xs">
						{next.title}
					</span>
					<ChevronRight class="size-6 flex-none pt-1" />
				</a>
			</div>
		{/if}
	</nav>
{/if}
