import type { CaseProject, Experience, MediaBlock, Skill, TimelineEvent } from '$lib/data';

type ExperienceRow = {
	slug: string;
	title: string;
	role: string;
	duration: string;
	focus: string;
	tags: string[];
	visual_style: Experience['visualStyle'];
	brand_color: string;
	logo_path: string | null;
	cover_image_path: string | null;
	is_summary_card: boolean;
	star: Experience['star'] | null;
};

type CaseProjectRow = {
	slug: string;
	title: string;
	category: string;
	year: string | null;
	tags: string[];
	brand_color: string;
	description: string;
	preview: CaseProject['preview'];
	media: MediaBlock[];
};

type SkillRow = { name: string; category: Skill['category'] };
type TimelineRow = { year: string; title: string; description: string };

export function mapExperience(row: ExperienceRow): Experience {
	return {
		slug: row.slug,
		title: row.title,
		role: row.role,
		duration: row.duration,
		focus: row.focus,
		tags: row.tags ?? [],
		visualStyle: row.visual_style,
		brandColor: row.brand_color,
		logo: row.logo_path ?? undefined,
		coverImage: row.cover_image_path ?? undefined,
		isSummaryCard: row.is_summary_card,
		star: row.star ?? undefined
	};
}

export function mapCaseProject(row: CaseProjectRow): CaseProject {
	return {
		slug: row.slug,
		title: row.title,
		category: row.category,
		year: row.year ?? undefined,
		tags: row.tags ?? [],
		brandColor: row.brand_color,
		description: row.description,
		preview: row.preview,
		media: row.media ?? []
	};
}

export function mapSkill(row: SkillRow): Skill {
	return { name: row.name, category: row.category };
}

export function mapTimelineEvent(row: TimelineRow): TimelineEvent {
	return { year: row.year, title: row.title, description: row.description };
}
