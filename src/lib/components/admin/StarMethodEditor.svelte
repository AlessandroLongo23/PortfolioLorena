<script lang="ts">
	interface Props {
		value: { situation: string; task: string; action: string; result: string } | null;
	}

	let { value = $bindable(null) }: Props = $props();

	let enabled = $state(value !== null);
	let model = $state(value ?? { situation: '', task: '', action: '', result: '' });

	$effect(() => {
		value = enabled ? { ...model } : null;
	});

	const fields: Array<{ key: 'situation' | 'task' | 'action' | 'result'; label: string; hint: string }> = [
		{ key: 'situation', label: 'Situazione', hint: 'Il contesto e la sfida iniziale.' },
		{ key: 'task', label: 'Compito', hint: 'Il tuo ruolo specifico e l’obiettivo.' },
		{ key: 'action', label: 'Azione', hint: 'Cosa hai fatto, in concreto.' },
		{ key: 'result', label: 'Risultato', hint: 'L’impatto misurabile o l’esito finale.' }
	];
</script>

<div class="space-y-4 rounded-xl border border-zinc-200 bg-white p-5">
	<label class="flex items-center gap-2 text-sm font-medium text-zinc-700">
		<input type="checkbox" bind:checked={enabled} class="h-4 w-4 rounded border-zinc-300" />
		Includi metodo STAR
	</label>

	{#if enabled}
		<div class="space-y-4">
			{#each fields as field (field.key)}
				<div class="space-y-1">
					<label for="star-{field.key}" class="block text-sm font-medium text-zinc-700">
						{field.label}
					</label>
					<textarea
						id="star-{field.key}"
						bind:value={model[field.key]}
						rows="3"
						class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
					></textarea>
					<p class="text-xs text-zinc-500">{field.hint}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
