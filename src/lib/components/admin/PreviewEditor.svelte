<script lang="ts">
	import FileDropzone from './FileDropzone.svelte';
	import type { Preview } from '$lib/schemas/media';

	interface Props {
		value: Preview | null;
		folder: string;
		errors?: Record<string, string[] | undefined>;
	}

	let { value = $bindable(null), folder, errors = {} }: Props = $props();

	let kind = $state<'image' | 'video'>(value?.kind ?? 'image');
	let imgSrc = $state<string | null>(value?.kind === 'image' ? value.src : null);
	let imgAlt = $state(value?.kind === 'image' ? value.alt : '');
	let vidSrc = $state<string | null>(value?.kind === 'video' ? value.src : null);
	let vidPoster = $state<string | null>(value?.kind === 'video' ? (value.poster ?? null) : null);

	$effect(() => {
		if (kind === 'image') {
			value = imgSrc ? { kind: 'image', src: imgSrc, alt: imgAlt } : null;
		} else {
			value = vidSrc
				? { kind: 'video', src: vidSrc, ...(vidPoster ? { poster: vidPoster } : {}) }
				: null;
		}
	});
</script>

<div class="space-y-4 rounded-xl border border-zinc-200 bg-white p-5">
	<div class="flex items-center gap-2">
		<span class="text-sm font-medium text-zinc-700">Tipo:</span>
		<div class="inline-flex rounded-md border border-zinc-200 bg-zinc-50 p-0.5 text-xs">
			<button
				type="button"
				onclick={() => (kind = 'image')}
				class="rounded px-3 py-1 transition-colors {kind === 'image'
					? 'bg-white font-medium text-zinc-900 shadow-sm'
					: 'text-zinc-500 hover:text-zinc-700'}"
			>
				Immagine
			</button>
			<button
				type="button"
				onclick={() => (kind = 'video')}
				class="rounded px-3 py-1 transition-colors {kind === 'video'
					? 'bg-white font-medium text-zinc-900 shadow-sm'
					: 'text-zinc-500 hover:text-zinc-700'}"
			>
				Video
			</button>
		</div>
	</div>

	{#if kind === 'image'}
		<div class="space-y-3">
			<FileDropzone bind:value={imgSrc} folder={`${folder}/preview`} accept="image/*" label="Carica immagine preview" />
			<div>
				<label for="preview-alt" class="mb-1 block text-sm font-medium text-zinc-700">Testo alternativo</label>
				<input
					id="preview-alt"
					type="text"
					bind:value={imgAlt}
					placeholder="Descrivi l’immagine per l’accessibilità"
					class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
				/>
			</div>
		</div>
	{:else}
		<div class="grid gap-4 md:grid-cols-2">
			<div>
				<p class="mb-1 text-sm font-medium text-zinc-700">Video</p>
				<FileDropzone bind:value={vidSrc} folder={`${folder}/preview`} accept="video/*" label="Carica video preview" />
			</div>
			<div>
				<p class="mb-1 text-sm font-medium text-zinc-700">Poster (opzionale)</p>
				<FileDropzone bind:value={vidPoster} folder={`${folder}/preview`} accept="image/*" label="Carica poster" />
			</div>
		</div>
	{/if}

	{#if errors.preview?.length}
		<p class="text-xs text-red-600">{errors.preview.join(' ')}</p>
	{/if}
</div>
