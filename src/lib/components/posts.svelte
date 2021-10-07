<script lang="ts">
  import type { PostMetadata } from '$lib/types/post-metadata.type';
  import { format } from 'date-fns';

  export let posts: PostMetadata[];
</script>

<section class="grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
  {#each posts as post (post.title)}
    <article class="flex flex-col space-y-3">
      <p class="text-sm text-text-lighter">
        <time dateTime={format(new Date(post.updated), 'yyyy-MM-dd')}>
          {format(new Date(post.updated), 'MMM d, yyyy')}
        </time>
      </p>
      <a href={post.path} class="flex-grow">
        <p class="text-2xl md:text-3xl font-bold leading-tight">
          {post.title}
        </p>
        <p class="mt-3 text-base">{post.description}</p>
      </a>
      <a
        href={post.path}
        class="text-lg font-semibold text-primary-default hover:text-primary-lighter"
      >
        Read post
      </a>
    </article>
  {/each}
</section>
