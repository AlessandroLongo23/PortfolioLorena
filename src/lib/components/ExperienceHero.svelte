<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { resolveMediaUrl } from '$lib/supabase/storage';
	import type { Experience } from '$lib/data';

	interface Props {
		experience: Pick<
			Experience,
			'title' | 'role' | 'focus' | 'duration' | 'tags' | 'logo' | 'coverImage'
		>;
		/** Set false (e.g. in the admin preview) to render instantly without entrance transitions. */
		animate?: boolean;
	}

	let { experience, animate = true }: Props = $props();

	let hasCoverImage = $derived(!!experience.coverImage);
	const d = (ms: number) => (animate ? ms : 0);
</script>

<header class="relative overflow-hidden px-6 py-24 md:py-32" in:fade={{ duration: d(400) }}>
	<!-- Background: Cover image or gradient -->
	{#if hasCoverImage}
		<div class="absolute inset-0">
			<img
				src={resolveMediaUrl(experience.coverImage)}
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
		<div class="mb-8 flex items-center justify-center gap-5" in:fly={{ y: 15, duration: d(500), delay: d(100) }}>
			{#if experience.logo}
				<img
					src={resolveMediaUrl(experience.logo)}
					alt="{experience.title} logo"
					class="h-14 w-14 object-contain md:h-16 md:w-16"
				/>
			{/if}
			<div class="text-left">
				<p class="mb-1 text-xs font-medium tracking-widest text-white/50 uppercase">
					{experience.role}
				</p>
				<h1 class="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
					{experience.title}
				</h1>
			</div>
		</div>

		<!-- Focus -->
		<p class="mb-8 text-center text-lg text-white/70 md:text-xl" in:fly={{ y: 15, duration: d(500), delay: d(150) }}>
			{experience.focus}
		</p>

		<!-- Meta Info -->
		<div class="flex flex-wrap items-center justify-center gap-4 text-sm" in:fly={{ y: 15, duration: d(500), delay: d(200) }}>
			<span class="text-white/50">{experience.duration}</span>
			<span class="h-1 w-1 rounded-full bg-white/30"></span>
		</div>

		<!-- Tags -->
		<div class="mt-10 flex flex-wrap justify-center gap-2" in:fly={{ y: 15, duration: d(500), delay: d(250) }}>
			{#each experience.tags as tag}
				<span
					class="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
				>
					{tag}
				</span>
			{/each}
		</div>
	</div>
</header>
