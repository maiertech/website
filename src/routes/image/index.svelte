<script lang="ts">
  import type { Images } from '$lib/types/images.type';

  import Image from '$lib/components/image.svelte';

  // Provided by page endpoint.
  export let images: Images;
</script>

<Image
  alt="Brooklyn Bridge at dawn."
  src={images['brooklyn-bridge'].src}
  srcset={images['brooklyn-bridge'].srcset}
/>
