<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { cvPath } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';

	const c = $derived(i18n.c);
	const a = $derived(c.ui.about);
</script>

<Seo title={a.label} description={c.ui.meta.about} />

<section class="wrap hero">
	<figure class="photo">
		<img src="/media/about/portrait-alt.jpg" alt={a.photoAlt} width="1200" height="1628" />
	</figure>
	<div class="text">
		<p class="slug label">{a.label}</p>
		<h1 class="display title">{a.title}</h1>
		<div class="bio">
			{#each a.bio as para, i (i)}<p>{para}</p>{/each}
		</div>
		<div class="cta">
			<a class="btn" href="mailto:{c.site.email}?subject={encodeURIComponent(c.ui.footer.subject)}"
				>{c.ui.footer.write} <span class="arrow" aria-hidden="true">→</span></a
			>
			<a class="btn btn--ghost" href={cvPath} target="_blank" rel="noopener" title={c.ui.cv.title}
				>{c.ui.cv.view} <span class="arrow" aria-hidden="true">↗</span></a
			>
			<a class="btn btn--ghost" href={cvPath} download="Lorena_Trapanese_CV.pdf"
				>{c.ui.cv.download} <span aria-hidden="true">↓</span></a
			>
			<a class="btn btn--ghost" href={c.site.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
		</div>
	</div>
</section>

<section class="wrap block">
	<div class="section-head"><h2>{a.how}</h2></div>
	<ol class="principles" role="list">
		{#each c.principles as p, i (p.title)}
			<li use:reveal={i * 0.06}>
				<span class="num">0{i + 1}</span>
				<h3>{p.title}</h3>
				<p>{p.text}</p>
			</li>
		{/each}
	</ol>
</section>

<section id="timeline" class="wrap block">
	<div class="section-head"><h2>{a.timeline}</h2><span class="slug">{a.timelineNote}</span></div>
	<ol class="timeline" role="list">
		{#each c.experience as x (x.slug)}
			<li use:reveal>
				<span class="slug when">{x.when}</span>
				<div>
					<h3>
						{#if x.page}
							<a href={i18n.href(`/experience/${x.slug}`)}>{x.role}, <span>{x.org}</span> <span class="arrow" aria-hidden="true">→</span></a>
						{:else}
							{x.role}, <span>{x.org}</span>
						{/if}
					</h3>
					<p class="note">{x.orgNote}</p>
					<p>{x.summary}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<section class="wrap block facts">
	<div use:reveal>
		<div class="section-head"><h2>{a.education}</h2></div>
		<ul role="list" class="list">
			{#each c.education as e (e.degree)}
				<li><strong>{e.degree}</strong><span>{e.school}</span><span class="slug">{e.when}</span></li>
			{/each}
		</ul>
	</div>
	<div use:reveal={0.06}>
		<div class="section-head"><h2>{a.languages}</h2></div>
		<ul role="list" class="list">
			{#each c.languages as l (l.name)}
				<li><strong>{l.name}</strong><span>{l.level}</span></li>
			{/each}
		</ul>
	</div>
</section>

<section class="wrap block">
	<div class="section-head"><h2>{a.toolkit}</h2></div>
	<div class="kit">
		{#each c.toolkit as g, i (g.head)}
			<div use:reveal={i * 0.06}>
				<p class="slug label">{g.head}</p>
				<ul role="list">
					{#each g.items as it (it)}<li>{it}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	.label {
		color: var(--accent);
	}
	.num {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 500;
		color: var(--accent);
	}
	.hero {
		display: grid;
		grid-template-columns: minmax(240px, 420px) 1fr;
		gap: clamp(32px, 6vw, 88px);
		align-items: end;
		padding-top: clamp(40px, 7vw, 88px);
	}
	.photo {
		position: relative;
		animation: rise 0.9s var(--ease) 0.1s backwards;
	}
	.photo::before {
		content: '';
		position: absolute;
		inset: 16px 16px -14px -14px;
		border: 1px solid var(--accent-dim);
	}
	.photo img {
		position: relative;
		width: 100%;
		height: auto;
	}
	.title {
		font-size: clamp(36px, 5.4vw, 68px);
		max-width: 15ch;
		margin: 16px 0 28px;
		animation: rise 0.7s var(--ease) 0.08s backwards;
	}
	.bio {
		display: grid;
		gap: 16px;
		max-width: 56ch;
		font-size: 18px;
		color: var(--ink-2);
		margin-bottom: 32px;
		animation: rise 0.7s var(--ease) 0.16s backwards;
	}
	.bio p:first-child {
		color: var(--ink);
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.block {
		padding-top: clamp(72px, 10vw, 120px);
	}
	.principles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(20px, 3vw, 40px);
	}
	.principles li {
		display: grid;
		align-content: start;
		gap: 10px;
	}
	.principles h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(24px, 2.6vw, 30px);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.principles p {
		color: var(--ink-2);
	}
	.timeline li {
		display: grid;
		grid-template-columns: 170px 1fr;
		gap: 8px 32px;
		padding: 26px 0;
		border-bottom: 1px solid var(--rule);
	}
	.timeline li:first-child {
		padding-top: 0;
	}
	.when {
		padding-top: 6px;
	}
	.timeline h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(20px, 2.2vw, 24px);
		letter-spacing: -0.012em;
		line-height: 1.25;
	}
	.timeline h3 a {
		text-decoration: none;
	}
	.timeline h3 span:not(.arrow) {
		color: var(--accent);
	}
	.timeline .arrow {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 16px;
	}
	.note {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--ink-3);
		margin: 4px 0 10px;
	}
	.timeline p:not(.note) {
		color: var(--ink-2);
		max-width: var(--measure);
	}
	.facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(28px, 5vw, 64px);
	}
	.list li {
		display: grid;
		gap: 2px;
		padding: 14px 0;
		border-bottom: 1px solid var(--rule);
	}
	.list li:first-child {
		padding-top: 0;
	}
	.list strong {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(15px, 4.2vw, 20px);
		letter-spacing: -0.01em;
	}
	.list span:not(.slug) {
		color: var(--ink-2);
	}
	.kit {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(20px, 3vw, 40px);
	}
	.kit ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 14px;
	}
	.kit li {
		font-family: var(--mono);
		font-size: 12px;
		padding: 5px 10px;
		border: 1px solid var(--rule);
		color: var(--ink-2);
	}
	@media (max-width: 900px) {
		.principles,
		.kit {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 900px) {
		.facts {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 760px) {
		.hero,
		.facts {
			grid-template-columns: 1fr;
		}
		.photo {
			max-width: 280px;
		}
		.timeline li {
			grid-template-columns: 1fr;
		}
	}
</style>
