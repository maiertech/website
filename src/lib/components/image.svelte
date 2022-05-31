<script lang="ts">
  type Loading = 'eager' | 'lazy';

  export let src: string;
  export let srcset: string;
  export let alt: string;
  export let ratio: number = 16 / 9;
  export let fit = 'cover';
  export let loading: Loading = 'eager';
</script>

<div>
  <img
    {...$$restProps}
    {alt}
    {src}
    {srcset}
    {loading}
    style:--ratio={ratio}
    style:--fit={fit}
  />
</div>

<style>
  div {
    background-color: var(--surface-2);
  }

  img {
    width: 100%;
    aspect-ratio: var(--ratio);
    object-fit: var(--fit);
  }
</style>
