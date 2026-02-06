import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	// Field experience shouldn't have a detail page
	if (project.isSummaryCard) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	return {
		project
	};
};
