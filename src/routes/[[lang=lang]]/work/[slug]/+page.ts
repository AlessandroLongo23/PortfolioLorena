import { error } from '@sveltejs/kit';
import { en } from '$lib/content/en';
import { getContent, localeFromPath } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	en.projects.flatMap((p) => [{ slug: p.slug }, { lang: 'it', slug: p.slug }]);

export const load: PageLoad = ({ params, url }) => {
	const { projects } = getContent(localeFromPath(url.pathname));
	const i = projects.findIndex((p) => p.slug === params.slug);
	if (i === -1) error(404, 'Not found');
	return { project: projects[i], index: i, next: projects[(i + 1) % projects.length] };
};
