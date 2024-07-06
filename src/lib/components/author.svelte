<script>
	import Image from '$lib/components/image.svelte';

	/** @type {import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').authorSchema>} */
	export let value;

	/** @type {boolean} */
	export let large = false;
</script>

<div class:large>
	<div class="portrait">
		<Image alt={value.name} src={value.imageUrl} width={966} height={966} />
	</div>
	<p>{value.name}</p>
	<a href={value.url}><span /></a>
</div>

<style>
	div {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--size-2);
	}

	.large div {
		gap: var(--size-3);
	}

	p {
		font-size: var(--font-size-1);
		font-weight: var(--font-weight-6);
	}

	.large p {
		font-size: var(--font-size-2);
	}

	span {
		position: absolute;
		inset: 0;
	}

	.portrait {
		inline-size: var(--size-6);
		block-size: var(--size-6);
	}

	.large .portrait {
		inline-size: var(--size-7);
		block-size: var(--size-7);
	}
</style>
