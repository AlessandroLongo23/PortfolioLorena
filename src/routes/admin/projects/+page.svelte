<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';

	let { data } = $props();

	let items: typeof data.projects = $state([]);
	let pendingDelete = $state<{ id: string; title: string } | null>(null);

	$effect(() => {
		items = data.projects;
	});

	const flipDurationMs = 200;

	function handleConsider(e: CustomEvent<{ items: typeof items }>) {
		items = e.detail.items;
	}

	async function handleFinalize(e: CustomEvent<{ items: typeof items }>) {
		items = e.detail.items;
		const fd = new FormData();
		fd.append('order', JSON.stringify(items.map((i) => i.id)));
		await fetch('?/reorder', { method: 'POST', body: fd });
	}
</script>

<section class="space-y-8">
	<header class="flex items-baseline justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Progetti</h1>
			<p class="text-zinc-500">Trascina le righe per riordinare. L’ordine determina la visualizzazione pubblica.</p>
		</div>
		<a
			href="/admin/projects/new"
			class="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
		>
			+ Nuovo progetto
		</a>
	</header>

	<div class="overflow-hidden rounded-xl border border-zinc-200 bg-white">
		<table class="w-full text-sm">
			<thead class="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
				<tr>
					<th class="w-8 px-4 py-3"></th>
					<th class="px-4 py-3">Titolo</th>
					<th class="px-4 py-3">Categoria</th>
					<th class="px-4 py-3">Anno</th>
					<th class="px-4 py-3">Slug</th>
					<th class="px-4 py-3 text-right">Azioni</th>
				</tr>
			</thead>
			<tbody
				use:dndzone={{ items, flipDurationMs, dropTargetStyle: {} }}
				onconsider={handleConsider}
				onfinalize={handleFinalize}
				class="divide-y divide-zinc-100"
			>
				{#each items as project (project.id)}
					<tr animate:flip={{ duration: flipDurationMs }} class="bg-white">
						<td class="cursor-grab px-4 py-3 text-zinc-400 select-none" aria-label="Trascina per riordinare">⋮⋮</td>
						<td class="px-4 py-3 font-medium text-zinc-900">{project.title}</td>
						<td class="px-4 py-3 text-zinc-600">{project.category}</td>
						<td class="px-4 py-3 text-zinc-600">{project.year ?? '—'}</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-500">{project.slug}</td>
						<td class="px-4 py-3 text-right whitespace-nowrap">
							<a
								href="/admin/projects/{project.id}/edit"
								class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
							>
								Modifica
							</a>
							<button
								type="button"
								onclick={() => (pendingDelete = { id: project.id, title: project.title })}
								class="ml-2 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
							>
								Elimina
							</button>
						</td>
					</tr>
				{/each}
				{#if items.length === 0}
					<tr>
						<td colspan="6" class="px-4 py-12 text-center text-sm text-zinc-500">
							Nessun progetto. <a href="/admin/projects/new" class="text-zinc-900 underline">Aggiungine uno</a>.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</section>

<ConfirmDialog
	open={pendingDelete !== null}
	title="Elimina progetto"
	message={pendingDelete ? `Vuoi davvero eliminare "${pendingDelete.title}"? Questa azione non può essere annullata.` : ''}
	confirmLabel="Elimina"
	danger
	onconfirm={async () => {
		if (!pendingDelete) return;
		const fd = new FormData();
		fd.append('id', pendingDelete.id);
		await fetch('?/delete', { method: 'POST', body: fd });
		pendingDelete = null;
		await invalidateAll();
	}}
	oncancel={() => (pendingDelete = null)}
/>
