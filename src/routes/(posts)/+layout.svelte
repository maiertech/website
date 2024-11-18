<script lang="ts">
	import {
		ContentLayout,
		PostHeader,
		SeoFediverseCreator,
		SeoLdPost
	} from '@maiertech/sveltekit-helpers';

	export let data;
</script>

<SeoLdPost post={data.resolvedPost} />
<SeoFediverseCreator username="@thilo@maier.social" />

<ContentLayout>
	<PostHeader post={data.resolvedPost} slot="header" />
	<article>
		<slot />
	</article>
</ContentLayout>

<style>
	article {
		display: grid;
		/* Prevent grid blowout: https://courses.joshwcomeau.com/css-for-js/07-css-grid/16-managing-overflow. */
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: var(--size-fluid-3);
		margin-bottom: var(--size-fluid-4);
	}
</style>
