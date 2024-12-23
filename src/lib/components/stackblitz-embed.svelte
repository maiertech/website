<script lang="ts">
	import stackblitz from '$lib/actions/stackblitz';
	import type { EmbedOptions, Project } from '@stackblitz/sdk';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		project: Project | string;
		options: EmbedOptions;
		class?: string;
	}

	let { project, options = {}, class: className }: Props = $props();
</script>

<div class="h-[clamp(20rem,40vw,30rem)] rounded-lg bg-secondary">
	<iframe
		use:stackblitz={{ project, options }}
		title="This iframe will be swapped out."
		class={twMerge(className, 'h-full w-full rounded-lg')}
	></iframe>
</div>
