<script lang="ts">
	import type { TimelineEvent } from '$lib/data';

	interface Props {
		events: TimelineEvent[];
	}

	let { events }: Props = $props();
</script>

<div class="relative">
	<!-- Vertical line -->
	<div
		class="absolute top-0 left-3 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2"
		aria-hidden="true"
	></div>

	<!-- Timeline events -->
	<div class="space-y-10">
		{#each events as event, index}
			<div
				class="relative pl-10 md:pl-0 {index % 2 === 0
					? 'md:pr-[calc(50%+1.5rem)] md:text-right'
					: 'md:pl-[calc(50%+1.5rem)]'}"
			>
				<!-- Year marker (mobile: left, desktop: center) -->
				<div
					class="absolute top-1.5 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white md:left-1/2 md:-translate-x-1/2"
				>
					<div class="h-2 w-2 rounded-full bg-ink"></div>
				</div>

				<!-- Content card -->
				<div
					class="rounded-lg border border-border bg-white p-5 transition-shadow hover:shadow-card"
				>
					<p
						class="mb-2 text-xs font-medium uppercase tracking-widest text-ink-subtle"
					>
						{event.year}
					</p>
					<h3 class="mb-2 text-base font-semibold tracking-tight text-ink">
						{event.title}
					</h3>
					<p class="text-sm text-ink-muted leading-relaxed">
						{event.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
