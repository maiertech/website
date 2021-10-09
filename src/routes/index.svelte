<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
  import Categories from '$lib/components/categories.svelte';
</script>

<SEO
  title="Thilo Maier"
  description="Learn, create, share. Repeat. I write about creating web apps with SvelteKit and Svelte, visualizing data and how I reclaim my digital privacy."
/>

<section class="text-center py-8 lg:py-12">
  <p class="font-extrabold text-4xl sm:text-5xl lg:text-6xl sm:tracking-tight">
    Learn, create, share. Repeat.
  </p>
  <p class="max-w-xl mt-5 mx-auto text-xl text-text-light">
    Hi, my name is Thilo. I am a developer based in Queens, NY. I write about
    creating web apps with SvelteKit and Svelte, visualizing data and how I
    reclaim my digital privacy.
  </p>
</section>
<section>
  <Categories />
</section>
