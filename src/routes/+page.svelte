<script lang="ts">
	import { ArrowRight, DownloadSimple } from 'phosphor-svelte';
	import { fly, fade } from 'svelte/transition';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects, skills, getFieldExperience } from '$lib/data';

	const bentoProjects = projects.filter((p) => !p.isSummaryCard);
	const fieldExperience = getFieldExperience();

	// Category colors for skills - refined, monochromatic
	const categoryColors: Record<string, string> = {
		analytics: 'bg-zinc-100 text-zinc-700',
		marketing: 'bg-zinc-900 text-white',
		communication: 'bg-zinc-50 text-zinc-600 border border-zinc-200',
		technical: 'bg-accent/10 text-accent'
	};
</script>

<svelte:head>
	<title>Lorena Trapanese | Marketing Strategist</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative px-6 py-24 md:py-36">
	<div class="mx-auto max-w-3xl text-center">
		<p
			class="mb-6 text-sm font-medium uppercase tracking-widest text-ink-muted"
			in:fly={{ y: 20, duration: 600, delay: 100 }}
		>
			Marketing Strategist
		</p>

		<h1
			class="mb-8 text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
			in:fly={{ y: 20, duration: 600, delay: 150 }}
		>
			Turning data into growth through strategic marketing
		</h1>

		<p
			class="mx-auto mb-12 max-w-xl text-lg text-ink-muted"
			in:fly={{ y: 20, duration: 600, delay: 200 }}
		>
			From field marketing to digital strategy. Experience with TEDx, EdTech
			startups, and Italian heritage brands.
		</p>

		<div
			class="flex flex-col items-center justify-center gap-4 sm:flex-row"
			in:fly={{ y: 20, duration: 600, delay: 250 }}
		>
			<a
				href="#work"
				class="inline-flex items-center gap-2 rounded-full bg-midnight px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700"
			>
				View Case Studies
				<ArrowRight size={18} weight="bold" />
			</a>
			<a
				href="/resume-eng.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-highlight"
			>
				<DownloadSimple size={18} weight="bold" />
				Download CV
			</a>
		</div>
	</div>
</section>

<!-- Work / Bento Grid Section -->
<section id="work" class="scroll-mt-24 border-t border-border px-6 py-20 md:py-28">
	<div class="mx-auto max-w-5xl">
		<div class="mb-14 text-center" in:fade={{ duration: 400 }}>
			<p class="mb-3 text-xs font-medium uppercase tracking-widest text-ink-subtle">Portfolio</p>
			<h2 class="mb-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
				Selected Work
			</h2>
			<p class="mx-auto max-w-lg text-ink-muted">
				Projects spanning EdTech, events, startups, and luxury craftsmanship.
			</p>
		</div>

		<!-- Bento Grid -->
		<div
			class="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
			in:fade={{ duration: 400, delay: 100 }}
		>
			<!-- TEDx Cortina -->
			<ProjectCard project={bentoProjects[1]} size="large" />
			
			<!-- Unipiazza -->
			<ProjectCard project={bentoProjects[2]} size="medium" />
			
			<!-- Il Bronzetto -->
			<ProjectCard project={bentoProjects[3]} size="medium" />
			
			<!-- Sapiens -->
			<ProjectCard project={bentoProjects[0]} size="wide" />

			<!-- Field Experience -->
			{#if fieldExperience}
				<ProjectCard project={fieldExperience} size="medium" />
			{/if}
		</div>
	</div>
</section>

<!-- Skills Toolkit Section -->
<section class="border-t border-border px-6 py-20 md:py-28">
	<div class="mx-auto max-w-4xl">
		<div class="mb-14 text-center" in:fade={{ duration: 400 }}>
			<p class="mb-3 text-xs font-medium uppercase tracking-widest text-ink-subtle">Capabilities</p>
			<h2 class="mb-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
				Toolkit
			</h2>
			<p class="mx-auto max-w-lg text-ink-muted">
				Skills developed through academic study and hands-on experience.
			</p>
		</div>

		<!-- Skills Pills -->
		<div
			class="flex flex-wrap justify-center gap-2"
			in:fade={{ duration: 400, delay: 100 }}
		>
			{#each skills as skill}
				<span
					class="rounded-full px-4 py-2 text-sm font-medium {categoryColors[skill.category]}"
				>
					{skill.name}
				</span>
			{/each}
		</div>

		<!-- Legend -->
		<div class="mt-12 flex flex-wrap justify-center gap-6 text-xs text-ink-subtle">
			<div class="flex items-center gap-2">
				<span class="h-2.5 w-2.5 rounded-full bg-zinc-100 border border-zinc-200"></span>
				<span>Analytics</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="h-2.5 w-2.5 rounded-full bg-zinc-900"></span>
				<span>Marketing</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="h-2.5 w-2.5 rounded-full bg-zinc-50 border border-zinc-200"></span>
				<span>Communication</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="h-2.5 w-2.5 rounded-full bg-accent/20"></span>
				<span>Technical</span>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="px-6 py-20 md:py-28">
	<div class="mx-auto max-w-2xl text-center">
		<div
			class="rounded-xl bg-midnight p-10 md:p-14"
		>
			<h2 class="mb-4 text-xl font-semibold tracking-tight text-white md:text-2xl">
				Let's work together
			</h2>
			<p class="mb-8 text-sm text-zinc-400 md:text-base">
				Looking for a marketing strategist who combines analytical thinking with
				creative execution? Let's connect.
			</p>
			<a
				href="mailto:trapaneselorena01@gmail.com"
				class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-midnight transition-all hover:bg-zinc-100"
			>
				Get in Touch
				<ArrowRight size={18} weight="bold" />
			</a>
		</div>
	</div>
</section>
