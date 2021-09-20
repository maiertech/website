<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/header.svelte';
  import Container from '$lib/components/container.svelte';
  import Footer from '$lib/components/footer.svelte';
</script>

<!-- Wrapped in flex #svelte div. -->
<div class="flex-shrink-0 mb-3 md:mb-6">
  <Header />
</div>
<main id="skip" class="flex-1 mb-8 md:mb-12">
  <Container><slot /></Container>
</main>
<div class="flex-shrink-0">
  <Footer />
</div>
