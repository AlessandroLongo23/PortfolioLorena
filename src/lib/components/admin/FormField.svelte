<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		name?: string;
		hint?: string;
		errors?: string[] | undefined;
		required?: boolean;
		children: Snippet;
	}

	let { label, name, hint, errors, required = false, children }: Props = $props();
</script>

<div class="space-y-1.5">
	<label for={name} class="block text-sm font-medium text-zinc-700">
		{label}{#if required}<span class="ml-0.5 text-red-600">*</span>{/if}
	</label>
	{@render children()}
	{#if hint && !errors?.length}
		<p class="text-xs text-zinc-500">{hint}</p>
	{/if}
	{#if errors?.length}
		<ul class="text-xs text-red-600">
			{#each errors as err, i (i)}
				<li>{err}</li>
			{/each}
		</ul>
	{/if}
</div>
