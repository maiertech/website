<script lang="ts">
	import { Author } from '$lib/components';
	import { formatDate } from '@maiertech/sveltekit-helpers';
	import type { Post } from '@maiertech/sveltekit-helpers';

	interface Props {
		post: Post;
		large?: boolean;
	}

	let { post, large = false }: Props = $props();
</script>

<article data-component="PostPreview" class:large>
	<div class="relative">
		<time
			datetime={post.publishedDate}
			class="block text-secondary {large ? 'mb-4 text-lg' : 'mb-2 text-base'}"
		>
			{formatDate(post.publishedDate)}
		</time>
		<h2 class="font-semibold {large ? 'mb-5 max-w-[25ch] text-3xl' : 'mb-4 max-w-[20ch] text-2xl'}">
			{post.title}
		</h2>
		<p class="mb-4 max-w-[45ch] font-serif">{post.description}</p>
		<a
			href={post.path}
			class="font-semibold text-primary no-underline {large ? 'text-lg' : 'text-base'}"
		>
			Continue reading <span aria-hidden="true">&rarr;</span>
		</a>
	</div>
	{#if post.author}
		<div class={large ? 'mt-5' : 'mt-4'}>
			<Author value={post.author} {large} />
		</div>
	{/if}
</article>
