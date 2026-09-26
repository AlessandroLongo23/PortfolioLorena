<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { cvPath } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';
	import WorkCard from '$lib/components/WorkCard.svelte';

	const c = $derived(i18n.c);
	const site = $derived(c.site);
	const t = $derived(c.ui.home);
</script>

<Seo description={c.ui.meta.home} />

<!-- ---------- hero ---------- -->
<section class="wrap hero">
	<div class="hero__text">
		<p class="hero__name">{site.name}</p>
		<h1 class="display hero__lede">
			{#each t.lede as line, i (i)}
				<span class="line"
					>{#each line.split('*') as part, j (j)}{#if j % 2}<em>{part}</em>{:else}{part}{/if}{/each}</span
				>
			{/each}
		</h1>
		<div class="hero__line">
			<span class="slug">{site.role}</span>
			<span class="sep" aria-hidden="true">/</span>
			<span class="slug">{site.status}</span>
			<span class="sep" aria-hidden="true">/</span>
			<span class="slug">{site.languages}</span>
		</div>
		<div class="hero__cta">
			<a class="btn" href="#work">{t.seeWork} <span class="arrow" aria-hidden="true">↓</span></a>
			<a class="btn btn--ghost" href="mailto:{site.email}?subject={encodeURIComponent(c.ui.footer.subject)}">{t.writeMe}</a>
			<a class="btn btn--ghost" href={cvPath} target="_blank" rel="noopener" title={c.ui.cv.title}
				>{c.ui.cv.view} <span class="arrow" aria-hidden="true">↗</span></a
			>
		</div>
	</div>
	<figure class="portrait">
		<img src="/media/about/portrait.jpg" alt={t.portraitAlt} width="758" height="1000" fetchpriority="high" />
	</figure>
</section>

<!-- ---------- proof ---------- -->
<section class="wrap" aria-label={t.numbers}>
	<ul class="stats" role="list">
		{#each c.stats as s, i (s.value + s.label)}
			<li use:reveal={i * 0.06}>
				<a href={i18n.href(s.href ?? '/')}>
					<span class="stat__v">{s.value}</span>
					<span class="stat__l">{s.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<!-- ---------- work ---------- -->
<section id="work" class="wrap block">
	<div class="section-head">
		<h2>{t.work}</h2>
		<span class="slug">{t.workNote(c.projects.length)}</span>
	</div>
	<div class="works">
		{#each c.projects as p, i (p.slug)}
			<div use:reveal>
				<WorkCard project={p} index={i} />
			</div>
		{/each}
	</div>
</section>

<!-- ---------- what I do ---------- -->
<section class="wrap block">
	<div class="section-head">
		<h2>{t.services}</h2>
		<span class="slug">{t.servicesNote}</span>
	</div>
	<div class="services">
		{#each c.services as s, i (s.name)}
			<article class="service" use:reveal={i * 0.08}>
				<span class="num">0{i + 1}</span>
				<h3>{s.name}</h3>
				<p>{s.text}</p>
				<ul role="list">
					{#each s.items as it (it)}<li>{it}</li>{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<!-- ---------- experience ---------- -->
<section id="experience" class="wrap block">
	<div class="section-head">
		<h2>{t.experience}</h2>
		<span class="slug">{t.experienceNote}</span>
	</div>
	<ol class="xp" role="list">
		{#each c.experience as x (x.slug)}
			<li use:reveal>
				<svelte:element
					this={x.page ? 'a' : 'div'}
					class="xp__row"
					class:is-link={x.page}
					href={x.page ? i18n.href(`/experience/${x.slug}`) : undefined}
				>
					<span class="slug xp__when">{x.when}</span>
					<span class="xp__main">
						<span class="xp__role">{x.role}, <span class="xp__org">{x.org}</span></span>
						<span class="xp__head">{x.headline}</span>
					</span>
					{#if x.highlights[0]}
						<span class="xp__stat"
							><strong>{x.highlights[0].value}</strong> {x.highlights[0].label}</span
						>
					{:else}
						<span class="xp__stat"></span>
					{/if}
					<span class="xp__go" aria-hidden="true">{x.page ? '→' : ''}</span>
				</svelte:element>
			</li>
		{/each}
	</ol>
</section>

<!-- ---------- about teaser ---------- -->
<section class="wrap block">
	<div class="section-head">
		<h2>{t.how}</h2>
		<a class="slug" href={i18n.href('/about')}>{t.moreAbout}</a>
	</div>
	<div class="how">
		<figure class="how__img" use:reveal>
			<img src="/media/about/portrait-alt.jpg" alt={t.standingAlt} loading="lazy" width="1200" height="1628" />
		</figure>
		<ol class="how__list" role="list">
			{#each c.principles as p, i (p.title)}
				<li use:reveal={i * 0.08}>
					<span class="num">0{i + 1}</span>
					<h3>{p.title}</h3>
					<p>{p.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	/* hero */
	.hero {
		display: grid;
		grid-template-columns: 1fr minmax(240px, 340px);
		gap: clamp(32px, 6vw, 80px);
		align-items: end;
		padding-top: clamp(40px, 8vw, 96px);
		padding-bottom: clamp(40px, 6vw, 72px);
	}
	.hero__name {
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 24px;
		animation: rise 0.6s var(--ease) 0.05s backwards;
	}
	.hero__text {
		container-type: inline-size;
		min-width: 0;
	}
	.hero__lede {
		/* Fixed lines in every language; the size follows the column so none of them wraps. */
		font-size: min(80px, 10.6cqi);
		margin-bottom: 32px;
		animation: rise 0.7s var(--ease) 0.14s backwards;
	}
	.line {
		display: block;
		white-space: nowrap;
	}
	.hero__lede em {
		font-style: italic;
		font-weight: 500;
		color: var(--accent);
	}
	.hero__line {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 14px;
		padding-top: 20px;
		border-top: 1px solid var(--rule);
		margin-bottom: 32px;
		animation: rise 0.7s var(--ease) 0.24s backwards;
	}
	.sep {
		color: var(--rule);
	}
	.hero__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		animation: rise 0.7s var(--ease) 0.32s backwards;
	}
	.portrait {
		position: relative;
		animation: rise 0.9s var(--ease) 0.3s backwards;
	}
	.portrait::before {
		content: '';
		position: absolute;
		inset: 16px -14px -14px 16px;
		border: 1px solid var(--accent-dim);
	}
	.portrait img {
		position: relative;
		width: 100%;
		height: auto;
		filter: saturate(0.92);
	}

	/* stats */
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
	}
	.stats li + li {
		border-left: 1px solid var(--rule);
	}
	.stats a {
		display: grid;
		align-content: start;
		gap: 8px;
		height: 100%;
		padding: 26px clamp(14px, 2vw, 26px);
		text-decoration: none;
		transition: background 0.2s ease;
	}
	.stats a:hover {
		background: var(--surface);
		color: inherit;
	}
	.stat__v {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(38px, 4.6vw, 58px);
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--accent);
	}
	.stat__l {
		font-size: 14.5px;
		line-height: 1.4;
		color: var(--ink-2);
		max-width: 24ch;
	}

	/* blocks */
	.block {
		padding-top: clamp(72px, 10vw, 130px);
	}
	.works {
		display: grid;
		gap: clamp(20px, 3vw, 32px);
	}
	.num {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 500;
		color: var(--accent);
	}

	/* services */
	.services {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(20px, 3vw, 40px);
	}
	.service {
		display: grid;
		align-content: start;
		gap: 12px;
	}
	.service h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: 26px;
		letter-spacing: -0.015em;
		line-height: 1.15;
	}
	.service p {
		color: var(--ink-2);
	}
	.service ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 6px;
	}
	.service li {
		font-family: var(--mono);
		font-size: 11.5px;
		padding: 4px 9px;
		border: 1px solid var(--rule);
		color: var(--ink-2);
	}

	/* experience */
	.xp li {
		border-bottom: 1px solid var(--rule);
	}
	.xp li:first-child {
		border-top: 1px solid var(--rule);
	}
	:global(.xp__row) {
		display: grid;
		grid-template-columns: 150px 1fr 220px 28px;
		gap: 8px 28px;
		align-items: baseline;
		padding: 24px 12px;
		margin-inline: -12px;
		text-decoration: none;
		transition: background 0.2s ease;
	}
	:global(.xp__row.is-link:hover) {
		background: var(--surface);
		color: inherit;
	}
	.xp__main {
		display: grid;
		gap: 4px;
	}
	.xp__role {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(20px, 2.2vw, 24px);
		letter-spacing: -0.012em;
		line-height: 1.25;
	}
	.xp__org {
		color: var(--accent);
	}
	.xp__head {
		color: var(--ink-2);
	}
	.xp__stat {
		font-size: 14.5px;
		color: var(--ink-2);
	}
	.xp__stat strong {
		font-family: var(--display);
		font-size: 22px;
		color: var(--ink);
		font-weight: 600;
		margin-right: 4px;
	}
	.xp__go {
		font-family: var(--mono);
		color: var(--accent);
		transition: transform 0.25s var(--ease);
	}
	:global(.xp__row.is-link:hover) .xp__go {
		transform: translateX(4px);
	}

	/* how I work */
	.how {
		display: grid;
		grid-template-columns: minmax(220px, 360px) 1fr;
		gap: clamp(28px, 6vw, 80px);
		align-items: start;
	}
	.how__img img {
		width: 100%;
		height: auto;
	}
	.how__list {
		display: grid;
		gap: 36px;
	}
	.how__list li {
		display: grid;
		gap: 8px;
		padding-bottom: 32px;
		border-bottom: 1px solid var(--rule);
	}
	.how__list h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(26px, 3vw, 36px);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.how__list p {
		color: var(--ink-2);
		max-width: 52ch;
	}

	@media (max-width: 960px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.stats li:nth-child(3) {
			border-left: 0;
		}
		.stats li:nth-child(n + 3) {
			border-top: 1px solid var(--rule);
		}
		.services {
			grid-template-columns: 1fr;
		}
		:global(.xp__row) {
			grid-template-columns: 140px 1fr 28px;
		}
		.xp__stat {
			display: none;
		}
	}
	@media (max-width: 760px) {
		.sep {
			display: none;
		}
		.hero__line {
			flex-direction: column;
			gap: 6px;
		}
		.hero {
			grid-template-columns: 1fr;
		}
		.portrait {
			max-width: 240px;
			order: -1;
		}
		.how {
			grid-template-columns: 1fr;
		}
		.how__img {
			max-width: 280px;
		}
		:global(.xp__row) {
			grid-template-columns: 1fr 24px;
		}
		.xp__when {
			grid-column: 1 / -1;
		}
	}
</style>
