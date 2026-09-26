<script lang="ts">
	// Follows the system until clicked; then the choice is remembered.
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';

	let dark = $state(false);

	onMount(() => {
		const root = document.documentElement;
		const mq = matchMedia('(prefers-color-scheme: dark)');
		const read = () => (dark = root.dataset.theme ? root.dataset.theme === 'dark' : mq.matches);
		read();
		mq.addEventListener('change', read);
		return () => mq.removeEventListener('change', read);
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// Private mode: the choice lasts for this page view only.
		}
	}
</script>

<button
	class="toggle"
	onclick={toggle}
	aria-label={dark ? i18n.c.ui.theme.toLight : i18n.c.ui.theme.toDark}
	title={dark ? i18n.c.ui.theme.toLight : i18n.c.ui.theme.toDark}
>
	<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
		<g class="sun" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
			<circle cx="12" cy="12" r="4.2" />
			<path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
		</g>
		<path class="moon" fill="currentColor" d="M20.2 14.6A8.5 8.5 0 0 1 9.4 3.8a8.5 8.5 0 1 0 10.8 10.8Z" />
	</svg>
</button>

<style>
	.toggle {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		padding: 0;
		border: 1px solid var(--rule);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}
	.toggle:hover {
		border-color: var(--ink);
		color: var(--accent);
	}
	svg * {
		transition:
			opacity 0.3s ease,
			transform 0.4s var(--ease);
		transform-origin: 12px 12px;
	}
	.moon {
		opacity: 0;
		transform: rotate(-40deg) scale(0.6);
	}
	:global(:root[data-theme='dark']) .sun {
		opacity: 0;
		transform: rotate(40deg) scale(0.6);
	}
	:global(:root[data-theme='dark']) .moon {
		opacity: 1;
		transform: none;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .sun {
			opacity: 0;
			transform: rotate(40deg) scale(0.6);
		}
		:global(:root:not([data-theme='light'])) .moon {
			opacity: 1;
			transform: none;
		}
	}
</style>
