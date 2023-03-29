<script>
	import { Badge } from 'ui';

	/**
	 * @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').TopicsSchema>} Topics
	 * @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').TagsSchema>} Tags
	 */

	/** @type {'brand' | 'accent' | 'warning'} */
	export let color = 'brand';

	/** @type {Topics | Tags} */
	export let tags;
</script>

<ul>
	{#each tags as tag (tag.id)}
		<li>
			<a href={tag.path}>
				<Badge type="large" {color}>{tag.label}</Badge>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: inline-flex;
		flex-direction: row;
		gap: var(--size-fluid-1);
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li {
		padding: 0;
	}

	a {
		color: var(--text-1);
	}

	a:hover {
		text-decoration: none;
	}
</style>
