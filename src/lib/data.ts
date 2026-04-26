// Shared types for portfolio data. The actual records live in Supabase
// (see scripts/seed.ts for the initial migration).

export interface StarMethod {
	situation: string;
	task: string;
	action: string;
	result: string;
}

export interface Experience {
	slug: string;
	title: string;
	role: string;
	duration: string;
	focus: string;
	tags: string[];
	visualStyle: 'tech-gradient' | 'minimalist' | 'playful' | 'elegant' | 'field';
	star?: StarMethod;
	isSummaryCard?: boolean;
	brandColor: string;
	logo?: string;
	coverImage?: string;
}

export type MediaBlock =
	| { kind: 'video'; src: string; poster?: string; caption?: string }
	| { kind: 'image'; src: string; alt: string; caption?: string }
	| { kind: 'gallery'; images: { src: string; alt: string }[]; caption?: string };

export interface CaseProject {
	slug: string;
	title: string;
	category: string;
	year?: string;
	tags: string[];
	brandColor: string;
	description: string;
	preview:
		| { kind: 'video'; src: string; poster?: string }
		| { kind: 'image'; src: string; alt: string };
	media: MediaBlock[];
}

export interface TimelineEvent {
	year: string;
	title: string;
	description: string;
}

export interface Skill {
	name: string;
	category: 'analytics' | 'marketing' | 'communication' | 'technical';
}
