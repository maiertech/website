<script lang="ts">
  import categories from '$lib/data/categories';
</script>

<dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each categories as category (category.path)}
    <a
      href={category.path}
      class="flex flex-col space-y-5 rounded-lg bg-primary-lighter text-background px-6 py-5 shadow-md  hover:border-primary-lighter "
    >
      <dt class="text-3xl font-bold">{category.title}</dt>
      <dd class="flex-grow">{category.description}</dd>
      <div class="text-lg font-semibold">Check out posts</div>
    </a>
  {/each}
</dl>
