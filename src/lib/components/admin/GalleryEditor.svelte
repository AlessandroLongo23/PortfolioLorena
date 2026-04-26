<script lang="ts">
	import { untrack } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import FileDropzone from './FileDropzone.svelte';

	type GalleryImage = { id: string; src: string; alt: string };

	interface Props {
		value: { src: string; alt: string }[];
		folder: string;
		onchange?: (images: { src: string; alt: string }[]) => void;
	}

	let { value, folder, onchange }: Props = $props();

	// dnd needs stable IDs; items is owned by this component after mount.
	let items = $state<GalleryImage[]>(
		untrack(() => value.map((img) => ({ id: crypto.randomUUID(), ...img })))
	);

	function syncOut() {
		onchange?.(items.map(({ src, alt }) => ({ src, alt })));
	}

	const flipDurationMs = 150;

	function handleConsider(e: CustomEvent<{ items: GalleryImage[] }>) {
		items = e.detail.items;
	}
	function handleFinalize(e: CustomEvent<{ items: GalleryImage[] }>) {
		items = e.detail.items;
		syncOut();
	}

	function addImage() {
		items = [...items, { id: crypto.randomUUID(), src: '', alt: '' }];
	}
	function removeImage(id: string) {
		items = items.filter((i) => i.id !== id);
		syncOut();
	}
	function updateSrc(id: string, src: string | null) {
		items = items.map((i) => (i.id === id ? { ...i, src: src ?? '' } : i));
		syncOut();
	}
	function updateAlt(id: string, alt: string) {
		items = items.map((i) => (i.id === id ? { ...i, alt } : i));
		syncOut();
	}
</script>

<div class="space-y-3">
	<div use:dndzone={{ items, flipDurationMs }} onconsider={handleConsider} onfinalize={handleFinalize} class="space-y-2">
		{#each items as img (img.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
				<div class="cursor-grab pt-2 text-zinc-400 select-none" aria-label="Trascina">⋮⋮</div>
				<div class="flex-1 space-y-2">
					<FileDropzone
						value={img.src || null}
						folder={`${folder}/gallery`}
						accept="image/*"
						label="Carica immagine"
						onuploaded={(path) => updateSrc(img.id, path)}
						onclear={() => updateSrc(img.id, null)}
					/>
					<input
						type="text"
						value={img.alt}
						oninput={(e) => updateAlt(img.id, (e.currentTarget as HTMLInputElement).value)}
						placeholder="Testo alternativo"
						class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
					/>
				</div>
				<button
					type="button"
					onclick={() => removeImage(img.id)}
					class="text-xs font-medium text-red-600 hover:text-red-700"
				>
					Rimuovi
				</button>
			</div>
		{/each}
	</div>

	<button
		type="button"
		onclick={addImage}
		class="rounded-md border border-dashed border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
	>
		+ Aggiungi immagine alla galleria
	</button>
</div>
