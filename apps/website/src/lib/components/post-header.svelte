<script>
	import Tags from '$lib/components/tags.svelte';

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let author;

	/**
	 * ISO 8601 date string (YYYY-MM-DDTHH:MM:SS.SSSZ).
	 * @type {string}
	 */
	export let publishedDate;

	/**
	 * IS0 8601 date string (YYYY-MM-DDTHH:MM:SS.SSSZ).
	 * @type {string}
	 */
	export let modifiedDate;

	/** @type {import('zod').z.infer<typeof import('$lib/schemas/content').TagsSchema> | undefined} */
	export let tags = undefined;
</script>

<header>
	<h1>{title}</h1>
	<div>
		<span class="published">
			{author} •
			<time dateTime={publishedDate}>
				{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeZone: 'UTC'
				}).format(new Date(publishedDate))}
			</time>
		</span><br />
		<span class="modified">
			Last modified:
			<time dateTime={modifiedDate}>
				{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeZone: 'UTC'
				}).format(new Date(modifiedDate))}
			</time>
		</span>
	</div>
	{#if tags}
		<Tags {tags} />
	{/if}
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-3);
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
