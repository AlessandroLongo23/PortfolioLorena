<script lang="ts">
	import { ArrowLeft, ArrowRight, Desktop, DeviceMobile } from 'phosphor-svelte';
	import { fly, fade } from 'svelte/transition';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	// Derived values for reactivity
	let project = $derived(data.project);
	let hasCoverImage = $derived(!!project.coverImage);
</script>

<svelte:head>
	<title>{project.title} | Lorena Trapanese</title>
	<meta name="description" content="{project.focus}." />
</svelte:head>

<!-- Back Navigation -->
<div class="px-6 py-4">
	<div class="mx-auto max-w-4xl">
		<a
			href="/#work"
			class="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
		>
			<ArrowLeft size={18} weight="bold" />
			Back to Work
		</a>
	</div>
</div>

<!-- Project Header -->
<header
	class="relative overflow-hidden px-6 py-24 md:py-32"
	in:fade={{ duration: 400 }}
>
	<!-- Background: Cover image or gradient -->
	{#if hasCoverImage}
		<div class="absolute inset-0">
			<img 
				src={project.coverImage} 
				alt="" 
				class="h-full w-full object-cover"
				aria-hidden="true"
			/>
			<!-- Dark overlay for text readability -->
			<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
		</div>
	{:else}
		<div class="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"></div>
	{/if}

	<div class="relative mx-auto max-w-3xl">
		<!-- Logo + Title Row -->
		<div 
			class="mb-8 flex items-center justify-center gap-5"
			in:fly={{ y: 15, duration: 500, delay: 100 }}
		>
			{#if project.logo}
				<img 
					src={project.logo} 
					alt="{project.title} logo" 
					class="h-14 w-14 object-contain md:h-16 md:w-16"
				/>
			{/if}
			<div class="text-left">
				<p class="mb-1 text-xs font-medium uppercase tracking-widest text-white/50">
					{project.role}
				</p>
				<h1 class="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
					{project.title}
				</h1>
			</div>
		</div>

		<!-- Focus -->
		<p
			class="mb-8 text-center text-lg text-white/70 md:text-xl"
			in:fly={{ y: 15, duration: 500, delay: 150 }}
		>
			{project.focus}
		</p>

		<!-- Meta Info -->
		<div
			class="flex flex-wrap items-center justify-center gap-4 text-sm"
			in:fly={{ y: 15, duration: 500, delay: 200 }}
		>
			<span class="text-white/50">{project.duration}</span>
			<span class="h-1 w-1 rounded-full bg-white/30"></span>
		</div>

		<!-- Tags -->
		<div
			class="mt-10 flex flex-wrap justify-center gap-2"
			in:fly={{ y: 15, duration: 500, delay: 250 }}
		>
			{#each project.tags as tag}
				<span
					class="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
				>
					{tag}
				</span>
			{/each}
		</div>
	</div>
</header>

<!-- STAR Method Content -->
{#if project.star}
	<article class="px-6 py-20 md:py-28">
		<div class="mx-auto max-w-2xl">
			<!-- Situation -->
			<section class="mb-16" in:fly={{ y: 20, duration: 500, delay: 100 }}>
				<p class="mb-2 text-xs font-medium uppercase tracking-widest text-ink-subtle">01 — Context</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Situation</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{project.star.situation}
				</p>
			</section>

			<div class="mb-16 h-px bg-border"></div>

			<!-- Task -->
			<section class="mb-16" in:fly={{ y: 20, duration: 500, delay: 200 }}>
				<p class="mb-2 text-xs font-medium uppercase tracking-widest text-ink-subtle">02 — Challenge</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Task</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{project.star.task}
				</p>
			</section>

			<div class="mb-16 h-px bg-border"></div>

			<!-- Action -->
			<section class="mb-16" in:fly={{ y: 20, duration: 500, delay: 300 }}>
				<p class="mb-2 text-xs font-medium uppercase tracking-widest text-ink-subtle">03 — Approach</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Action</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{project.star.action}
				</p>
			</section>

			<div class="mb-16 h-px bg-border"></div>

			<!-- Result -->
			<section in:fly={{ y: 20, duration: 500, delay: 400 }}>
				<p class="mb-2 text-xs font-medium uppercase tracking-widest text-ink-subtle">04 — Outcome</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Result</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{project.star.result}
				</p>
			</section>
		</div>
	</article>
{/if}

<!-- Visual Placeholders Section -->
<!-- <section class="border-t border-border bg-highlight px-6 py-20 md:py-28">
	<div class="mx-auto max-w-4xl">
		<p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-ink-subtle">Coming Soon</p>
		<h2 class="mb-12 text-center text-xl font-semibold tracking-tight text-ink">
			Project Visuals
		</h2>

		<div class="grid gap-6 md:grid-cols-2">
			<div
				class="flex flex-col items-center rounded-lg border border-border bg-white p-8"
			>
				<div
					class="mb-5 flex h-40 w-full items-center justify-center rounded-md bg-surface"
				>
					<Desktop size={48} weight="light" class="text-ink-subtle" />
				</div>
				<p class="text-sm text-ink-subtle">Desktop view</p>
			</div>

			<div
				class="flex flex-col items-center rounded-lg border border-border bg-white p-8"
			>
				<div
					class="mb-5 flex h-40 w-full items-center justify-center rounded-md bg-surface"
				>
					<DeviceMobile size={48} weight="light" class="text-ink-subtle" />
				</div>
				<p class="text-sm text-ink-subtle">Mobile view</p>
			</div>
		</div>

		<p class="mt-10 text-center text-sm text-ink-muted">
			Contact me for detailed case study materials and project documentation.
		</p>
	</div>
</section> -->

<!-- Navigation to Other Projects -->
<section class="px-6 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="flex items-center justify-between">
			<a
				href="/#work"
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
