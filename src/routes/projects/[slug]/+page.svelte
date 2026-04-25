<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'phosphor-svelte';
	import { fly, fade } from 'svelte/transition';
	import MediaBlock from '$lib/components/MediaBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} | Lorena Trapanese</title>
	<meta name="description" content={project.description.slice(0, 160)} />
</svelte:head>

<!-- Back Navigation -->
<div class="px-6 py-4">
	<div class="mx-auto max-w-4xl">
		<a
			href="/#projects"
			class="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
		>
			<ArrowLeft size={18} weight="bold" />
			Back to Projects
		</a>
	</div>
</div>

<!-- Project Header -->
<header class="relative px-6 py-16 md:py-20" in:fade={{ duration: 400 }}>
	<div class="mx-auto max-w-3xl text-center">
		<p
			class="mb-3 text-xs font-medium tracking-widest text-ink-subtle uppercase"
			in:fly={{ y: 15, duration: 500, delay: 100 }}
		>
			{project.category}{#if project.year}
				&nbsp;·&nbsp;{project.year}{/if}
		</p>
		<h1
			class="mb-8 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl"
			in:fly={{ y: 15, duration: 500, delay: 150 }}
		>
			{project.title}
		</h1>

		<div class="flex flex-wrap justify-center gap-2" in:fly={{ y: 15, duration: 500, delay: 200 }}>
			{#each project.tags as tag}
				<span class="rounded-full bg-highlight px-3 py-1 text-xs font-medium text-ink-muted">
					{tag}
				</span>
			{/each}
		</div>
	</div>
</header>

<!-- Description -->
<section class="px-6 pb-12" in:fly={{ y: 20, duration: 500, delay: 250 }}>
	<div class="mx-auto max-w-2xl">
		<p class="text-base leading-relaxed text-ink-muted md:text-lg">
			{project.description}
		</p>
	</div>
</section>

<!-- Media Blocks -->
<section class="px-6 py-10" in:fade={{ duration: 400, delay: 300 }}>
	<div class="mx-auto max-w-3xl">
		{#each project.media as block}
			<MediaBlock {block} />
		{/each}
	</div>
</section>

<!-- Navigation to Other Projects -->
<section class="px-6 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="flex items-center justify-between">
			<a
				href="/#projects"
				class="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
			>
				<ArrowLeft size={18} weight="bold" />
				All Projects
			</a>
			<a
				href="mailto:trapaneselorena01@gmail.com"
				class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
				style="background-color: {project.brandColor}"
			>
				Discuss This Project
				<ArrowRight size={18} weight="bold" />
			</a>
		</div>
	</div>
</section>
