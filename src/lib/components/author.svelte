<script>
	import { Image } from '$lib/components';

	/** @type {import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').authorSchema>} */
	export let value;

	/** @type {boolean} */
	export let large = false;
</script>

<div class="author" class:large>
	<div class="avatar">
		<Image alt={value.name} src={value.imageUrl} aspectRatio={1 / 1} />
	</div>
	<p>{value.name}</p>
</div>

<style>
	.author {
		display: flex;
		align-items: center;
		gap: var(--size-2);
		font-size: var(--font-size-1);
		font-family: var(--font-sans);
		font-weight: var(--font-weight-6);

		&.large {
			font-size: var(--font-size-2);
		}
	}

	.avatar {
		inline-size: var(--size-6);
		block-size: var(--size-6);
		border-radius: var(--radius-round);
		overflow: hidden;
	}

	.large {
		& .avatar {
			inline-size: var(--size-7);
			block-size: var(--size-7);
		}
	}
</style>
