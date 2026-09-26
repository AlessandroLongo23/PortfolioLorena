<script lang="ts">
	import { page } from '$app/state';
	import { getContent, localeFromPath, localize } from '$lib/content';

	// Layout data may be missing on an error, so read the locale from the URL.
	const locale = $derived(localeFromPath(page.url.pathname));
	const e = $derived(getContent(locale).ui.error);
</script>

<svelte:head><title>{page.status} · Lorena Trapanese</title></svelte:head>

<section class="wrap err">
	<p class="slug">{e.label} {page.status}</p>
	{#if page.status === 404}
		<h1 class="display">{e.notFound}</h1>
		<p>{e.notFoundText}</p>
	{:else}
		<h1 class="display">{e.other}</h1>
		<p>{e.otherText}</p>
	{/if}
	<a class="btn" href={localize('/', locale)}>{e.back} <span class="arrow" aria-hidden="true">→</span></a>
</section>

<style>
	.err {
		display: grid;
		gap: 20px;
		justify-items: start;
		padding-top: clamp(64px, 12vw, 160px);
	}
	h1 {
		font-size: clamp(40px, 7vw, 88px);
		max-width: 14ch;
	}
	p:not(.slug) {
		color: var(--ink-2);
		font-size: 19px;
		max-width: 44ch;
	}
</style>
