<script lang="ts">
	import { untrack } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import FileDropzone from './FileDropzone.svelte';
	import GalleryEditor from './GalleryEditor.svelte';
	import type { MediaBlockInput } from '$lib/schemas/media';

	type Block = MediaBlockInput & { id: string };

	interface Props {
		value: MediaBlockInput[];
		folder: string;
		onchange?: (blocks: MediaBlockInput[]) => void;
	}

	let { value, folder, onchange }: Props = $props();

	let items = $state<Block[]>(
		untrack(() => value.map((b) => ({ ...b, id: crypto.randomUUID() })))
	);

	function syncOut() {
		onchange?.(items.map(({ id: _id, ...rest }) => rest as MediaBlockInput));
	}

	const flipDurationMs = 200;

	function handleConsider(e: CustomEvent<{ items: Block[] }>) {
		items = e.detail.items;
	}
	function handleFinalize(e: CustomEvent<{ items: Block[] }>) {
		items = e.detail.items;
		syncOut();
	}

	function addBlock(kind: 'image' | 'video' | 'gallery') {
		const id = crypto.randomUUID();
		const base = { id, caption: '' };
		let block: Block;
		if (kind === 'image') block = { ...base, kind: 'image', src: '', alt: '' };
		else if (kind === 'video') block = { ...base, kind: 'video', src: '' };
		else block = { ...base, kind: 'gallery', images: [] };
		items = [...items, block];
		syncOut();
	}

	function removeBlock(id: string) {
		items = items.filter((b) => b.id !== id);
		syncOut();
	}

	function updateBlock(id: string, patch: Partial<Block>) {
		items = items.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b));
		syncOut();
	}

	function changeKind(id: string, newKind: 'image' | 'video' | 'gallery') {
		const current = items.find((b) => b.id === id);
		if (!current || current.kind === newKind) return;
		const caption = current.caption ?? '';
		let next: Block;
		if (newKind === 'image') next = { id, kind: 'image', src: '', alt: '', caption };
		else if (newKind === 'video') next = { id, kind: 'video', src: '', caption };
		else next = { id, kind: 'gallery', images: [], caption };
		items = items.map((b) => (b.id === id ? next : b));
		syncOut();
	}
</script>

<div class="space-y-4">
	{#if items.length > 0}
		<div use:dndzone={{ items, flipDurationMs }} onconsider={handleConsider} onfinalize={handleFinalize} class="space-y-3">
			{#each items as block (block.id)}
				<div animate:flip={{ duration: flipDurationMs }} class="rounded-xl border border-zinc-200 bg-white p-4">
					<div class="mb-3 flex items-start justify-between gap-3">
						<div class="flex items-center gap-3">
							<span class="cursor-grab text-zinc-400 select-none" aria-label="Trascina">⋮⋮</span>
							<div class="inline-flex rounded-md border border-zinc-200 bg-zinc-50 p-0.5 text-xs">
								{#each [{ k: 'image', l: 'Immagine' }, { k: 'video', l: 'Video' }, { k: 'gallery', l: 'Galleria' }] as opt (opt.k)}
									<button
										type="button"
										onclick={() => changeKind(block.id, opt.k as 'image' | 'video' | 'gallery')}
										class="rounded px-3 py-1 transition-colors {block.kind === opt.k
											? 'bg-white font-medium text-zinc-900 shadow-sm'
											: 'text-zinc-500 hover:text-zinc-700'}"
									>
										{opt.l}
									</button>
								{/each}
							</div>
						</div>
						<button
							type="button"
							onclick={() => removeBlock(block.id)}
							class="text-xs font-medium text-red-600 hover:text-red-700"
						>
							Rimuovi
						</button>
					</div>

					{#if block.kind === 'image'}
						<div class="space-y-2">
							<FileDropzone
								value={block.src || null}
								folder={`${folder}/media`}
								accept="image/*"
								label="Carica immagine"
								onuploaded={(path) => updateBlock(block.id, { src: path })}
								onclear={() => updateBlock(block.id, { src: '' })}
							/>
							<input
								type="text"
								value={block.alt}
								oninput={(e) => updateBlock(block.id, { alt: (e.currentTarget as HTMLInputElement).value })}
								placeholder="Testo alternativo"
								class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
							/>
						</div>
					{:else if block.kind === 'video'}
						<div class="grid gap-3 md:grid-cols-2">
							<div>
								<p class="mb-1 text-xs font-medium text-zinc-700">Video</p>
								<FileDropzone
									value={block.src || null}
									folder={`${folder}/media`}
									accept="video/*"
									label="Carica video"
									onuploaded={(path) => updateBlock(block.id, { src: path })}
									onclear={() => updateBlock(block.id, { src: '' })}
								/>
							</div>
							<div>
								<p class="mb-1 text-xs font-medium text-zinc-700">Poster (opzionale)</p>
								<FileDropzone
									value={block.poster || null}
									folder={`${folder}/media`}
									accept="image/*"
									label="Carica poster"
									onuploaded={(path) => updateBlock(block.id, { poster: path })}
									onclear={() => updateBlock(block.id, { poster: undefined })}
								/>
							</div>
						</div>
					{:else}
						<GalleryEditor
							value={block.images}
							folder={`${folder}/media`}
							onchange={(images) => updateBlock(block.id, { images })}
						/>
					{/if}

					<div class="mt-3">
						<input
							type="text"
							value={block.caption ?? ''}
							oninput={(e) => updateBlock(block.id, { caption: (e.currentTarget as HTMLInputElement).value })}
							placeholder="Didascalia (opzionale)"
							class="block w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
						/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-8 text-center text-sm text-zinc-500">
			Nessun blocco media. Aggiungi il primo qui sotto.
		</div>
	{/if}

	<div class="flex flex-wrap gap-2">
		<button
			type="button"
			onclick={() => addBlock('image')}
			class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
		>
			+ Immagine
		</button>
		<button
			type="button"
			onclick={() => addBlock('video')}
			class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
		>
			+ Video
		</button>
		<button
			type="button"
			onclick={() => addBlock('gallery')}
			class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
		>
			+ Galleria
		</button>
	</div>
</div>
