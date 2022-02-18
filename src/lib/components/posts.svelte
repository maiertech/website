<script lang="ts">
  import type { PostMetadata } from '$lib/types/post-metadata.type';

  export let posts: PostMetadata[];
</script>

<section class="grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
  {#each posts as post (post.title)}
    <article class="flex flex-col space-y-3">
      <p class="text-sm text-text-lighter">
        <time dateTime={post.modified}>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(post.modified))}
        </time>
      </p>
      <a href={post.path} class="flex-grow">
        <p class="text-2xl font-bold leading-tight md:text-3xl">
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
