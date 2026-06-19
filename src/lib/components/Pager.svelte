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
		class={twMerge(className, 'flex flex-wrap gap-6 border-t-2 pt-8 font-sans  text-primary-500')}
	>
		{#if prev}
			<div class="grow basis-2xs">
				<a href={prev.path} class="flex items-center justify-start">
					<ChevronLeft class="size-6 flex-none pt-1" />
					<span class="min-w-0 pl-2 text-xl leading-tight font-semibold text-pretty max-inline-xs">
						{prev.title}
					</span>
				</a>
			</div>
		{/if}
		{#if next}
			<div class="grow basis-2xs">
				<a href={next.path} class="flex items-center justify-end">
					<span
						class="min-w-0 pr-2 text-right text-xl leading-tight font-semibold text-pretty max-inline-xs"
					>
						{next.title}
					</span>
					<ChevronRight class="size-6 flex-none pt-1" />
				</a>
			</div>
		{/if}
	</nav>
{/if}
