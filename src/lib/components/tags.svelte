<script lang="ts">
	import type { Tag } from '$models/content.model';

	export let tags: Tag[];
	export let inverse = false;
</script>

<ul>
	{#each tags as tag (tag.id)}
		<li class:inverse>
			<a href={tag.path}>
				{tag.label}
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
		background-color: var(--surface-3);
		font-size: var(--font-size-fluid-0);
		font-weight: var(--font-weight-6);
		border-radius: var(--radius-round);
		padding: 0.2em 0.6em;
	}

	li.inverse {
		background-color: var(--surface-2);
	}

	li:hover {
		background-color: var(--surface-2);
	}

	li:hover.inverse {
		background-color: var(--surface-3);
	}

	a {
		color: var(--text-1);
	}

	a:hover {
		text-decoration: none;
	}
</style>
