<script lang="ts">
	import { page } from '$app/state';
	import { locales, switchLocale } from '$lib/content';
	import { i18n } from '$lib/i18n.svelte';
</script>

<div class="lang" role="group" aria-label={i18n.c.ui.lang.label}>
	{#each locales as l (l)}
		<a
			href={switchLocale(page.url.pathname, l) + page.url.hash}
			hreflang={l}
			lang={l}
			aria-current={l === i18n.locale ? 'true' : undefined}
			title={l === i18n.locale ? undefined : i18n.c.ui.lang.switchTo}
			data-sveltekit-noscroll>{l.toUpperCase()}</a
		>
	{/each}
</div>

<style>
	.lang {
		display: flex;
		border: 1px solid var(--rule);
		height: 34px;
	}
	a {
		display: grid;
		place-items: center;
		min-width: 34px;
		padding: 0 6px;
		font-family: var(--mono);
		font-size: 11.5px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-decoration: none;
		color: var(--ink-3);
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}
	a:hover {
		color: var(--ink);
	}
	a[aria-current='true'] {
		background: var(--ink);
		color: var(--paper);
	}
</style>
