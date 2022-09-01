<script>
	export let maxWidth = '60ch';
	export let padding = 'var(--size-3)';
</script>

<div style:--container-max-width={maxWidth} style:--container-padding={padding} class="container">
	<slot />
</div>

<style>
	.container {
		width: min(100% - 2 * var(--container-padding), var(--container-max-width));
		margin-inline: auto;
	}
</style>
