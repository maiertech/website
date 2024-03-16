<script>
	import Tags from '$lib/components/tags.svelte';
	import { format } from '$lib/utils/date';

	/** @type {import('$lib/types').ResolvedPost} */
	export let data;
</script>

<header>
	<h1>{data.title}</h1>
	<div>
		<span class="published">
			{data.author?.name} •
			<time dateTime={data.published_date}>
				{format(data.published_date)}
			</time>
		</span>
		{#if data.lastmod_date}
			<br />
			<span class="modified">
				Last modified:
				<time dateTime={data.lastmod_date}>
					{format(data.lastmod_date)}
				</time>
			</span>
		{/if}
	</div>
	{#if data.tags}
		<Tags tags={data.tags} />
	{/if}
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-3);
		margin-bottom: var(--size-fluid-4);
	}

	h1 {
		font-size: var(--font-size-fluid-3);
		line-height: var(--font-lineheight-1);
	}

	.published {
		font-size: var(--font-size-fluid-1);
		font-weight: var(--font-weight-7);
	}

	.modified {
		font-size: var(--font-size-fluid-0);
	}
</style>
