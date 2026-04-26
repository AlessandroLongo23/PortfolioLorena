import { fail, redirect } from '@sveltejs/kit';
import { ADMIN_EMAIL } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Inserisci email e password.', email });
		}

		if (!ADMIN_EMAIL || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
			return fail(403, { error: 'Accesso non consentito per questo account.', email });
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(400, { error: 'Credenziali non valide.', email });
		}

		throw redirect(303, '/admin');
	}
};
