import type { Handle } from '@sveltejs/kit';
import { localeFromPath } from '$lib/content';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', localeFromPath(event.url.pathname))
	});
