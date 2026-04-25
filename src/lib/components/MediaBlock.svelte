<script lang="ts">
	import type { MediaBlock } from '$lib/data';

	interface Props {
		block: MediaBlock;
	}

	let { block }: Props = $props();
</script>

<figure class="mb-10">
	{#if block.kind === 'video'}
		<div class="flex max-h-[75vh] items-center justify-center overflow-hidden rounded-lg bg-zinc-900">
			<video
				src={block.src}
				poster={block.poster}
				controls
				preload="metadata"
				class="max-h-[75vh] max-w-full"
			>
				<track kind="captions" />
			</video>
		</div>
	{:else if block.kind === 'image'}
		<div class="flex max-h-[75vh] items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
			<img
				src={block.src}
				alt={block.alt}
				class="max-h-[75vh] max-w-full object-contain"
				loading="lazy"
			/>
		</div>
	{:else if block.kind === 'gallery'}
		<div class="grid gap-3 sm:grid-cols-2">
			{#each block.images as image}
				<div
					class="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-zinc-100"
				>
					<img
						src={image.src}
						alt={image.alt}
						class="h-full w-full object-contain"
						loading="lazy"
					/>
				</div>
			{/each}
		</div>
	{/if}

	{#if block.caption}
		<figcaption class="mt-3 text-center text-sm text-ink-subtle">
			{block.caption}
		</figcaption>
	{/if}
</figure>
