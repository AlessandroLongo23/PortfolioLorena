<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';

	let { data, form } = $props();

	let pendingDelete = $state<{ id: string; title: string } | null>(null);
	let newEvent = $state({ year: '', title: '', description: '' });
</script>

<section class="space-y-8">
	<header class="flex items-baseline justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Timeline</h1>
			<p class="text-zinc-500">Eventi del percorso, mostrati nella pagina About.</p>
		</div>
		<a href="/admin" class="text-sm text-zinc-500 hover:text-zinc-900">← Dashboard</a>
	</header>

	<!-- Add new -->
	<form
		method="POST"
		action="?/create"
		use:enhance={() => async ({ update }) => {
			await update({ reset: true });
			newEvent = { year: '', title: '', description: '' };
		}}
		class="space-y-3 rounded-xl border border-zinc-200 bg-white p-4"
	>
		<h2 class="text-sm font-semibold text-zinc-700">Aggiungi evento</h2>
		<div class="grid gap-3 sm:grid-cols-[120px_1fr]">
			<input
				name="year"
				bind:value={newEvent.year}
				type="text"
				placeholder="Anno"
				required
				class="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
			<input
				name="title"
				bind:value={newEvent.title}
				type="text"
				placeholder="Titolo"
				required
				class="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</div>
		<textarea
			name="description"
			bind:value={newEvent.description}
			placeholder="Descrizione"
			rows="2"
			required
			class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
		></textarea>
		<input type="hidden" name="sort_order" value={data.events.length} />
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
	<div class="space-y-3">
		{#each data.events as event, i (event.id)}
			<form
				method="POST"
				use:enhance={() => async ({ update }) => {
					await update();
					await invalidateAll();
				}}
				class="space-y-3 rounded-xl border border-zinc-200 bg-white p-4"
			>
				<input type="hidden" name="id" value={event.id} />
				<input type="hidden" name="sort_order" value={i} />
				<div class="grid gap-3 sm:grid-cols-[120px_1fr_auto]">
					<input
						name="year"
						type="text"
						value={event.year}
						required
						class="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
					/>
					<input
						name="title"
						type="text"
						value={event.title}
						required
						class="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
					/>
					<div class="flex gap-2">
						<button
							type="submit"
							formaction="?/update"
							class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
						>
							Salva
						</button>
						<button
							type="button"
							onclick={() => (pendingDelete = { id: event.id, title: event.title })}
							class="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
						>
							Elimina
						</button>
					</div>
				</div>
				<textarea
					name="description"
					rows="2"
					required
					class="block w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none">{event.description}</textarea>
			</form>
		{/each}
		{#if data.events.length === 0}
			<p class="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
				Nessun evento. Aggiungine uno sopra.
			</p>
		{/if}
	</div>
</section>

<ConfirmDialog
	open={pendingDelete !== null}
	title="Elimina evento"
	message={pendingDelete ? `Vuoi davvero eliminare "${pendingDelete.title}"?` : ''}
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
