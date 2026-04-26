import { redirect } from '@sveltejs/kit';
import { ADMIN_EMAIL } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { user }, url }) => {
	// Allow login page through unauthenticated
	if (url.pathname === '/admin/login') {
		if (user && ADMIN_EMAIL && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
			throw redirect(303, '/admin');
		}
		return { user: null };
	}

	if (!user || !ADMIN_EMAIL || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
		throw redirect(303, '/admin/login');
	}

	return { user };
};
