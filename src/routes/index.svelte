<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
  import Categories from '$lib/components/categories.svelte';
</script>

<SEO
  title="Thilo Maier"
  description="Hi, my name is Thilo. I am a developer based in Queens, NY. I write about web development and developer tools."
/>

<section class="py-8 text-center lg:py-12">
  <p class="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
    Learn, create, share. Repeat.
  </p>
  <p class="text-text-light mx-auto mt-5 max-w-xl text-xl">
    Hi, my name is Thilo. I am a developer based in Queens, NY. I write about
    web development and developer tools.
  </p>
</section>
<section>
  <Categories />
</section>
