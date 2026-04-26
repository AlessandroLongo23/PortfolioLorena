import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const [experiences, projects, skills, timeline] = await Promise.all([
		supabase.from('experiences').select('*', { count: 'exact', head: true }),
		supabase.from('case_projects').select('*', { count: 'exact', head: true }),
		supabase.from('skills').select('*', { count: 'exact', head: true }),
		supabase.from('timeline_events').select('*', { count: 'exact', head: true })
	]);

	return {
		counts: {
			experiences: experiences.count ?? 0,
			projects: projects.count ?? 0,
			skills: skills.count ?? 0,
			timeline: timeline.count ?? 0
		}
	};
};
