<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';

	let { data, form } = $props();

	const categories = [
		{ value: 'analytics', label: 'Analytics' },
		{ value: 'marketing', label: 'Marketing' },
		{ value: 'communication', label: 'Comunicazione' },
		{ value: 'technical', label: 'Tecnico' }
	];

	let newSkill = $state({ name: '', category: 'analytics' });
	let pendingDelete = $state<{ id: string; name: string } | null>(null);
</script>

<section class="space-y-8">
	<header class="flex items-baseline justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Competenze</h1>
			<p class="text-zinc-500">Gestisci le competenze visibili nella sezione Toolkit.</p>
		</div>
		<a href="/admin" class="text-sm text-zinc-500 hover:text-zinc-900">← Dashboard</a>
	</header>

	<!-- Add new -->
	<form
		method="POST"
		action="?/create"
		use:enhance={() => async ({ update }) => {
			await update({ reset: true });
			newSkill = { name: '', category: 'analytics' };
		}}
		class="flex flex-wrap items-end gap-3 rounded-xl border border-zinc-200 bg-white p-4"
	>
		<div class="flex-1 min-w-[200px]">
			<label for="new-name" class="mb-1 block text-xs font-medium text-zinc-700">Nome</label>
			<input
				id="new-name"
				name="name"
				bind:value={newSkill.name}
				type="text"
				required
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</div>
		<div>
			<label for="new-category" class="mb-1 block text-xs font-medium text-zinc-700">Categoria</label>
			<select
				id="new-category"
				name="category"
				bind:value={newSkill.category}
				class="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			>
				{#each categories as cat (cat.value)}
					<option value={cat.value}>{cat.label}</option>
				{/each}
			</select>
		</div>
		<input type="hidden" name="sort_order" value={data.skills.length} />
		<button
			type="submit"
			class="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
		>
			Aggiungi
		</button>
	</form>

	{#if form?.intent === 'create' && form?.errors}
		<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
			{Object.values(form.errors).flat().join(' ')}
		</p>
	{/if}

	<!-- List -->
	<div class="overflow-hidden rounded-xl border border-zinc-200 bg-white">
		<table class="w-full text-sm">
			<thead class="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
				<tr>
					<th class="px-4 py-3">Nome</th>
					<th class="px-4 py-3">Categoria</th>
					<th class="px-4 py-3 text-right">Azioni</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-zinc-100">
				{#each data.skills as skill, i (skill.id)}
					<tr>
						<td class="px-4 py-2" colspan="3">
							<form
								method="POST"
								class="flex flex-wrap items-center gap-3"
								use:enhance={() => async ({ update }) => {
									await update();
									await invalidateAll();
								}}
							>
								<input type="hidden" name="id" value={skill.id} />
								<input type="hidden" name="sort_order" value={i} />
								<input
									name="name"
									type="text"
									value={skill.name}
									required
									class="flex-1 min-w-[180px] rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-sm focus:border-zinc-900 focus:outline-none"
								/>
								<select
									name="category"
									value={skill.category}
									class="rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-sm focus:border-zinc-900 focus:outline-none"
								>
									{#each categories as cat (cat.value)}
										<option value={cat.value}>{cat.label}</option>
									{/each}
								</select>
								<button
									type="submit"
									formaction="?/update"
									class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
								>
									Salva
								</button>
								<button
									type="button"
									onclick={() => (pendingDelete = { id: skill.id, name: skill.name })}
									class="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
								>
									Elimina
								</button>
							</form>
						</td>
					</tr>
				{/each}
				{#if data.skills.length === 0}
					<tr>
						<td colspan="3" class="px-4 py-8 text-center text-sm text-zinc-500">
							Nessuna competenza. Aggiungine una sopra.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</section>

<ConfirmDialog
	open={pendingDelete !== null}
	title="Elimina competenza"
	message={pendingDelete ? `Vuoi davvero eliminare "${pendingDelete.name}"?` : ''}
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
