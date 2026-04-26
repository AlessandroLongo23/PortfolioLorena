<script lang="ts">
	import { ArrowUpRight } from 'phosphor-svelte';
	import type { CaseProject } from '$lib/data';
	import { resolveMediaUrl } from '$lib/supabase/storage';

	interface Props {
		project: CaseProject;
	}

	let { project }: Props = $props();
</script>

<a
	href="/projects/{project.slug}"
	class="project-preview group relative flex aspect-[4/3] flex-col overflow-hidden rounded-lg border border-border bg-zinc-900 transition-all duration-200 hover:shadow-card-hover"
	style="--brand-color: {project.brandColor}; --brand-color-light: {project.brandColor}30"
>
	<!-- Preview media -->
	<div class="absolute inset-0">
		{#if project.preview.kind === 'video'}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				src={resolveMediaUrl(project.preview.src)}
				poster={project.preview.poster ? resolveMediaUrl(project.preview.poster) : undefined}
				autoplay
				muted
				loop
				playsinline
				preload="metadata"
				class="h-full w-full object-cover"
			></video>
		{:else}
			<img
				src={resolveMediaUrl(project.preview.src)}
				alt={project.preview.alt}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				loading="lazy"
			/>
		{/if}

		<!-- Gradient overlay for text readability -->
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
	</div>

	<!-- Content overlay -->
	<div class="relative mt-auto p-6">
		<p class="mb-1 text-xs font-medium tracking-widest text-white/70 uppercase">
			{project.category}
		</p>
		<h3 class="preview-title text-xl font-semibold tracking-tight text-white md:text-2xl">
			{project.title}
		</h3>
	</div>

	<!-- Arrow badge -->
	<div
		class="preview-arrow absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-200 group-hover:opacity-100"
	>
		<ArrowUpRight size={16} weight="bold" />
	</div>
</a>

<style>
	.project-preview:hover {
		border-color: var(--brand-color-light);
	}
	.project-preview:hover .preview-arrow {
		background-color: var(--brand-color);
		color: white;
	}
</style>
