<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';
	import Book from '$lib/components/Book.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let { data } = $props();
	const x = $derived(data.x);
	const ui = $derived(i18n.c.ui);
</script>

<Seo title="{x.role}, {x.org}" description={x.summary} />

<article>
	<header class="wrap head">
		<a class="slug back" href={i18n.href('/#experience')}>{ui.xp.all}</a>
		<p class="slug meta">{x.when} · {x.orgNote}</p>
		<h1 class="display title">{x.role}, <span>{x.org}</span></h1>
		<p class="headline">{x.headline}</p>
	</header>

	{#if x.image}
		<figure class="wrap photo">
			<img src={x.image.src} alt={x.image.alt} />
		</figure>
	{/if}

	<section class="wrap intro">
		<p class="summary" use:reveal>{x.summary}</p>
		{#if x.highlights.length}
			<dl class="highs" use:reveal={0.08}>
				{#each x.highlights as h (h.label)}
					<div>
						<dt>{h.value}</dt>
						<dd>{h.label}</dd>
					</div>
				{/each}
			</dl>
		{/if}
	</section>

	{#if x.did.length}
		<section class="wrap block">
			<div class="section-head"><h2>{ui.xp.did}</h2></div>
			<ol class="did" role="list">
				{#each x.did as d, i (d.title)}
					<li use:reveal={i * 0.06}>
						<span class="num">{String(i + 1).padStart(2, '0')}</span>
						<h3>{d.title}</h3>
						<p>{d.text}</p>
					</li>
				{/each}
			</ol>
		</section>
	{/if}

	{#if x.lesson}
		<section class="wrap block">
			<blockquote class="lesson" use:reveal>
				<p class="slug">{ui.xp.lesson}</p>
				<p class="display">{x.lesson}</p>
			</blockquote>
		</section>
	{/if}

	{#if data.related}
		{@const r = data.related}
		<section class="wrap block">
			<div class="section-head"><h2>{ui.xp.seeWork}</h2></div>
			<a class="related" href={i18n.href(`/work/${r.slug}`)} use:reveal>
				<div>
					<p class="slug">{r.client} · {r.kind}</p>
					<h3 class="display">{r.title}</h3>
					<p>{r.hook}</p>
					<span class="go">{ui.card.read} <span class="arrow" aria-hidden="true">→</span></span>
				</div>
				<Book src={r.cover.src} alt={r.cover.kind === 'image' ? r.cover.alt : ''} />
			</a>
		</section>
	{/if}

	<section class="wrap block">
		<div class="skills" use:reveal>
			<span class="slug">{ui.xp.skills}</span>
			<ul role="list">
				{#each x.skills as s (s)}<li>{s}</li>{/each}
			</ul>
		</div>
	</section>

	<nav class="wrap next" aria-label={ui.xp.next}>
		<a href={i18n.href(`/experience/${data.next.slug}`)}>
			<span class="slug">{ui.xp.next}</span>
			<span class="display">{data.next.role}, {data.next.org} <span class="arrow" aria-hidden="true">→</span></span>
		</a>
	</nav>
</article>

<style>
	.num {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 500;
		color: var(--accent);
	}
	.head {
		padding-top: clamp(28px, 5vw, 56px);
		padding-bottom: clamp(36px, 5vw, 56px);
	}
	.back {
		display: inline-block;
		text-decoration: none;
		margin-bottom: clamp(28px, 5vw, 56px);
	}
	.meta {
		margin-bottom: 16px;
		animation: rise 0.6s var(--ease) backwards;
	}
	.title {
		font-size: clamp(40px, 7vw, 88px);
		max-width: 19ch;
		margin-bottom: 20px;
		animation: rise 0.7s var(--ease) 0.08s backwards;
	}
	.title span {
		color: var(--accent);
	}
	.headline {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(22px, 2.6vw, 30px);
		line-height: 1.25;
		color: var(--ink-2);
		max-width: 32ch;
		animation: rise 0.7s var(--ease) 0.16s backwards;
	}
	.photo img {
		width: 100%;
		max-height: 620px;
		object-fit: cover;
		animation: rise 0.9s var(--ease) 0.2s backwards;
	}
	.intro {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: clamp(28px, 6vw, 80px);
		padding-top: clamp(40px, 6vw, 72px);
		align-items: start;
	}
	.summary {
		font-size: clamp(19px, 1.8vw, 22px);
		line-height: 1.55;
		max-width: 48ch;
	}
	.highs {
		display: grid;
		border-top: 1px solid var(--ink);
	}
	.highs div {
		display: grid;
		grid-template-columns: minmax(96px, auto) 1fr;
		gap: 18px;
		align-items: baseline;
		padding: 14px 0;
		border-bottom: 1px solid var(--rule);
	}
	.highs dt {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(28px, 3vw, 40px);
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--accent);
	}
	.highs dd {
		color: var(--ink-2);
	}
	.block {
		padding-top: clamp(64px, 9vw, 112px);
	}
	.did {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: clamp(20px, 3vw, 36px);
	}
	.did li {
		display: grid;
		align-content: start;
		gap: 10px;
		padding-top: 18px;
		border-top: 1px solid var(--rule);
	}
	.did h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: 24px;
		letter-spacing: -0.015em;
		line-height: 1.15;
	}
	.did p {
		color: var(--ink-2);
	}
	.lesson {
		display: grid;
		gap: 18px;
		padding: clamp(28px, 5vw, 64px);
		background: var(--accent);
		color: var(--on-accent);
	}
	.lesson .slug {
		color: color-mix(in srgb, var(--on-accent) 70%, transparent);
	}
	.lesson .display {
		font-size: clamp(26px, 3.6vw, 44px);
		font-weight: 500;
		max-width: 26ch;
	}
	.related {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: clamp(24px, 5vw, 64px);
		align-items: center;
		padding: clamp(24px, 4vw, 44px);
		background: var(--surface);
		border: 1px solid var(--rule);
		text-decoration: none;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.related:hover {
		color: inherit;
		border-color: var(--accent-dim);
		box-shadow: var(--shadow);
	}
	.related h3 {
		font-size: clamp(40px, 6vw, 72px);
		font-weight: 700;
		margin: 10px 0 12px;
	}
	.related p:not(.slug) {
		color: var(--ink-2);
		font-size: 18px;
		max-width: 36ch;
		margin-bottom: 22px;
	}
	.go {
		font-family: var(--mono);
		font-size: 12.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border-bottom: 1px solid currentColor;
		padding-bottom: 3px;
	}
	.related:hover .arrow {
		transform: translateX(4px);
	}
	.skills {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 18px;
	}
	.skills ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.skills li {
		font-family: var(--mono);
		font-size: 12px;
		padding: 5px 10px;
		border: 1px solid var(--rule);
		color: var(--ink-2);
	}
	.next {
		padding-top: clamp(64px, 9vw, 112px);
	}
	.next a {
		display: grid;
		gap: 10px;
		padding: clamp(24px, 4vw, 44px) 0;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		text-decoration: none;
	}
	.next .display {
		font-size: clamp(28px, 4.6vw, 56px);
	}
	.next a:hover .arrow {
		transform: translateX(8px);
	}
	@media (max-width: 820px) {
		.intro,
		.related {
			grid-template-columns: 1fr;
		}
	}
</style>
