<script>
	import { Container, PageLayout } from 'ui';
</script>

<PageLayout>
	<Container padding={false} max_width="60ch">
		<article>
			<slot />
		</article>
	</Container>
</PageLayout>

<style>
	article {
		display: grid;
		gap: var(--size-fluid-3);
	}
</style>
