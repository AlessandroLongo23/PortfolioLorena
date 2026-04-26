<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import CaseProjectForm from '$lib/components/admin/CaseProjectForm.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';

	let { data, form } = $props();

	let pendingDelete = $state(false);
</script>

<section class="space-y-8">
	<header class="flex items-baseline justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Modifica progetto</h1>
			<p class="text-zinc-500">Aggiorna i dettagli di questo progetto.</p>
		</div>
		<a href="/admin/projects" class="text-sm text-zinc-500 hover:text-zinc-900">← Torna alla lista</a>
	</header>

	<CaseProjectForm
		project={data.project}
		errors={form?.errors ?? {}}
		action="?/update"
		submitLabel="Aggiorna"
	/>

	<div class="border-t border-zinc-200 pt-6">
		<button
			type="button"
			onclick={() => (pendingDelete = true)}
			class="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
		>
			Elimina questo progetto
		</button>
	</div>
</section>

<ConfirmDialog
	open={pendingDelete}
	title="Elimina progetto"
	message={`Vuoi davvero eliminare "${data.project.title}"? Questa azione non può essere annullata.`}
	confirmLabel="Elimina"
	danger
	onconfirm={async () => {
		const fd = new FormData();
		await fetch('?/delete', { method: 'POST', body: fd });
		pendingDelete = false;
		await invalidateAll();
		window.location.href = '/admin/projects';
	}}
	oncancel={() => (pendingDelete = false)}
/>
