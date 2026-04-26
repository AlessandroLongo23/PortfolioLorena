<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import FormField from './FormField.svelte';
	import TagInput from './TagInput.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import FileDropzone from './FileDropzone.svelte';
	import StarMethodEditor from './StarMethodEditor.svelte';
	import { toSlug } from '$lib/utils/slug';

	type ExperienceData = {
		id?: string;
		slug: string;
		title: string;
		role: string;
		duration: string;
		focus: string;
		tags: string[];
		visual_style: string;
		brand_color: string;
		logo_path: string | null;
		cover_image_path: string | null;
		is_summary_card: boolean;
		star: { situation: string; task: string; action: string; result: string } | null;
	};

	interface Props {
		experience?: Partial<ExperienceData>;
		errors?: Record<string, string[] | undefined>;
		action?: string;
		submitLabel?: string;
	}

	let { experience = {}, errors = {}, action = '', submitLabel = 'Salva' }: Props = $props();

	const visualStyles = [
		{ value: 'tech-gradient', label: 'Tech Gradient' },
		{ value: 'minimalist', label: 'Minimalist' },
		{ value: 'playful', label: 'Playful' },
		{ value: 'elegant', label: 'Elegant' },
		{ value: 'field', label: 'Field' }
	];

	let title = $state(untrack(() => experience.title ?? ''));
	let slug = $state(untrack(() => experience.slug ?? ''));
	let customSlug = $state(untrack(() => !!experience.slug));
	let role = $state(untrack(() => experience.role ?? ''));
	let duration = $state(untrack(() => experience.duration ?? ''));
	let focus = $state(untrack(() => experience.focus ?? ''));
	let tags = $state<string[]>(untrack(() => experience.tags ?? []));
	let visualStyle = $state(untrack(() => experience.visual_style ?? 'minimalist'));
	let brandColor = $state(untrack(() => experience.brand_color ?? '#6366f1'));
	let logoPath = $state(untrack(() => experience.logo_path ?? null));
	let coverPath = $state(untrack(() => experience.cover_image_path ?? null));
	let isSummaryCard = $state(untrack(() => experience.is_summary_card ?? false));
	let star = $state(untrack(() => experience.star ?? null));
	let submitting = $state(false);

	$effect(() => {
		if (!customSlug) slug = toSlug(title);
	});

	const folderBase = $derived(`experiences/${slug || 'new'}`);
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
	<input type="hidden" name="star" value={star ? JSON.stringify(star) : ''} />
	<input type="hidden" name="logo_path" value={logoPath ?? ''} />
	<input type="hidden" name="cover_image_path" value={coverPath ?? ''} />
	<input type="hidden" name="is_summary_card" value={String(isSummaryCard)} />

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

		<FormField label="Slug" name="slug" required errors={errors.slug} hint="L’URL pubblico, es. /experience/sapiens">
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
			{#if customSlug && experience.slug && slug !== experience.slug}
				<p class="text-xs text-amber-600">Cambiare lo slug rompe i link esistenti.</p>
			{/if}
		</FormField>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<FormField label="Ruolo" name="role" required errors={errors.role}>
			<input
				id="role"
				name="role"
				type="text"
				bind:value={role}
				required
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</FormField>

		<FormField label="Durata" name="duration" required errors={errors.duration} hint="Es. 2025 - Present">
			<input
				id="duration"
				name="duration"
				type="text"
				bind:value={duration}
				required
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</FormField>
	</div>

	<FormField label="Focus" name="focus" required errors={errors.focus}>
		<input
			id="focus"
			name="focus"
			type="text"
			bind:value={focus}
			required
			class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
		/>
	</FormField>

	<FormField label="Tags" errors={errors.tags}>
		<TagInput bind:value={tags} placeholder="EdTech, Product Marketing..." />
	</FormField>

	<div class="grid gap-6 md:grid-cols-2">
		<FormField label="Stile visivo" name="visual_style" required>
			<select
				id="visual_style"
				name="visual_style"
				bind:value={visualStyle}
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			>
				{#each visualStyles as style (style.value)}
					<option value={style.value}>{style.label}</option>
				{/each}
			</select>
		</FormField>

		<FormField label="Colore brand" required errors={errors.brand_color}>
			<ColorPicker bind:value={brandColor} name="brand_color" />
		</FormField>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<FormField label="Logo" hint="PNG/SVG trasparente, idealmente quadrato.">
			<FileDropzone bind:value={logoPath} folder={`${folderBase}/logo`} accept="image/*" label="Carica logo" />
		</FormField>

		<FormField label="Immagine di copertina" hint="JPG/PNG orizzontale, ottimale 16:9.">
			<FileDropzone bind:value={coverPath} folder={`${folderBase}/cover`} accept="image/*" label="Carica copertina" />
		</FormField>
	</div>

	<FormField label="Card riepilogativa">
		<label class="flex items-center gap-2 text-sm text-zinc-700">
			<input type="checkbox" bind:checked={isSummaryCard} class="h-4 w-4 rounded border-zinc-300" />
			Questa esperienza è solo un riepilogo (no pagina dettaglio, no STAR)
		</label>
	</FormField>

	{#if !isSummaryCard}
		<StarMethodEditor bind:value={star} />
	{/if}

	{#if errors._global}
		<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
			{errors._global.join(' ')}
		</p>
	{/if}

	<div class="flex justify-end gap-3 border-t border-zinc-200 pt-6">
		<a
			href="/admin/experiences"
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
