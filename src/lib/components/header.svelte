<script lang="ts">
	import { Logo } from '$lib/components';
	import navLinks from '$lib/nav-links';
</script>

<div
	data-component="Header"
	class="text-primary flex items-center justify-start gap-[clamp(.5rem,1vw,1rem)] py-6"
>
	<div class="w-[clamp(2rem,4vw,3rem)]"><Logo /></div>
	<div class="text-[clamp(1.5rem,6vw,2.5rem)] font-semibold">Thilo Maier</div>
	<nav class="flex flex-1 justify-end gap-[clamp(.5rem,1vw,1rem)]">
		{#each navLinks.slice(1) as link (link.title)}
			<a href={link.href} class="text-[clamp(1rem,4vw,1.5rem)] font-medium">
				{link.title}
			</a>
		{/each}
	</nav>
</div>
