import { error, redirect } from '@sveltejs/kit';
import { en } from '$lib/content/en';
import { getContent, localeFromPath, localize } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

// Slugs from the previous site that no longer have their own page.
const legacy = ['sapiens', 'field-experience'];

export const entries: EntryGenerator = () =>
	[...en.experience.filter((x) => x.page).map((x) => x.slug), ...legacy].flatMap((slug) => [
		{ slug },
		{ lang: 'it', slug }
	]);

export const load: PageLoad = ({ params, url }) => {
	const locale = localeFromPath(url.pathname);
	if (legacy.includes(params.slug)) redirect(308, localize('/about', locale));
	const { experience, projects } = getContent(locale);
	const pages = experience.filter((e) => e.page);
	const i = pages.findIndex((e) => e.slug === params.slug);
	if (i === -1) error(404, 'Not found');
	const x = pages[i];
	return {
		x,
		related: x.related ? projects.find((p) => p.slug === x.related) : undefined,
		next: pages[(i + 1) % pages.length]
	};
};
