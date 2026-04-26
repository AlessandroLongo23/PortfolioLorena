import { error, fail, redirect } from '@sveltejs/kit';
import { parseCaseProjectForm } from '$lib/server/parsers';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: dbError } = await supabase
		.from('case_projects')
		.select('*')
		.eq('id', params.id)
		.maybeSingle();

	if (dbError) {
		console.error(dbError);
		throw error(500, 'Errore nel caricamento del progetto.');
	}
	if (!data) throw error(404, 'Progetto non trovato.');

	return { project: data };
};

export const actions: Actions = {
	update: async ({ params, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const parsed = parseCaseProjectForm(formData);

		if (!parsed.success) {
			return fail(400, {
				errors: parsed.error.flatten().fieldErrors,
				values: Object.fromEntries(formData)
			});
		}

		const { sort_order: _ignored, ...payload } = parsed.data;
		const { error: dbError } = await supabase
			.from('case_projects')
			.update(payload)
			.eq('id', params.id);

		if (dbError) {
			const errors: Record<string, string[]> =
				dbError.code === '23505'
					? { slug: ['Esiste già un progetto con questo slug.'] }
					: { _global: [dbError.message] };
			return fail(400, { errors, values: Object.fromEntries(formData) });
		}

		throw redirect(303, '/admin/projects');
	},

	delete: async ({ params, locals: { supabase } }) => {
		const { error: dbError } = await supabase
			.from('case_projects')
			.delete()
			.eq('id', params.id);
		if (dbError) return fail(400, { error: dbError.message });
		throw redirect(303, '/admin/projects');
	}
};
