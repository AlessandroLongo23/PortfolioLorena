import { error } from '@sveltejs/kit';
import { mapCaseProject } from '$lib/server/mappers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: dbError } = await supabase
		.from('case_projects')
		.select('*')
		.eq('slug', params.slug)
		.maybeSingle();

	if (dbError) {
		console.error(dbError);
		throw error(500, 'Errore nel caricamento del progetto.');
	}

	if (!data) {
		throw error(404, 'Progetto non trovato.');
	}

	return { project: mapCaseProject(data) };
};
