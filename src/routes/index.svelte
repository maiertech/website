<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
  import Categories from '$lib/components/categories.svelte';
</script>

<SEO
  title="Thilo Maier"
  description="Hi, my name is Thilo. I am a developer based in Queens, NY. I write about web development and developer tools."
/>

<section class="text-center py-8 lg:py-12">
  <p class="font-extrabold text-4xl sm:text-5xl lg:text-6xl sm:tracking-tight">
    Learn, create, share. Repeat.
  </p>
  <p class="max-w-xl mt-5 mx-auto text-xl text-text-light">
    Hi, my name is Thilo. I am a developer based in Queens, NY. I write about
    web development and developer tools.
  </p>
</section>
<section>
  <Categories />
</section>
