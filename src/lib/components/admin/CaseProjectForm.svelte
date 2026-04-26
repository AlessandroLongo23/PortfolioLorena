<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import FormField from './FormField.svelte';
	import TagInput from './TagInput.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import PreviewEditor from './PreviewEditor.svelte';
	import MediaBlockEditor from './MediaBlockEditor.svelte';
	import { toSlug } from '$lib/utils/slug';
	import type { Preview, MediaBlockInput } from '$lib/schemas/media';

	type ProjectData = {
		id?: string;
		slug: string;
		title: string;
		category: string;
		year: string | null;
		tags: string[];
		brand_color: string;
		description: string;
		preview: Preview | null;
		media: MediaBlockInput[];
	};

	interface Props {
		project?: Partial<ProjectData>;
		errors?: Record<string, string[] | undefined>;
		action?: string;
		submitLabel?: string;
	}

	let { project = {}, errors = {}, action = '', submitLabel = 'Salva' }: Props = $props();

	let title = $state(untrack(() => project.title ?? ''));
	let slug = $state(untrack(() => project.slug ?? ''));
	let customSlug = $state(untrack(() => !!project.slug));
	let category = $state(untrack(() => project.category ?? ''));
	let year = $state(untrack(() => project.year ?? ''));
	let tags = $state<string[]>(untrack(() => project.tags ?? []));
	let brandColor = $state(untrack(() => project.brand_color ?? '#6366f1'));
	let description = $state(untrack(() => project.description ?? ''));
	let preview = $state<Preview | null>(untrack(() => project.preview ?? null));
	let media = $state<MediaBlockInput[]>(untrack(() => project.media ?? []));
	let submitting = $state(false);

	$effect(() => {
		if (!customSlug) slug = toSlug(title);
	});

	const folderBase = $derived(`projects/${slug || 'new'}`);
</script>

<form
	method="POST"
	{action}
	class="space-y-6"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}}
>
	<input type="hidden" name="tags" value={JSON.stringify(tags)} />
	<input type="hidden" name="preview" value={preview ? JSON.stringify(preview) : ''} />
	<input type="hidden" name="media" value={JSON.stringify(media)} />

	<div class="grid gap-6 md:grid-cols-2">
		<FormField label="Titolo" name="title" required errors={errors.title}>
			<input
				id="title"
				name="title"
				type="text"
				bind:value={title}
				required
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</FormField>

		<FormField label="Slug" name="slug" required errors={errors.slug} hint="L’URL pubblico, es. /projects/sapiens-ad">
			<div class="flex items-center gap-2">
				<input
					id="slug"
					name="slug"
					type="text"
					bind:value={slug}
					required
					disabled={!customSlug}
					class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
				/>
				<label class="flex items-center gap-1 whitespace-nowrap text-xs text-zinc-600">
					<input type="checkbox" bind:checked={customSlug} class="h-3.5 w-3.5 rounded border-zinc-300" />
					Personalizza
				</label>
			</div>
			{#if customSlug && project.slug && slug !== project.slug}
				<p class="text-xs text-amber-600">Cambiare lo slug rompe i link esistenti.</p>
			{/if}
		</FormField>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<FormField label="Categoria" name="category" required errors={errors.category}>
			<input
				id="category"
				name="category"
				type="text"
				bind:value={category}
				required
				placeholder="es. Brand campaign"
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</FormField>

		<FormField label="Anno" name="year" errors={errors.year} hint="Opzionale, es. 2024">
			<input
				id="year"
				name="year"
				type="text"
				bind:value={year}
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</FormField>
	</div>

	<FormField label="Tags" errors={errors.tags}>
		<TagInput bind:value={tags} placeholder="Brand, Video, Storytelling..." />
	</FormField>

	<FormField label="Colore brand" required errors={errors.brand_color}>
		<ColorPicker bind:value={brandColor} name="brand_color" />
	</FormField>

	<FormField label="Descrizione" name="description" required errors={errors.description}>
		<textarea
			id="description"
			name="description"
			bind:value={description}
			rows="4"
			required
			class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
		></textarea>
	</FormField>

	<FormField label="Preview" hint="Mostrata come anteprima nella lista progetti.">
		<PreviewEditor bind:value={preview} folder={folderBase} {errors} />
	</FormField>

	<FormField label="Blocchi media" hint="Contenuti mostrati nella pagina di dettaglio del progetto.">
		<MediaBlockEditor value={media} folder={folderBase} onchange={(blocks) => (media = blocks)} />
	</FormField>

	{#if errors._global}
		<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
			{errors._global.join(' ')}
		</p>
	{/if}

	<div class="flex justify-end gap-3 border-t border-zinc-200 pt-6">
		<a
			href="/admin/projects"
			class="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
		>
			Annulla
		</a>
		<button
			type="submit"
			disabled={submitting}
			class="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
		>
			{submitting ? 'Salvataggio...' : submitLabel}
		</button>
	</div>
</form>
