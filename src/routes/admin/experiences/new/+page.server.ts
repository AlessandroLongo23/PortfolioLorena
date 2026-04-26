import { fail, redirect } from '@sveltejs/kit';
import { parseExperienceForm } from '$lib/server/parsers';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const parsed = parseExperienceForm(formData);

		if (!parsed.success) {
			return fail(400, { errors: parsed.error.flatten().fieldErrors, values: Object.fromEntries(formData) });
		}

		// next sort_order = max + 1
		const { data: maxRow } = await supabase
			.from('experiences')
			.select('sort_order')
			.order('sort_order', { ascending: false })
			.limit(1)
			.maybeSingle();
		const nextOrder = (maxRow?.sort_order ?? -1) + 1;

		const { error } = await supabase.from('experiences').insert({
			...parsed.data,
			sort_order: nextOrder
		});

		if (error) {
			const errors: Record<string, string[]> =
				error.code === '23505'
					? { slug: ['Esiste già un’esperienza con questo slug.'] }
					: { _global: [error.message] };
			return fail(400, { errors, values: Object.fromEntries(formData) });
		}

		throw redirect(303, '/admin/experiences');
	}
};
