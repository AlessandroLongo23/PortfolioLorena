import { fail, redirect } from '@sveltejs/kit';
import { parseCaseProjectForm } from '$lib/server/parsers';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const parsed = parseCaseProjectForm(formData);

		if (!parsed.success) {
			return fail(400, {
				errors: parsed.error.flatten().fieldErrors,
				values: Object.fromEntries(formData)
			});
		}

		const { data: maxRow } = await supabase
			.from('case_projects')
			.select('sort_order')
			.order('sort_order', { ascending: false })
			.limit(1)
			.maybeSingle();
		const nextOrder = (maxRow?.sort_order ?? -1) + 1;

		const { error } = await supabase.from('case_projects').insert({
			...parsed.data,
			sort_order: nextOrder
		});

		if (error) {
			const errors: Record<string, string[]> =
				error.code === '23505'
					? { slug: ['Esiste già un progetto con questo slug.'] }
					: { _global: [error.message] };
			return fail(400, { errors, values: Object.fromEntries(formData) });
		}

		throw redirect(303, '/admin/projects');
	}
};
