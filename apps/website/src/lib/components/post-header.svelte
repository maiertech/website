<script>
	import Tags from '$lib/components/tags.svelte';

	/** @type {string} */
	export let title;

	/** @type {string | undefined} */
	export let author;

	/**
	 * ISO 8601 date string (YYYY-MM-DDTHH:MM:SS.SSSZ).
	 * @type {string}
	 */
	export let published;

	/**
	 * IS0 8601 date string (YYYY-MM-DDTHH:MM:SS.SSSZ).
	 * @type {string | undefined}
	 */
	export let lastmod;

	/** @type {import('$lib/types').Tag[] | undefined} */
	export let tags = undefined;
</script>

<header>
	<h1>{title}</h1>
	<div>
		<span class="published">
			{author} •
			<time dateTime={published}>
				{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeZone: 'UTC'
				}).format(new Date(published))}
			</time>
		</span>
		{#if lastmod}
			<br />
			<span class="modified">
				Last modified:
				<time dateTime={lastmod}>
					{new Intl.DateTimeFormat('en-US', {
						dateStyle: 'medium',
						timeZone: 'UTC'
					}).format(new Date(lastmod))}
				</time>
			</span>
		{/if}
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
