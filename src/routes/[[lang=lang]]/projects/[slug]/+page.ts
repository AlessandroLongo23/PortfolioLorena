import { redirect } from '@sveltejs/kit';
import { localeFromPath, localize } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

// Old URLs from the previous site.
export const entries: EntryGenerator = () => [{ slug: 'teaser-campaign' }, { lang: 'it', slug: 'teaser-campaign' }];

export const load: PageLoad = ({ url }) => {
	redirect(308, localize('/work/glow-tedxcortina', localeFromPath(url.pathname)));
};
