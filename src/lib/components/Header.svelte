<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import LangSwitch from './LangSwitch.svelte';

	let scrolled = $state(false);

	const nav = $derived(i18n.c.ui.nav);
	const links = $derived([
		{ href: '/#work', label: nav.work, match: '/work', key: 'work' },
		{ href: '/#experience', label: nav.experience, match: '/experience', key: 'experience' },
		{ href: '/about', label: nav.about, match: '/about', key: 'about' }
	]);
	const bare = $derived(page.url.pathname.replace(/^\/it(?=\/|$)/, '') || '/');
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<header class="bar" class:scrolled>
	<div class="wrap bar__inner">
		<a class="name" href={i18n.href('/')} aria-label="{i18n.c.site.name}, {nav.home}">
			<span class="mark" aria-hidden="true">LT</span>
			<span class="name__text">{i18n.c.site.name}</span>
		</a>

		<div class="right">
			<nav aria-label={nav.main}>
				<ul role="list">
					{#each links as l (l.key)}
						<li class="nav-{l.key}">
							<a href={i18n.href(l.href)} aria-current={bare.startsWith(l.match) ? 'page' : undefined}
								>{l.label}</a
							>
						</li>
					{/each}
					<li class="nav-hello"><a class="cta" href={i18n.href('/#contact')}>{nav.hello}</a></li>
				</ul>
			</nav>
			<div class="tools">
				<LangSwitch />
				<ThemeToggle />
			</div>
		</div>
	</div>
</header>

<style>
	.bar {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--paper) 88%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid transparent;
		transition: border-color 0.25s ease;
	}
	.bar.scrolled {
		border-bottom-color: var(--rule);
	}
	.bar__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		height: 64px;
	}
	.name {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
		font-family: var(--mono);
		font-size: 12.5px;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.mark {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		background: var(--accent);
		color: var(--on-accent);
		font-family: var(--display);
		font-size: 14px;
		letter-spacing: 0;
		text-transform: none;
	}
	.right {
		display: flex;
		align-items: center;
		gap: clamp(14px, 2.4vw, 28px);
	}
	.tools {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	ul {
		display: flex;
		align-items: center;
		gap: clamp(14px, 2.4vw, 28px);
		margin: 0;
	}
	nav a {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--ink-2);
		white-space: nowrap;
	}
	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--ink);
	}
	nav a[aria-current='page'] {
		text-decoration: underline;
		text-decoration-color: var(--accent);
		text-underline-offset: 6px;
	}
	.cta {
		color: var(--ink);
		padding: 8px 12px;
		border: 1px solid var(--ink);
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}
	.cta:hover {
		background: var(--ink);
		color: var(--paper);
	}

	@media (max-width: 860px) {
		.name__text,
		.nav-hello {
			display: none;
		}
	}
	@media (max-width: 520px) {
		.nav-experience {
			display: none;
		}
		.right,
		ul {
			gap: 12px;
		}
	}
	@media (max-width: 360px) {
		.nav-about {
			display: none;
		}
	}
</style>
