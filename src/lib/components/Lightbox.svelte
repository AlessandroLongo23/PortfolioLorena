<script lang="ts">
	import { tick } from 'svelte';
	import { lightbox } from '$lib/lightbox.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let closeBtn: HTMLButtonElement | undefined = $state();
	let opener: Element | null = null;
	let touchX = 0;
	let dir = $state(1);

	const item = $derived(lightbox.items[lightbox.index]);
	const count = $derived(lightbox.items.length);

	$effect(() => {
		if (lightbox.open) {
			opener = document.activeElement;
			document.body.style.overflow = 'hidden';
			tick().then(() => closeBtn?.focus());
		} else {
			document.body.style.overflow = '';
			(opener as HTMLElement | null)?.focus?.();
		}
	});

	function go(step: number) {
		const next = lightbox.index + step;
		if (next < 0 || next >= count) return;
		dir = step;
		lightbox.index = next;
	}

	function close() {
		lightbox.open = false;
	}

	function onkeydown(e: KeyboardEvent) {
		if (!lightbox.open) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowRight') go(1);
		else if (e.key === 'ArrowLeft') go(-1);
	}
</script>

<svelte:window {onkeydown} />

{#if lightbox.open && item}
	<div
		class="lb"
		role="dialog"
		aria-modal="true"
		aria-label={lightbox.title || i18n.c.ui.lightbox.viewer}
		tabindex="-1"
		ontouchstart={(e) => (touchX = e.touches[0].clientX)}
		ontouchend={(e) => {
			const dx = e.changedTouches[0].clientX - touchX;
			if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
		}}
	>
		<div class="lb__bar">
			<span class="lb__title">{lightbox.title}</span>
			<button class="lb__btn" bind:this={closeBtn} onclick={close}>{i18n.c.ui.lightbox.close}</button>
		</div>

		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="lb__stage" onclick={(e) => e.target === e.currentTarget && close()}>
			{#key lightbox.index}
				<img src={item.src} alt={item.alt} style="--dir:{dir * 24}px" />
			{/key}
		</div>

		<div class="lb__foot">
			<button class="lb__nav" onclick={() => go(-1)} disabled={lightbox.index === 0} aria-label={i18n.c.ui.lightbox.prev}
				>←</button
			>
			<span class="lb__count">
				{String(lightbox.index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
				{#if item.caption}<span class="lb__cap">{item.caption}</span>{/if}
			</span>
			<button class="lb__nav" onclick={() => go(1)} disabled={lightbox.index === count - 1} aria-label={i18n.c.ui.lightbox.next}
				>→</button
			>
		</div>
	</div>
{/if}

<style>
	.lb {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		grid-template-rows: auto 1fr auto;
		background: var(--scrim);
		color: #edede8;
		animation: fade 0.2s ease;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}
	.lb__bar,
	.lb__foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 12px 16px;
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}
	.lb__stage {
		display: grid;
		place-items: center;
		min-height: 0;
		padding: 0 12px;
		overflow: hidden;
	}
	img {
		/* Fill the available height: the page should be readable, not a thumbnail. */
		height: 100%;
		width: auto;
		max-width: 100%;
		object-fit: contain;
		animation: slide 0.3s var(--ease);
		box-shadow: 0 30px 80px -30px #000;
	}
	@keyframes slide {
		from {
			opacity: 0;
			transform: translateX(var(--dir));
		}
	}
	.lb__btn,
	.lb__nav {
		background: none;
		border: 1px solid rgba(237, 237, 232, 0.35);
		color: inherit;
		cursor: pointer;
		font-family: var(--mono);
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}
	.lb__btn {
		padding: 8px 12px;
		font-size: 12px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}
	.lb__nav {
		width: 52px;
		height: 44px;
		font-size: 18px;
	}
	.lb__btn:hover,
	.lb__nav:hover:not(:disabled) {
		background: rgba(237, 237, 232, 0.12);
		border-color: #edede8;
	}
	.lb__nav:disabled {
		opacity: 0.25;
		cursor: default;
	}
	.lb__count {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 4px 14px;
		color: #a9afaa;
		text-align: center;
	}
	.lb__cap {
		color: #edede8;
		text-transform: none;
		letter-spacing: 0.02em;
	}
</style>
