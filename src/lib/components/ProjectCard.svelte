<script lang="ts">
	import { ArrowUpRight } from 'phosphor-svelte';
	import type { Project } from '$lib/data';

	interface Props {
		project: Project;
		size?: 'large' | 'medium' | 'wide';
	}

	let { project, size = 'medium' }: Props = $props();

	// Size classes for the card
	const sizeClasses: Record<string, string> = {
		large: 'md:col-span-2 md:row-span-2',
		medium: 'md:col-span-1 md:row-span-1',
		wide: 'md:col-span-2 md:row-span-1'
	};

	// Derived values for reactivity
	let isLinked = $derived(!project.isSummaryCard);
	let showCoverImage = $derived(size === 'large' && !!project.coverImage);
</script>

{#if isLinked}
	<a
		href="/work/{project.slug}"
		class="project-card group relative flex overflow-hidden rounded-lg border border-border bg-white p-6 transition-all duration-200 hover:shadow-card-hover {sizeClasses[size]}"
		style="--brand-color: {project.brandColor}; --brand-color-light: {project.brandColor}30"
	>
		<!-- Content -->
		<div class="flex flex-1 flex-col min-w-0">
			<!-- Role -->
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-ink-subtle">
				{project.role}
			</p>

			<div class="flex flex-1 flex-row min-w-0">
				<!-- Logo on the left -->
				{#if project.logo}
					<div class="mr-5 flex flex-shrink-0 items-start pt-1">
						<img 
							src={project.logo} 
							alt="{project.title} logo" 
							class="h-10 w-10 object-contain opacity-60 transition-opacity group-hover:opacity-100 {size === 'large' ? 'md:h-14 md:w-14' : ''}"
						/>
					</div>
				{/if}

				<!-- Title -->
				<div class="flex flex-1 flex-col min-w-0">
					<h3
						class="project-title mb-2 text-lg font-semibold tracking-tight text-ink transition-colors md:text-xl {size === 'large' ? 'md:text-2xl' : ''}"
					>
						{project.title}
					</h3>

					<!-- Focus Description -->
					<p class="mb-5 text-sm text-ink-muted leading-relaxed">
						{project.focus}
					</p>
				</div>
			</div>


			<!-- Cover Image for large cards -->
			{#if showCoverImage}
				<div class="relative my-5 aspect-[16/9] overflow-hidden rounded-md bg-zinc-100">
					<img 
						src={project.coverImage} 
						alt="{project.title} preview" 
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>
			{/if}

			<!-- Tags -->
			<div class="mt-auto flex flex-wrap gap-1.5">
				{#each project.tags.slice(0, 4) as tag}
					<span
						class="rounded-full bg-highlight px-2.5 py-1 text-xs text-ink-muted"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>

		<!-- Arrow Icon -->
		<div
			class="project-arrow absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full bg-highlight text-ink-muted opacity-0 transition-all duration-200 group-hover:opacity-100"
		>
			<ArrowUpRight size={16} weight="bold" />
		</div>
	</a>
{:else}
	<!-- Summary Card (Field Experience) - Not linked -->
	<div
		class="relative flex flex-col overflow-hidden rounded-lg border border-border bg-zinc-50 p-6 {sizeClasses[size]}"
	>
		<div class="flex flex-1 flex-col">
			<!-- Role Badge -->
			<p
				class="mb-4 text-xs font-medium uppercase tracking-wide text-ink-subtle"
			>
				{project.role}
			</p>

			<!-- Title -->
			<h3 class="mb-2 text-lg font-semibold tracking-tight text-ink md:text-xl">
				{project.title}
			</h3>

			<!-- Focus Description -->
			<p class="mb-5 text-sm text-ink-muted leading-relaxed">
				{project.focus}
			</p>

			<!-- Tags -->
			<div class="mt-auto flex flex-wrap gap-1.5">
				{#each project.tags as tag}
					<span
						class="rounded-full bg-highlight px-2.5 py-1 text-xs text-ink-muted"
					>
						{tag}
					</span>
				{/each}
			</div>

			<!-- Duration -->
			<div class="mt-5 border-t border-border pt-5">
				<p class="text-sm text-ink-subtle">
					{project.duration}
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Brand color hover effects */
	.project-card:hover {
		border-color: var(--brand-color-light);
	}

	.project-card:hover .project-title {
		color: var(--brand-color);
	}

	.project-card .project-impact {
		color: var(--brand-color);
	}

	.project-card:hover .project-arrow {
		background-color: var(--brand-color-light);
		color: var(--brand-color);
	}
</style>
