<script lang="ts">
	import CaseProjectForm from '$lib/components/admin/CaseProjectForm.svelte';

	let { form } = $props();
</script>

<section class="space-y-8">
	<header class="flex items-baseline justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Nuovo progetto</h1>
			<p class="text-zinc-500">Crea un nuovo case study.</p>
		</div>
		<a href="/admin/projects" class="text-sm text-zinc-500 hover:text-zinc-900">← Torna alla lista</a>
	</header>

	<CaseProjectForm errors={form?.errors ?? {}} submitLabel="Crea progetto" />
</section>
