<script lang="ts">
	import { Image } from '@maiertech/sveltekit-helpers';
	import type { Author } from '@maiertech/sveltekit-helpers';

	interface Props {
		value: Author;
		large?: boolean;
	}

	let { value, large = false }: Props = $props();
</script>

<div class="flex items-center gap-2 font-semibold {large ? 'text-lg' : 'text-base'}">
	<div class="overflow-hidden rounded-full {large ? 'h-9 w-9' : 'h-7 w-7'}">
		<Image alt={value.name} src={value.imageUrl} aspectRatio={1 / 1} />
	</div>
	<p>{value.name}</p>
</div>
