import { error } from '@sveltejs/kit';
import { mapCaseProject, mapExperience, mapSkill } from '$lib/server/mappers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const [experiencesRes, projectsRes, skillsRes] = await Promise.all([
		supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
		supabase.from('case_projects').select('*').order('sort_order', { ascending: true }),
		supabase.from('skills').select('*').order('sort_order', { ascending: true })
	]);

	if (experiencesRes.error || projectsRes.error || skillsRes.error) {
		console.error(experiencesRes.error ?? projectsRes.error ?? skillsRes.error);
		throw error(500, 'Errore nel caricamento dei contenuti.');
	}

	return {
		experiences: experiencesRes.data.map(mapExperience),
		caseProjects: projectsRes.data.map(mapCaseProject),
		skills: skillsRes.data.map(mapSkill)
	};
};
