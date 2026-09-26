<script lang="ts">
	// A horizontal strip of full-height pages. Readable in place; click opens full screen.
	import { openLightbox } from '$lib/lightbox.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let { pages, title }: { pages: { src: string; title: string }[]; title: string } = $props();

	let track: HTMLDivElement | undefined = $state();
	let current = $state(0);

	function onscroll() {
		if (!track) return;
		const first = track.children[0] as HTMLElement | undefined;
		if (!first) return;
		const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
		current = Math.min(pages.length - 1, Math.round(track.scrollLeft / step));
	}

	function go(step: number) {
		const el = track?.children[Math.max(0, Math.min(pages.length - 1, current + step))] as
			| HTMLElement
			| undefined;
		el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	}

	const items = $derived(pages.map((p) => ({ src: p.src, alt: `${title}: ${p.title}`, caption: p.title })));
</script>

<div class="reader">
	<div class="track" bind:this={track} {onscroll} tabindex="-1">
		{#each pages as p, i (p.src)}
			<figure>
				<button onclick={() => openLightbox(items, i, title)} aria-label={i18n.c.ui.reader.open(i + 1, p.title)}>
					<img src={p.src} alt="{title}: {p.title}" loading={i < 3 ? 'eager' : 'lazy'} decoding="async" />
				</button>
				<figcaption>
					<span class="n">{String(i + 1).padStart(2, '0')}</span>
					{p.title}
				</figcaption>
			</figure>
		{/each}
	</div>

	<div class="controls">
		<div class="progress" aria-hidden="true">
			<span style="width:{((current + 1) / pages.length) * 100}%"></span>
		</div>
		<span class="slug">{String(current + 1).padStart(2, '0')} / {pages.length}</span>
		<button onclick={() => go(-1)} disabled={current === 0} aria-label={i18n.c.ui.reader.prev}>←</button>
		<button onclick={() => go(1)} disabled={current >= pages.length - 1} aria-label={i18n.c.ui.reader.next}>→</button>
	</div>
</div>

<style>
	.reader {
		/* bleed to the right edge of the viewport so the strip reads as "more to see" */
		margin-right: calc(50% - 50vw);
	}
	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: auto;
		column-gap: 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding-left: 0;
		padding-bottom: 18px;
		padding-right: var(--gutter);
		scrollbar-width: none;
		overscroll-behavior-x: contain;
	}
	.track::-webkit-scrollbar {
		display: none;
	}
	figure {
		scroll-snap-align: start;
		display: grid;
		gap: 12px;
	}
	button {
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		line-height: 0;
	}
	img {
		height: min(78vh, 760px);
		width: auto;
		max-width: none;
		aspect-ratio: 790 / 1116;
		border: 1px solid var(--rule);
		box-shadow: var(--shadow);
		background: var(--surface);
		transition: transform 0.35s var(--ease);
	}
	button:hover img {
		transform: translateY(-4px);
	}
	figcaption {
		width: 0;
		min-width: 100%;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--ink-2);
		display: flex;
		gap: 10px;
	}
	.n {
		color: var(--accent);
	}
	.controls {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: 18px;
		padding-right: var(--gutter);
		max-width: calc(var(--page) - var(--gutter));
	}
	.progress {
		flex: 1;
		height: 2px;
		background: var(--rule);
		position: relative;
	}
	.progress span {
		position: absolute;
		inset: 0 auto 0 0;
		background: var(--accent);
		transition: width 0.3s var(--ease);
	}
	.controls button {
		width: 46px;
		height: 40px;
		border: 1px solid var(--ink);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 16px;
		line-height: 1;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}
	.controls button:hover:not(:disabled) {
		background: var(--ink);
		color: var(--paper);
	}
	.controls button:disabled {
		opacity: 0.25;
		cursor: default;
	}
	@media (max-width: 600px) {
		img {
			height: auto;
			width: 78vw;
		}
	}
</style>
