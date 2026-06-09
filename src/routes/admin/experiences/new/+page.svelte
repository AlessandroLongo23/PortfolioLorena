<script lang="ts">
	import ExperienceForm from '$lib/components/admin/ExperienceForm.svelte';

	let { form } = $props();
</script>

<section class="space-y-8">
	<header class="flex items-baseline justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Nuova esperienza</h1>
			<p class="text-zinc-500">Crea una nuova esperienza per il portfolio.</p>
		</div>
		<a href="/admin/experiences" class="text-sm text-zinc-500 hover:text-zinc-900">← Torna alla lista</a>
	</header>

	<ExperienceForm errors={form?.errors ?? {}} submitLabel="Crea esperienza" />
</section>
