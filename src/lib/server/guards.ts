import { redirect } from '@sveltejs/kit';
import { ADMIN_EMAIL } from '$env/static/private';

export function requireAdmin(user: { email?: string | null } | null) {
	if (!user || !ADMIN_EMAIL || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
		throw redirect(303, '/admin/login');
	}
}
