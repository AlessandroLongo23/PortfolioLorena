import { error } from '@sveltejs/kit';
import { mapExperience } from '$lib/server/mappers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: dbError } = await supabase
		.from('experiences')
		.select('*')
		.eq('slug', params.slug)
		.maybeSingle();

	if (dbError) {
		console.error(dbError);
		throw error(500, 'Errore nel caricamento dell’esperienza.');
	}

	if (!data || data.is_summary_card) {
		throw error(404, 'Esperienza non trovata.');
	}

	return { experience: mapExperience(data) };
};
