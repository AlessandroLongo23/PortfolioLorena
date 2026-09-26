<script lang="ts">
	import '@fontsource-variable/fraunces/opsz.css';
	import '@fontsource-variable/public-sans';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let { children } = $props();

	// The server sets <html lang>; keep it right after client-side language switches.
	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<a class="skip" href="#main">{i18n.c.ui.skip}</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />
<Lightbox />

<style>
	.skip {
		position: absolute;
		left: 12px;
		top: -60px;
		z-index: 200;
		padding: 10px 14px;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--mono);
		font-size: 12px;
	}
	.skip:focus {
		top: 12px;
	}
</style>
