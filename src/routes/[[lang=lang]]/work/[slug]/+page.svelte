<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { openLightbox } from '$lib/lightbox.svelte';
	import type { Media } from '$lib/content';
	import Seo from '$lib/components/Seo.svelte';
	import Book from '$lib/components/Book.svelte';
	import AutoVideo from '$lib/components/AutoVideo.svelte';
	import PageReader from '$lib/components/PageReader.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let { data } = $props();
	const p = $derived(data.project);
	const ui = $derived(i18n.c.ui);

	const zoom = (items: Media[], i: number, title: string) =>
		openLightbox(
			items.flatMap((m) => (m.kind === 'image' ? [{ src: m.src, alt: m.alt, caption: m.caption }] : [])),
			i,
			title
		);
</script>

<Seo title="{p.title}, {p.client}" description={p.summary} />

<article style="--tint:{p.accent}">
	<!-- ---------- head ---------- -->
	<header class="wrap head">
		<div class="head__text">
			<a class="slug back" href={i18n.href('/#work')}>{ui.work.all}</a>
			<p class="slug head__meta">
				<span class="num">{String(data.index + 1).padStart(2, '0')}</span>
				{p.client} · {p.kind} · {p.year}
			</p>
			<h1 class="display head__title">{p.title}</h1>
			<p class="head__hook">{p.hook}</p>
			<p class="head__sum">{p.summary}</p>
		</div>
		<div class="head__book">
			<Book src={p.cover.src} alt={p.cover.kind === 'image' ? p.cover.alt : ''} size="lg" />
		</div>
	</header>

	<!-- ---------- brief + facts ---------- -->
	<section class="wrap brief-row">
		<div class="brief" use:reveal>
			<p class="slug">{ui.brief.title}</p>
			<dl>
				<div><dt>{ui.brief.get}</dt><dd>{p.brief.get}</dd></div>
				<div><dt>{ui.brief.who}</dt><dd>{p.brief.who}</dd></div>
				<div><dt>{ui.brief.to}</dt><dd>{p.brief.to}</dd></div>
				<div><dt>{ui.brief.by}</dt><dd>{p.brief.by}</dd></div>
			</dl>
		</div>
		<dl class="facts" use:reveal={0.08}>
			{#each p.facts as f (f.label)}
				<div><dt class="slug">{f.label}</dt><dd>{f.value}</dd></div>
			{/each}
		</dl>
	</section>

	<!-- ---------- sections ---------- -->
	{#each p.sections as s, si (si)}
		{#if s.kind === 'quote'}
			<section class="wrap sec">
				<blockquote class="quote" use:reveal>
					<p class="display">“{s.text}”</p>
					{#if s.note}<footer class="slug">{s.note}</footer>{/if}
				</blockquote>
			</section>
		{:else}
			<section class="wrap sec">
				<div class="sec__head" use:reveal>
					<p class="slug label">{s.label}</p>
					<h2 class="display sec__title">{s.title}</h2>
					{#if 'intro' in s && s.intro}<p class="sec__intro">{s.intro}</p>{/if}
				</div>

				{#if s.kind === 'text'}
					<div class="prose" use:reveal>
						{#each s.body as para, i (i)}<p>{para}</p>{/each}
					</div>
				{:else if s.kind === 'script'}
					<ol class="script" role="list">
						{#each s.lines as l, i (i)}
							<li use:reveal={i * 0.05}>
								<span class="script__n">{String(i + 1).padStart(2, '0')}</span>
								<span class="script__it">{l.it}</span>
								<!-- Italian has no translation to show; the empty cell keeps rows the same height as English. -->
								<span class="script__en" class:script__en--blank={i18n.locale === 'it' || l.en === l.it}
									aria-hidden={i18n.locale === 'it' || l.en === l.it}
									>{l.en}</span
								>
							</li>
						{/each}
					</ol>
				{:else if s.kind === 'cuts'}
					<div class="cuts">
						{#each s.items as c (c.src)}
							<figure class="cut" class:cut--tall={c.ratio === '9 / 16'} use:reveal>
								{#if c.kind === 'video'}
									<AutoVideo src={c.src} poster={c.poster} ratio={c.ratio} label="{p.title} {ui.work.teaser}, {ui.work.cut} {c.name}" />
								{/if}
								<figcaption>
									<strong>{c.name}</strong>
									<span class="slug">{c.spec}</span>
								</figcaption>
							</figure>
						{/each}
					</div>
				{:else if s.kind === 'executions'}
					<ol class="execs" role="list">
						{#each s.items as ex, i (ex.name)}
							<li class="exec" use:reveal>
								<div class="exec__text">
									<span class="num">{String(i + 1).padStart(2, '0')}</span>
									<h3>{ex.name}</h3>
									<p>{ex.text}</p>
								</div>
								<div class="exec__media" class:exec__media--pair={ex.media.length > 1}>
									{#each ex.media as m, mi (m.src)}
										{#if m.kind === 'image'}
											<button class="zoom" onclick={() => zoom(ex.media, mi, `${p.title}: ${ex.name}`)}>
												<img src={m.src} alt={m.alt} loading="lazy" style="aspect-ratio:{m.ratio}" />
												<span class="zoom__hint slug">{ui.work.enlarge}</span>
											</button>
										{/if}
									{/each}
								</div>
							</li>
						{/each}
					</ol>
				{:else if s.kind === 'gallery'}
					<div class="gallery gallery--{s.layout ?? 'row'}">
						{#each s.items as m, i (m.src)}
							{#if m.kind === 'image'}
								<figure use:reveal={i * 0.06}>
									<button class="zoom" onclick={() => zoom(s.items, i, `${p.title}: ${s.title}`)}>
										<img src={m.src} alt={m.alt} loading="lazy" style="aspect-ratio:{m.ratio}" />
										<span class="zoom__hint slug">{ui.work.enlarge}</span>
									</button>
									{#if m.caption}<figcaption class="slug">{m.caption}</figcaption>{/if}
								</figure>
							{/if}
						{/each}
					</div>
				{:else if s.kind === 'pages'}
					<PageReader pages={s.pages} title={p.title} />
				{/if}
			</section>
		{/if}
	{/each}

	<!-- ---------- takeaways ---------- -->
	<section class="wrap sec">
		<div class="take" use:reveal>
			<p class="slug label">{ui.work.look}</p>
			<ol role="list">
				{#each p.takeaways as t, i (i)}
					<li><span class="num">{String(i + 1).padStart(2, '0')}</span>{t}</li>
				{/each}
			</ol>
			<p class="credits slug">{p.credits}</p>
		</div>
	</section>

	<!-- ---------- next ---------- -->
	<nav class="wrap next" aria-label={ui.work.next}>
		<a href={i18n.href(`/work/${data.next.slug}`)} class="next__link">
			<span class="slug">{ui.work.next}</span>
			<span class="display next__title">{data.next.title} <span class="arrow" aria-hidden="true">→</span></span>
			<span class="next__hook">{data.next.hook}</span>
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
	.label {
		color: var(--accent);
	}

	/* head */
	.head {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: clamp(32px, 6vw, 80px);
		align-items: center;
		padding-top: clamp(28px, 5vw, 56px);
		padding-bottom: clamp(48px, 7vw, 88px);
	}
	.back {
		display: inline-block;
		text-decoration: none;
		margin-bottom: clamp(28px, 5vw, 56px);
	}
	.back:hover {
		color: var(--accent);
	}
	.head__meta {
		display: flex;
		gap: 14px;
		margin-bottom: 18px;
		animation: rise 0.6s var(--ease) backwards;
	}
	.head__title {
		font-size: clamp(52px, 10vw, 128px);
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.035em;
		margin-bottom: 22px;
		animation: rise 0.7s var(--ease) 0.08s backwards;
	}
	.head__hook {
		font-family: var(--display);
		font-size: clamp(22px, 2.6vw, 30px);
		line-height: 1.25;
		letter-spacing: -0.012em;
		max-width: 26ch;
		text-wrap: balance;
		margin-bottom: 20px;
		animation: rise 0.7s var(--ease) 0.16s backwards;
	}
	.head__sum {
		color: var(--ink-2);
		max-width: 52ch;
		animation: rise 0.7s var(--ease) 0.24s backwards;
	}
	.head__book {
		animation: rise 0.9s var(--ease) 0.2s backwards;
		padding-right: 8px;
	}

	/* brief */
	.brief-row {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: clamp(20px, 3vw, 32px);
	}
	.brief {
		background: var(--accent);
		color: var(--on-accent);
		padding: clamp(24px, 4vw, 44px);
	}
	.brief .slug {
		color: color-mix(in srgb, var(--on-accent) 70%, transparent);
		margin-bottom: 20px;
		display: block;
	}
	.brief dl {
		display: grid;
		gap: 10px;
	}
	.brief dl div {
		display: grid;
		grid-template-columns: 84px 1fr;
		gap: 14px;
		align-items: baseline;
	}
	.brief dt {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.7;
	}
	.brief dd {
		font-family: var(--display);
		font-size: clamp(20px, 2.2vw, 26px);
		line-height: 1.25;
		letter-spacing: -0.01em;
	}
	.facts {
		display: grid;
		align-content: start;
		border-top: 1px solid var(--ink);
	}
	.facts div {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid var(--rule);
	}
	.facts dt {
		padding-top: 3px;
	}
	.facts dd {
		font-size: 15.5px;
	}

	/* sections */
	.sec {
		padding-top: clamp(72px, 10vw, 128px);
	}
	.sec__head {
		display: grid;
		gap: 12px;
		max-width: 780px;
		margin-bottom: clamp(28px, 4vw, 48px);
	}
	.sec__title {
		font-size: clamp(30px, 4.4vw, 52px);
	}
	.sec__intro {
		color: var(--ink-2);
		font-size: 18px;
		max-width: 56ch;
	}
	.prose {
		display: grid;
		gap: 18px;
		max-width: var(--measure);
		font-size: 19px;
		line-height: 1.6;
		margin-left: auto;
		margin-right: 8%;
	}
	.prose p:first-child {
		font-family: var(--display);
		font-size: 1.25em;
		line-height: 1.4;
		letter-spacing: -0.01em;
	}

	/* quote */
	.quote {
		display: grid;
		gap: 18px;
		padding: clamp(32px, 6vw, 72px) 0;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
	}
	.quote p {
		font-size: clamp(34px, 6vw, 76px);
		font-style: italic;
		font-weight: 500;
		color: var(--accent);
		max-width: 18ch;
	}

	/* script */
	.script {
		border-top: 1px solid var(--rule);
	}
	.script li {
		display: grid;
		grid-template-columns: 48px 1fr minmax(0, 0.8fr);
		gap: 20px;
		align-items: baseline;
		padding: 18px 0;
		border-bottom: 1px solid var(--rule);
	}
	.script__n {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--ink-3);
	}
	.script__it {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(26px, 4.4vw, 54px);
		letter-spacing: -0.025em;
		line-height: 1.05;
	}
	.script__en--blank {
		visibility: hidden;
	}
	.script__en {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--ink-2);
	}
	.script li:nth-child(3) .script__it {
		color: var(--tint);
	}

	/* cuts */
	.cuts {
		display: grid;
		grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
		gap: clamp(20px, 3vw, 40px);
		align-items: end;
	}
	.cut {
		display: grid;
		gap: 14px;
	}
	.cut figcaption {
		display: grid;
		gap: 4px;
		font-family: var(--display);
		font-size: 20px;
	}

	/* executions */
	.execs {
		display: grid;
		gap: clamp(56px, 8vw, 96px);
	}
	.exec {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
		gap: clamp(24px, 5vw, 72px);
		align-items: center;
	}
	.exec:nth-child(even) .exec__text {
		order: 2;
	}
	.exec__text {
		display: grid;
		gap: 12px;
		max-width: 40ch;
	}
	.exec__text h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(26px, 3vw, 36px);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.exec__text p {
		color: var(--ink-2);
		font-size: 18px;
	}
	.exec__media {
		display: grid;
		gap: 16px;
		justify-items: center;
	}
	.exec__media img {
		max-height: 680px;
		width: auto;
		max-width: 100%;
	}

	/* zoomable image */
	.zoom {
		position: relative;
		display: block;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		line-height: 0;
	}
	.zoom img {
		box-shadow: var(--book-shadow);
		border: 1px solid var(--rule);
		transition: transform 0.4s var(--ease);
	}
	.zoom:hover img {
		transform: translateY(-4px);
	}
	.zoom__hint {
		position: absolute;
		right: 10px;
		bottom: 10px;
		padding: 5px 9px;
		line-height: 1.4;
		background: var(--paper);
		color: var(--ink);
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}
	.zoom:hover .zoom__hint,
	.zoom:focus-visible .zoom__hint {
		opacity: 1;
		transform: none;
	}

	/* gallery */
	.gallery {
		display: grid;
		gap: clamp(16px, 2.4vw, 28px);
	}
	.gallery--row {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		align-items: start;
	}
	.gallery--grid {
		justify-items: center;
	}
	.gallery--grid img {
		max-height: 760px;
		width: auto;
	}
	.gallery figure {
		display: grid;
		gap: 12px;
	}
	.gallery--row img {
		width: 100%;
		height: auto;
	}

	/* takeaways */
	.take {
		display: grid;
		gap: 22px;
		padding: clamp(28px, 5vw, 56px);
		border: 1px solid var(--ink);
	}
	.take ol {
		display: grid;
		gap: 16px;
	}
	.take li {
		display: grid;
		grid-template-columns: 40px 1fr;
		font-family: var(--display);
		font-size: clamp(20px, 2.2vw, 26px);
		line-height: 1.3;
		letter-spacing: -0.01em;
	}
	.take .num {
		padding-top: 6px;
	}
	.credits {
		text-transform: none;
		letter-spacing: 0.02em;
		padding-top: 18px;
		border-top: 1px solid var(--rule);
	}

	/* next */
	.next {
		padding-top: clamp(72px, 10vw, 128px);
	}
	.next__link {
		display: grid;
		gap: 10px;
		padding: clamp(28px, 5vw, 56px) 0;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		text-decoration: none;
	}
	.next__title {
		font-size: clamp(44px, 8vw, 104px);
		font-weight: 700;
		line-height: 1;
	}
	.next__hook {
		color: var(--ink-2);
		font-size: 18px;
	}
	.next__link:hover .arrow {
		transform: translateX(10px);
	}

	@media (max-width: 900px) {
		.head,
		.brief-row,
		.exec {
			grid-template-columns: 1fr;
		}
		.head__book {
			order: -1;
		}
		.exec:nth-child(even) .exec__text {
			order: 0;
		}
		.prose {
			margin: 0;
		}
	}
	@media (max-width: 640px) {
		.script li {
			grid-template-columns: 32px 1fr;
		}
		.script__en {
			grid-column: 2;
		}
		.cuts {
			grid-template-columns: 1fr;
		}
		.cut--tall {
			max-width: 70%;
		}
	}
</style>
