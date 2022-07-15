<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
  import Categories from '$lib/components/topics.svelte';
  import Container from '$lib/components/container.svelte';

  const title = 'Thilo Maier';
  const description =
    "Hi, I'm Thilo. I am a developer based in New York. I build things with Svelte and keep improving my developer happiness.";
</script>

<SEO {title} {description} />

<section class="intro">
  <Container padding="0">
    <h1 class="text-gradient">Build better. With Svelte.</h1>
    <p>{description}</p>
  </Container>
</section>
<section>
  <Categories />
</section>

<style>
  .intro h1 {
    padding-bottom: var(--size-fluid-4);
  }

  .intro p {
    font-size: var(--size-4);
    font-weight: var(--font-weight-5);
    line-height: var(--font-lineheight-3);
    padding-bottom: var(--size-fluid-3);
  }

  /* lg */
  @media (min-width: 1024px) {
    .intro p {
      font-size: var(--size-5);
      line-height: var(--font-lineheight-2);
    }
  }
</style>
