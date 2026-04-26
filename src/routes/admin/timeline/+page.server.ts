import { fail } from '@sveltejs/kit';
import { timelineEventSchema } from '$lib/schemas/timeline';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('timeline_events')
		.select('id, year, title, description, sort_order')
		.order('sort_order', { ascending: true });

	if (error) {
		console.error(error);
		return { events: [] };
	}
	return { events: data };
};

function parseEvent(formData: FormData) {
	return timelineEventSchema.safeParse({
		year: String(formData.get('year') ?? '').trim(),
		title: String(formData.get('title') ?? '').trim(),
		description: String(formData.get('description') ?? '').trim(),
		sort_order: Number(formData.get('sort_order') ?? 0)
	});
}

export const actions: Actions = {
	create: async ({ request, locals: { supabase } }) => {
		const parsed = parseEvent(await request.formData());
		if (!parsed.success) return fail(400, { errors: parsed.error.flatten().fieldErrors, intent: 'create' });

		const { error } = await supabase.from('timeline_events').insert(parsed.data);
		if (error) return fail(400, { errors: { title: [error.message] }, intent: 'create' });
		return { success: true, intent: 'create' };
	},

	update: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		const parsed = parseEvent(formData);
		if (!id || !parsed.success) {
			return fail(400, { errors: parsed.success ? {} : parsed.error.flatten().fieldErrors, id, intent: 'update' });
		}

		const { error } = await supabase.from('timeline_events').update(parsed.data).eq('id', id);
		if (error) return fail(400, { errors: { title: [error.message] }, id, intent: 'update' });
		return { success: true, intent: 'update', id };
	},

	delete: async ({ request, locals: { supabase } }) => {
		const id = String((await request.formData()).get('id') ?? '');
		if (!id) return fail(400, { intent: 'delete' });

		const { error } = await supabase.from('timeline_events').delete().eq('id', id);
		if (error) return fail(400, { errors: { title: [error.message] }, intent: 'delete' });
		return { success: true, intent: 'delete' };
	}
};
