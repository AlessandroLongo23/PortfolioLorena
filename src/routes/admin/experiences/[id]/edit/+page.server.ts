import { error, fail, redirect } from '@sveltejs/kit';
import { parseExperienceForm } from '$lib/server/parsers';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data, error: dbError } = await supabase
		.from('experiences')
		.select('*')
		.eq('id', params.id)
		.maybeSingle();

	if (dbError) {
		console.error(dbError);
		throw error(500, 'Errore nel caricamento dell’esperienza.');
	}
	if (!data) throw error(404, 'Esperienza non trovata.');

	return { experience: data };
};

export const actions: Actions = {
	update: async ({ params, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const parsed = parseExperienceForm(formData);

		if (!parsed.success) {
			return fail(400, {
				errors: parsed.error.flatten().fieldErrors,
				values: Object.fromEntries(formData)
			});
		}

		// Don't overwrite sort_order on update — it's managed by the reorder action.
		const { sort_order: _ignored, ...payload } = parsed.data;
		const { error: dbError } = await supabase
			.from('experiences')
			.update(payload)
			.eq('id', params.id);

		if (dbError) {
			const errors: Record<string, string[]> =
				dbError.code === '23505'
					? { slug: ['Esiste già un’esperienza con questo slug.'] }
					: { _global: [dbError.message] };
			return fail(400, { errors, values: Object.fromEntries(formData) });
		}

		throw redirect(303, '/admin/experiences');
	},

	delete: async ({ params, locals: { supabase } }) => {
		const { error: dbError } = await supabase
			.from('experiences')
			.delete()
			.eq('id', params.id);
		if (dbError) return fail(400, { error: dbError.message });
		throw redirect(303, '/admin/experiences');
	}
};
