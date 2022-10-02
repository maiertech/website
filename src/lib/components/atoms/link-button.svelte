<script lang="ts">
	export let href: string;
</script>

<a {href}><slot /></a>

<style>
	a {
		border-radius: var(--size-1);
		color: var(--surface-1);
		background-color: var(--brand);
		font-size: var(--font-size-1);
		line-height: var(--font-lineheight-3);
		margin: 0;
		padding-block: var(--size-1);
		padding-inline: var(--size-3);
	}

	@media (hover: hover) {
		a[href]:hover {
			background-color: var(--accent);
			text-decoration: none;
		}

		a[href]:focus {
			background-color: var(--text-1);
		}
	}
</style>
