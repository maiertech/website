<script>
	import Image from '$lib/components/image.svelte';

	/** @type {import('$lib/types').Author} */
	export let data;

	/** @type {boolean} */
	export let large = false;
</script>

<div class:large>
	{#if data.image_url}
		<div class="portrait">
			<Image alt={data.name} url={data.image_url} ratio={1} loading="lazy" round />
		</div>
	{/if}
	<p>{data.name}</p>
	{#if data.url}
		<a href={data.url}><span /></a>
	{/if}
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
		max-inline-size: var(--size-6);
	}

	.large .portrait {
		max-inline-size: var(--size-7);
	}
</style>
