<script lang="ts">
	import { supabase } from '$lib/supabase/client';
	import { MEDIA_BUCKET, generateStoragePath, resolveMediaUrl } from '$lib/supabase/storage';

	interface Props {
		folder: string;
		accept?: string;
		value?: string | null;
		label?: string;
		onuploaded?: (path: string) => void;
		onclear?: () => void;
	}

	let {
		folder,
		accept = 'image/*,video/*',
		value = $bindable(null),
		label = 'Trascina o seleziona un file',
		onuploaded,
		onclear
	}: Props = $props();

	let inputEl: HTMLInputElement;
	let dragging = $state(false);
	let uploading = $state(false);
	let progress = $state(0);
	let error = $state<string | null>(null);

	const previewUrl = $derived(value ? resolveMediaUrl(value) : '');
	const isVideo = $derived(value ? /\.(mp4|webm|mov)$/i.test(value) : false);

	async function upload(file: File) {
		error = null;
		uploading = true;
		progress = 0;
		try {
			const path = generateStoragePath(folder, file.name);
			const { error: uploadError } = await supabase.storage
				.from(MEDIA_BUCKET)
				.upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });

			if (uploadError) {
				error = uploadError.message;
				return;
			}
			value = path;
			progress = 100;
			onuploaded?.(path);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore sconosciuto durante l’upload.';
		} finally {
			uploading = false;
		}
	}

	function handleFiles(files: FileList | null) {
		const file = files?.[0];
		if (file) upload(file);
	}

	function handleClear() {
		value = null;
		error = null;
		if (inputEl) inputEl.value = '';
		onclear?.();
	}
</script>

<div class="space-y-2">
	{#if value}
		<div class="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3">
			<div class="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-100">
				{#if isVideo}
					<!-- svelte-ignore a11y_media_has_caption -->
					<video src={previewUrl} class="h-full w-full object-cover" muted></video>
				{:else}
					<img src={previewUrl} alt="" class="h-full w-full object-cover" />
				{/if}
			</div>
			<div class="flex-1 space-y-1 overflow-hidden">
				<p class="truncate text-xs text-zinc-500">{value}</p>
				<button
					type="button"
					onclick={handleClear}
					class="text-xs font-medium text-red-600 hover:text-red-700"
				>
					Rimuovi
				</button>
			</div>
		</div>
	{:else}
		<button
			type="button"
			onclick={() => inputEl.click()}
			ondragover={(e) => {
				e.preventDefault();
				dragging = true;
			}}
			ondragleave={() => (dragging = false)}
			ondrop={(e) => {
				e.preventDefault();
				dragging = false;
				handleFiles(e.dataTransfer?.files ?? null);
			}}
			class="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-sm transition-colors {dragging
				? 'border-zinc-900 bg-zinc-100'
				: 'border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-50'}"
		>
			{#if uploading}
				<span class="text-zinc-500">Caricamento... {progress}%</span>
			{:else}
				<span class="text-zinc-700">{label}</span>
				<span class="text-xs text-zinc-400">Click o drag &amp; drop</span>
			{/if}
		</button>
	{/if}

	<input
		bind:this={inputEl}
		type="file"
		{accept}
		class="hidden"
		onchange={(e) => handleFiles((e.currentTarget as HTMLInputElement).files)}
	/>

	{#if error}
		<p class="text-xs text-red-600">{error}</p>
	{/if}
</div>
