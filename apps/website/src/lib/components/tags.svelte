<script>
	import { Badge } from 'ui';

	/** @type {import('$lib/types').Type} */
	export let type = 'brand';

	/** @type {import('$lib/types').Tag[] | import('$lib/types').Topic[]} */
	export let tags;
</script>

<ul>
	{#each tags as tag (tag.id)}
		<li>
			<a href={tag.path}>
				<Badge {type} large>{tag.label}</Badge>
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
