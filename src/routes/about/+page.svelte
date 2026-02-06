<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import { fly, fade } from 'svelte/transition';
	import Timeline from '$lib/components/Timeline.svelte';
	import { timeline } from '$lib/data';
</script>

<svelte:head>
	<title>About | Lorena Trapanese</title>
	<meta
		name="description"
		content="Learn about my journey from field marketing to digital strategy, and the experiences that shaped my approach to data-driven growth."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="px-6 py-20 md:py-28">
	<div class="mx-auto max-w-3xl">
		<div class="grid gap-12 md:grid-cols-5 md:items-start">
			<!-- Photo Placeholder -->
			<div class="md:col-span-2" in:fade={{ duration: 400, delay: 100 }}>
				<div
					class="aspect-[4/5] overflow-hidden rounded-lg bg-zinc-100"
				>
					<div
						class="flex h-full w-full items-center justify-center text-ink-subtle"
					>
						<span class="text-xs">Photo</span>
					</div>
				</div>
			</div>

			<!-- Intro Text -->
			<div class="md:col-span-3" in:fly={{ x: 20, duration: 500, delay: 200 }}>
				<p class="mb-3 text-xs font-medium uppercase tracking-widest text-ink-subtle">About</p>
				<h1
					class="mb-6 text-2xl font-semibold tracking-tight text-ink md:text-3xl"
				>
					Hi, I'm Lorena.
				</h1>

				<div class="space-y-4 text-sm text-ink-muted leading-relaxed">
					<p>
						I'm a marketing strategist with a passion for turning complex data
						into actionable growth strategies. My journey into marketing wasn't
						conventional—it started in the field, quite literally.
					</p>

					<p>
						Before diving into digital strategy and EdTech startups, I spent
						years working as a hostess, promoter, and sales representative.
						These experiences taught me something no textbook could: how to read
						people, adapt on the fly, and find solutions under pressure.
					</p>

					<p>
						Even my time as a babysitter contributed to who I am today—it was my first training ground for
						negotiation tactics and the kind of patience that only comes from
						convincing a five-year-old that bedtime is actually a good idea.
					</p>

					<p>
						Now, I combine that hands-on experience with academic knowledge in
						marketing and communication. I believe the best strategies come from
						understanding people first and data second—but making sure the data
						backs up every intuition.
					</p>
				</div>

				<!-- Quick Stats -->
				<div class="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
					<div>
						<p class="text-xl font-semibold text-ink">4+</p>
						<p class="text-xs text-ink-subtle">Years Experience</p>
					</div>
					<div>
						<p class="text-xl font-semibold text-ink">5</p>
						<p class="text-xs text-ink-subtle">Major Projects</p>
					</div>
					<div>
						<p class="text-xl font-semibold text-ink">3</p>
						<p class="text-xs text-ink-subtle">Industries</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Values Section -->
<section class="border-t border-border bg-highlight px-6 py-20 md:py-28">
	<div class="mx-auto max-w-3xl">
		<p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-ink-subtle">Principles</p>
		<h2
			class="mb-14 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl"
			in:fade={{ duration: 400 }}
		>
			What I Believe In
		</h2>

		<div
			class="grid gap-10 md:grid-cols-3"
			in:fly={{ y: 20, duration: 500, delay: 100 }}
		>
			<div>
				<p class="mb-3 text-xs font-medium uppercase tracking-widest text-ink-subtle">01</p>
				<h3 class="mb-3 text-base font-semibold text-ink">Data-Informed Intuition</h3>
				<p class="text-sm text-ink-muted leading-relaxed">
					Numbers tell stories. I believe in letting data guide decisions while
					trusting the human insights that give context to every metric.
				</p>
			</div>

			<div>
				<p class="mb-3 text-xs font-medium uppercase tracking-widest text-ink-subtle">02</p>
				<h3 class="mb-3 text-base font-semibold text-ink">People-First Strategy</h3>
				<p class="text-sm text-ink-muted leading-relaxed">
					Behind every customer segment is a real person. Understanding their
					needs, fears, and aspirations is where great marketing begins.
				</p>
			</div>

			<div>
				<p class="mb-3 text-xs font-medium uppercase tracking-widest text-ink-subtle">03</p>
				<h3 class="mb-3 text-base font-semibold text-ink">Continuous Growth</h3>
				<p class="text-sm text-ink-muted leading-relaxed">
					The marketing landscape evolves daily. I'm committed to learning,
					experimenting, and staying curious about what's next.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Timeline Section -->
<section class="border-t border-border px-6 py-20 md:py-28">
	<div class="mx-auto max-w-3xl">
		<p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-ink-subtle">Timeline</p>
		<h2
			class="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl"
			in:fade={{ duration: 400 }}
		>
			My Journey
		</h2>
		<p
			class="mx-auto mb-14 max-w-md text-center text-sm text-ink-muted"
			in:fade={{ duration: 400, delay: 100 }}
		>
			From first jobs to founding a startup—every step shaped how I approach
			marketing today.
		</p>

		<div in:fly={{ y: 20, duration: 500, delay: 200 }}>
			<Timeline events={timeline} />
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="px-6 py-20 md:py-28">
	<div class="mx-auto max-w-2xl text-center">
		<div
			class="rounded-xl border border-border bg-white p-10 md:p-14"
		>
			<h2 class="mb-4 text-xl font-semibold tracking-tight text-ink md:text-2xl">
				Let's Connect
			</h2>
			<p class="mb-8 text-sm text-ink-muted">
				Whether you have a project in mind, want to discuss marketing strategy,
				or just want to say hello—I'd love to hear from you.
			</p>
			<div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="mailto:trapaneselorena01@gmail.com"
					class="inline-flex items-center gap-2 rounded-full bg-midnight px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700"
				>
					Send an Email
					<ArrowRight size={18} weight="bold" />
				</a>
				<a
					href="https://www.linkedin.com/in/lorena-trapanese-0698682b0/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-highlight"
				>
					Connect on LinkedIn
				</a>
			</div>
		</div>
	</div>
</section>
