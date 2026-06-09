<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'phosphor-svelte';
	import { fly } from 'svelte/transition';
	import ExperienceHero from '$lib/components/ExperienceHero.svelte';
	import type { Experience } from '$lib/data';

	interface Props {
		experience: Experience;
		/** Set false (e.g. in the admin preview) to render instantly without entrance transitions. */
		animate?: boolean;
	}

	let { experience, animate = true }: Props = $props();

	const d = (ms: number) => (animate ? ms : 0);
</script>

<!-- Back Navigation -->
<div class="px-6 py-4">
	<div class="mx-auto max-w-4xl">
		<a
			href="/#experience"
			class="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
		>
			<ArrowLeft size={18} weight="bold" />
			Back to Experience
		</a>
	</div>
</div>

<!-- Project Header -->
<ExperienceHero {experience} {animate} />

<!-- STAR Method Content -->
{#if experience.star}
	<article class="px-6 py-20 md:py-28">
		<div class="mx-auto max-w-2xl">
			<!-- Situation -->
			<section class="mb-16" in:fly={{ y: 20, duration: d(500), delay: d(100) }}>
				<p class="mb-2 text-xs font-medium tracking-widest text-ink-subtle uppercase">
					01 — Context
				</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Situation</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{experience.star.situation}
				</p>
			</section>

			<div class="mb-16 h-px bg-border"></div>

			<!-- Task -->
			<section class="mb-16" in:fly={{ y: 20, duration: d(500), delay: d(200) }}>
				<p class="mb-2 text-xs font-medium tracking-widest text-ink-subtle uppercase">
					02 — Challenge
				</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Task</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{experience.star.task}
				</p>
			</section>

			<div class="mb-16 h-px bg-border"></div>

			<!-- Action -->
			<section class="mb-16" in:fly={{ y: 20, duration: d(500), delay: d(300) }}>
				<p class="mb-2 text-xs font-medium tracking-widest text-ink-subtle uppercase">
					03 — Approach
				</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Action</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{experience.star.action}
				</p>
			</section>

			<div class="mb-16 h-px bg-border"></div>

			<!-- Result -->
			<section in:fly={{ y: 20, duration: d(500), delay: d(400) }}>
				<p class="mb-2 text-xs font-medium tracking-widest text-ink-subtle uppercase">
					04 — Outcome
				</p>
				<h2 class="mb-5 text-xl font-semibold tracking-tight text-ink">The Result</h2>
				<p class="text-base leading-relaxed text-ink-muted">
					{experience.star.result}
				</p>
			</section>
		</div>
	</article>
{/if}

<!-- Navigation to Other Projects -->
<section class="px-6 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="flex items-center justify-between">
			<a
				href="/#experience"
				class="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
			>
				<ArrowLeft size={18} weight="bold" />
				All Experience
			</a>
			<a
				href="mailto:trapaneselorena01@gmail.com"
				class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
				style="background-color: {experience.brandColor}"
			>
				Discuss This Project
				<ArrowRight size={18} weight="bold" />
			</a>
		</div>
	</div>
</section>
