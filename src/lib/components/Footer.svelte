<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { cvPath } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';

	let copied = $state(false);
	const site = $derived(i18n.c.site);
	const f = $derived(i18n.c.ui.footer);

	async function copy() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			setTimeout(() => (copied = false), 2200);
		} catch {
			location.href = `mailto:${site.email}`;
		}
	}
</script>

<footer id="contact" class="foot">
	<div class="wrap">
		<div class="foot__main" use:reveal>
			<p class="slug avail"><span class="dot" aria-hidden="true"></span> {f.open} · {site.status}</p>
			<h2 class="display foot__line">
				{#each f.line as line, i (i)}<span>{line}</span>{/each}
			</h2>
			<div class="foot__actions">
				<a class="btn" href="mailto:{site.email}?subject={encodeURIComponent(f.subject)}"
					>{f.write} <span class="arrow" aria-hidden="true">→</span></a
				>
				<button class="btn btn--ghost" onclick={copy} aria-live="polite">
					{copied ? f.copied : site.email}
				</button>
				<a class="btn btn--ghost" href={cvPath} target="_blank" rel="noopener" title={i18n.c.ui.cv.title}
					>{i18n.c.ui.cv.view} <span class="arrow" aria-hidden="true">↗</span></a
				>
				<a class="btn btn--ghost" href={site.linkedin} target="_blank" rel="noopener"
					>LinkedIn <span class="arrow" aria-hidden="true">↗</span></a
				>
			</div>
		</div>

		<div class="foot__small">
			<span class="slug">© {new Date().getFullYear()} {site.name}</span>
			<span class="slug">{f.signoff}</span>
		</div>
	</div>
</footer>

<style>
	.foot {
		margin-top: clamp(80px, 12vw, 160px);
		background: var(--accent);
		color: var(--on-accent);
		padding: clamp(56px, 9vw, 110px) 0 28px;
	}
	.foot :global(.slug) {
		color: color-mix(in srgb, var(--on-accent) 72%, transparent);
	}
	.avail {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 24px;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--on-accent);
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--on-accent) 60%, transparent);
		animation: pulse 2.4s ease-out infinite;
	}
	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 10px transparent;
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}
	.foot__main {
		container-type: inline-size;
	}
	.foot__line {
		/* Fixed lines in every language, sized to the column so none of them wraps. */
		font-size: min(54px, 7.4cqi);
		margin-bottom: 36px;
	}
	.foot__line span {
		display: block;
		white-space: nowrap;
	}
	.foot__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.foot .btn {
		background: var(--on-accent);
		color: var(--accent);
		border-color: var(--on-accent);
	}
	.foot .btn:hover {
		background: transparent;
		color: var(--on-accent);
	}
	.foot .btn--ghost {
		background: transparent;
		color: var(--on-accent);
		border-color: color-mix(in srgb, var(--on-accent) 45%, transparent);
		text-transform: none;
		letter-spacing: 0.02em;
	}
	.foot .btn--ghost:hover {
		border-color: var(--on-accent);
		background: color-mix(in srgb, var(--on-accent) 10%, transparent);
	}
	.foot__small {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 24px;
		margin-top: clamp(56px, 9vw, 100px);
		padding-top: 20px;
		border-top: 1px solid color-mix(in srgb, var(--on-accent) 25%, transparent);
	}
</style>
