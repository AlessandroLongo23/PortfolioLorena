import { fail } from '@sveltejs/kit';
import { skillSchema } from '$lib/schemas/skill';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('skills')
		.select('id, name, category, sort_order')
		.order('sort_order', { ascending: true });

	if (error) {
		console.error(error);
		return { skills: [] };
	}
	return { skills: data };
};

export const actions: Actions = {
	create: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const parsed = skillSchema.safeParse({
			name: String(formData.get('name') ?? '').trim(),
			category: String(formData.get('category') ?? ''),
			sort_order: Number(formData.get('sort_order') ?? 0)
		});

		if (!parsed.success) {
			return fail(400, { errors: parsed.error.flatten().fieldErrors, intent: 'create' });
		}

		const { error } = await supabase.from('skills').insert(parsed.data);
		if (error) {
			const msg = error.message.includes('duplicate')
				? 'Esiste già una competenza con questo nome.'
				: error.message;
			return fail(400, { errors: { name: [msg] }, intent: 'create' });
		}
		return { success: true, intent: 'create' };
	},

	update: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		const parsed = skillSchema.safeParse({
			name: String(formData.get('name') ?? '').trim(),
			category: String(formData.get('category') ?? ''),
			sort_order: Number(formData.get('sort_order') ?? 0)
		});

		if (!parsed.success || !id) {
			return fail(400, { errors: parsed.success ? {} : parsed.error.flatten().fieldErrors, id, intent: 'update' });
		}

		const { error } = await supabase.from('skills').update(parsed.data).eq('id', id);
		if (error) return fail(400, { errors: { name: [error.message] }, id, intent: 'update' });
		return { success: true, intent: 'update', id };
	},

	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		if (!id) return fail(400, { errors: { name: ['ID mancante.'] }, intent: 'delete' });

		const { error } = await supabase.from('skills').delete().eq('id', id);
		if (error) return fail(400, { errors: { name: [error.message] }, id, intent: 'delete' });
		return { success: true, intent: 'delete' };
	}
};
