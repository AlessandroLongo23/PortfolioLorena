import { error } from '@sveltejs/kit';
import { mapTimelineEvent } from '$lib/server/mappers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error: dbError } = await supabase
		.from('timeline_events')
		.select('*')
		.order('sort_order', { ascending: true });

	if (dbError) {
		console.error(dbError);
		throw error(500, 'Errore nel caricamento della timeline.');
	}

	return { timeline: data.map(mapTimelineEvent) };
};
