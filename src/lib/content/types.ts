// Shapes shared by every language file.

export type Stat = { value: string; label: string; href?: string };

export type Media =
	| { kind: 'image'; src: string; alt: string; caption?: string; ratio?: string }
	| { kind: 'video'; src: string; poster: string; caption?: string; ratio: string };

export type Section =
	| { kind: 'text'; label: string; title: string; body: string[] }
	| { kind: 'script'; label: string; title: string; intro?: string; lines: { it: string; en: string }[] }
	| { kind: 'cuts'; label: string; title: string; intro?: string; items: (Media & { name: string; spec: string })[] }
	| { kind: 'executions'; label: string; title: string; items: { name: string; text: string; media: Media[] }[] }
	| { kind: 'gallery'; label: string; title: string; intro?: string; items: Media[]; layout?: 'row' | 'grid' }
	| { kind: 'pages'; label: string; title: string; intro?: string; pages: { src: string; title: string }[] }
	| { kind: 'quote'; text: string; note?: string };

export type Project = {
	slug: string;
	title: string;
	client: string;
	kind: string;
	year: string;
	hook: string;
	summary: string;
	accent: string;
	cover: Media;
	preview?: { src: string; poster: string };
	brief: { get: string; who: string; to: string; by: string };
	facts: { label: string; value: string }[];
	credits: string;
	takeaways: string[];
	sections: Section[];
};

export type Experience = {
	slug: string;
	role: string;
	org: string;
	orgNote: string;
	when: string;
	headline: string;
	summary: string;
	image?: { src: string; alt: string };
	highlights: { value: string; label: string }[];
	did: { title: string; text: string }[];
	lesson?: string;
	skills: string[];
	related?: string;
	page: boolean;
};
