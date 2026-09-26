<script lang="ts">
	import type { Project } from '$lib/content';
	import { i18n } from '$lib/i18n.svelte';
	import Book from './Book.svelte';

	let { project, index }: { project: Project; index: number } = $props();
	let hover = $state(false);
</script>

<a
	class="card"
	href={i18n.href(`/work/${project.slug}`)}
	style="--tint:{project.accent}"
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
	onfocus={() => (hover = true)}
	onblur={() => (hover = false)}
>
	<div class="card__text">
		<div class="card__meta">
			<span class="num">{String(index + 1).padStart(2, '0')}</span>
			<span class="slug">{project.client} · {project.kind} · {project.year}</span>
		</div>
		<h3 class="card__title">{project.title}</h3>
		<p class="card__hook">{project.hook}</p>

		<dl class="brief">
			<div><dt>{i18n.c.ui.brief.get}</dt><dd>{project.brief.get}</dd></div>
			<div><dt>{i18n.c.ui.brief.who}</dt><dd>{project.brief.who}</dd></div>
			<div><dt>{i18n.c.ui.brief.to}</dt><dd>{project.brief.to}</dd></div>
		</dl>

		<span class="card__go">{i18n.c.ui.card.read} <span class="arrow" aria-hidden="true">→</span></span>
	</div>

	<div class="card__book">
		<Book src={project.cover.src} alt={project.cover.kind === 'image' ? project.cover.alt : ''} preview={project.preview} active={hover} />
		{#if project.preview}<span class="slug hint">{i18n.c.ui.card.hover}</span>{/if}
	</div>
</a>

<style>
	.card {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: clamp(28px, 5vw, 72px);
		align-items: center;
		padding: clamp(24px, 4vw, 48px);
		background: var(--surface);
		border: 1px solid var(--rule);
		text-decoration: none;
		color: inherit;
		overflow: hidden;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.card::before {
		/* a thin project-coloured edge that grows on hover */
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: var(--tint);
		transform: scaleY(0.18);
		transform-origin: top;
		transition: transform 0.5s var(--ease);
	}
	.card:hover {
		color: inherit;
		border-color: var(--accent-dim);
		box-shadow: var(--shadow);
	}
	.card:hover::before,
	.card:focus-visible::before {
		transform: scaleY(1);
	}
	.card__meta {
		display: flex;
		align-items: baseline;
		gap: 14px;
		flex-wrap: wrap;
		margin-bottom: 18px;
	}
	.num {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 500;
		color: var(--accent);
	}
	.card__title {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(34px, 5.4vw, 64px);
		line-height: 1;
		letter-spacing: -0.025em;
		margin-bottom: 16px;
	}
	.card__hook {
		font-family: var(--display);
		font-size: clamp(19px, 2vw, 24px);
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--ink-2);
		max-width: 30ch;
		text-wrap: balance;
		margin-bottom: 28px;
	}
	.brief {
		display: grid;
		gap: 8px;
		max-width: 46ch;
		margin-bottom: 30px;
		padding-top: 18px;
		border-top: 1px solid var(--rule);
	}
	.brief div {
		display: grid;
		grid-template-columns: 76px 1fr;
		gap: 12px;
		font-size: 15px;
		line-height: 1.45;
	}
	dt {
		font-family: var(--mono);
		font-size: 11.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--accent);
		padding-top: 2px;
	}
	dd {
		color: var(--ink-2);
	}
	.card__go {
		font-family: var(--mono);
		font-size: 12.5px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border-bottom: 1px solid var(--ink);
		padding-bottom: 3px;
	}
	.card:hover .card__go {
		color: var(--accent);
		border-color: var(--accent);
	}
	.card:hover .arrow {
		transform: translateX(4px);
	}
	.card__book {
		display: grid;
		justify-items: center;
		gap: 14px;
		padding-right: 8px;
	}
	.hint {
		transition: color 0.2s ease;
	}
	.card:hover .hint {
		color: var(--accent);
	}

	@media (max-width: 820px) {
		.card {
			grid-template-columns: 1fr;
		}
		.card__book {
			order: -1;
			justify-items: start;
		}
		.hint {
			display: none;
		}
	}
</style>
