<script lang="ts">
	interface Props {
		value?: string[];
		placeholder?: string;
	}

	let { value = $bindable([]), placeholder = 'Aggiungi un tag e premi Invio' }: Props = $props();

	let draft = $state('');

	function addTag() {
		const trimmed = draft.trim();
		if (trimmed && !value.includes(trimmed)) {
			value = [...value, trimmed];
		}
		draft = '';
	}

	function removeTag(tag: string) {
		value = value.filter((t) => t !== tag);
	}
</script>

<div class="flex flex-wrap gap-2 rounded-md border border-zinc-300 bg-white p-2 focus-within:border-zinc-900">
	{#each value as tag (tag)}
		<span class="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs">
			{tag}
			<button
				type="button"
				aria-label="Rimuovi {tag}"
				class="text-zinc-500 hover:text-zinc-900"
				onclick={() => removeTag(tag)}
			>
				×
			</button>
		</span>
	{/each}
	<input
		type="text"
		bind:value={draft}
		{placeholder}
		class="min-w-[8rem] flex-1 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ',') {
				e.preventDefault();
				addTag();
			} else if (e.key === 'Backspace' && draft === '' && value.length > 0) {
				value = value.slice(0, -1);
			}
		}}
		onblur={addTag}
	/>
</div>
