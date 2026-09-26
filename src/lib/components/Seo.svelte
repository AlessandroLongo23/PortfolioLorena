<script lang="ts">
	import { page } from '$app/state';
	import { siteUrl, switchLocale } from '$lib/content';
	import { i18n } from '$lib/i18n.svelte';

	let { title, description }: { title?: string; description: string } = $props();
	const site = $derived(i18n.c.site);
	const full = $derived(title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`);
	const path = $derived(page.url.pathname);
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{siteUrl}{path}" />
	<link rel="alternate" hreflang="en" href="{siteUrl}{switchLocale(path, 'en')}" />
	<link rel="alternate" hreflang="it" href="{siteUrl}{switchLocale(path, 'it')}" />
	<link rel="alternate" hreflang="x-default" href="{siteUrl}{switchLocale(path, 'en')}" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={i18n.locale === 'it' ? 'it_IT' : 'en_GB'} />
	<meta property="og:url" content="{siteUrl}{path}" />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta name="twitter:title" content={full} />
	<meta name="twitter:description" content={description} />
</svelte:head>
