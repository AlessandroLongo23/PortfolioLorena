import { error } from '@sveltejs/kit';
import { getCaseProjectBySlug } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getCaseProjectBySlug(params.slug);

	if (!project) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	return {
		project
	};
};
