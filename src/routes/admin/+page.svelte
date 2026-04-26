<script lang="ts">
	let { data } = $props();

	const cards = $derived([
		{ label: 'Esperienze', count: data.counts.experiences, href: '/admin/experiences' },
		{ label: 'Progetti', count: data.counts.projects, href: '/admin/projects' },
		{ label: 'Competenze', count: data.counts.skills, href: '/admin/skills' },
		{ label: 'Timeline', count: data.counts.timeline, href: '/admin/timeline' }
	]);
</script>

<section class="space-y-8">
	<header class="space-y-1">
		<h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
		<p class="text-zinc-500">Panoramica dei contenuti del portfolio.</p>
	</header>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each cards as card (card.href)}
			<a
				href={card.href}
				class="block rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
			>
				<p class="text-sm uppercase tracking-wide text-zinc-500">{card.label}</p>
				<p class="mt-2 text-4xl font-bold">{card.count}</p>
			</a>
		{/each}
	</div>
</section>
