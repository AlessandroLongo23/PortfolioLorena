import { error } from '@sveltejs/kit';
import { getExperienceBySlug } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const experience = getExperienceBySlug(params.slug);

	if (!experience) {
		throw error(404, {
			message: 'Experience not found'
		});
	}

	// Field experience shouldn't have a detail page
	if (experience.isSummaryCard) {
		throw error(404, {
			message: 'Experience not found'
		});
	}

	return {
		experience
	};
};
