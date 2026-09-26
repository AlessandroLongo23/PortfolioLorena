import { redirect } from '@sveltejs/kit';
import { cvPath } from '$lib/content';

// The previous site linked its CV here.
export const prerender = false;

export const GET = () => redirect(308, cvPath);
