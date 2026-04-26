import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('experiences')
		.select('id, slug, title, role, duration, sort_order, is_summary_card')
		.order('sort_order', { ascending: true });

	if (error) {
		console.error(error);
		return { experiences: [] };
	}
	return { experiences: data };
};

export const actions: Actions = {
	delete: async ({ request, locals: { supabase } }) => {
		const id = String((await request.formData()).get('id') ?? '');
		if (!id) return fail(400, { error: 'ID mancante.' });

		const { error } = await supabase.from('experiences').delete().eq('id', id);
		if (error) return fail(400, { error: error.message });
		return { success: true };
	},

	reorder: async ({ request, locals: { supabase } }) => {
		const raw = String((await request.formData()).get('order') ?? '');
		let ids: string[];
		try {
			ids = JSON.parse(raw);
		} catch {
			return fail(400, { error: 'Ordine non valido.' });
		}
		if (!Array.isArray(ids) || ids.some((v) => typeof v !== 'string')) {
			return fail(400, { error: 'Ordine non valido.' });
		}

		const results = await Promise.all(
			ids.map((id, index) =>
				supabase.from('experiences').update({ sort_order: index }).eq('id', id)
			)
		);
		const failed = results.find((r) => r.error);
		if (failed?.error) return fail(400, { error: failed.error.message });

		return { success: true };
	}
};
