<script lang="ts">
	interface Props {
		value?: string;
		name?: string;
	}

	let { value = $bindable('#6366f1'), name }: Props = $props();
</script>

<div class="flex items-center gap-2">
	<input
		type="color"
		bind:value
		class="h-10 w-14 cursor-pointer rounded border border-zinc-300 bg-white p-1"
	/>
	<input
		type="text"
		bind:value
		{name}
		class="block w-32 rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-sm uppercase shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
	/>
</div>
