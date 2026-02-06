// Types for Portfolio Data

export interface StarMethod {
	situation: string;
	task: string;
	action: string;
	result: string;
}

export interface Project {
	slug: string;
	title: string;
	role: string;
	duration: string;
	focus: string;
	tags: string[];
	visualStyle: 'tech-gradient' | 'minimalist' | 'playful' | 'elegant' | 'field';
	star?: StarMethod;
	isSummaryCard?: boolean;
	// Brand styling
	brandColor: string; // Hex color for hover state
	// Images - paths relative to /static folder
	logo?: string; // e.g., '/images/logos/sapiens.svg'
	coverImage?: string; // e.g., '/images/projects/sapiens-cover.png' - shown in large cards
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

// Projects Data
export const projects: Project[] = [
	{
		slug: 'sapiens',
		title: 'Sapiens',
		role: 'Co-founder & Product Marketing',
		duration: '2025 - Present',
		focus: 'STEM education for Italian students',
		tags: ['EdTech', 'Product Marketing', 'Growth Strategy', 'B2C'],
		visualStyle: 'tech-gradient',
		brandColor: '#e94a69',
		logo: '/images/logos/sapiens.png',
		coverImage: '/images/projects/sapiens-cover.png',
		star: {
			situation:
				'The Italian education system lacks accessible, engaging STEM resources for high school and university students. Many struggle with complex subjects due to outdated teaching methods and limited digital tools.',
			task: 'As co-founder, I was tasked with defining the product positioning, building the initial user acquisition strategy, and establishing a brand that resonates with Gen-Z students while maintaining academic credibility.',
			action:
				'Conducted extensive user research through surveys and focus groups with 200+ students. Developed a content marketing strategy leveraging TikTok and Instagram Reels for educational content. Implemented a referral program with gamification elements. Built partnerships with university student associations for organic growth.',
			result:
				'Achieved 150% user growth within 6 months. Built a community of 5,000+ active learners. Secured partnerships with 12 university associations. Content reached 500K+ views across social platforms with an average engagement rate of 8.5%.'
		}
	},
	{
		slug: 'tedx-cortina',
		title: 'TEDx Cortina',
		role: 'Events & Communication Team',
		duration: '2025 - Present',
		focus: 'PR, Event management, Community building',
		tags: ['Event Management', 'PR', 'Community Building', 'Public Speaking'],
		visualStyle: 'minimalist',
		brandColor: '#eb0028',
		logo: '/images/logos/ted.png',
		coverImage: '/images/projects/tedx-cortina-cover.png',
		star: {
			situation:
				'TEDx Cortina needed to expand its reach beyond the local mountain community while maintaining the intimate, high-quality experience that defined the event. Budget constraints required creative solutions for marketing and logistics.',
			task: 'At TEDxCortina 2025, I lead the storytelling strategy for Sustainability. My mission? To strip away the \'heaviness\' of technical discourse and replace it with emotional connection. By transforming expert insights into punchy, relatable \'social pills,\' I bridge the gap between scientific complexity and everyday action. I don’t just write copy; I build the narrative bridge that makes global issues feel local and person.',
			action:
				'Created a multi-channel communication plan targeting both local and national audiences. Secured media partnerships with regional newspapers and podcasts. Developed a volunteer training program focusing on hospitality excellence. Implemented a digital ticketing system with personalized attendee journeys.',
			result:
				'Currently planning the upcoming event for August 2026.'
		}
	},
	{
		slug: 'unipiazza',
		title: 'Unipiazza',
		role: 'Digital Marketing Intern',
		duration: '2025 - 2026',
		focus: 'Loyalty programs, Gamification, Customer retention',
		tags: ['Digital Marketing', 'Gamification', 'CRM', 'Data Analysis'],
		visualStyle: 'playful',
		brandColor: '#f97316',
		logo: '/images/logos/unipiazza.png',
		coverImage: '/images/projects/unipiazza-cover.png',
		star: {
			situation:
				'Unipiazza, a startup focused on loyalty solutions for local businesses, was struggling with user engagement and retention. The existing loyalty program had low adoption rates among end-users.',
			task: 'Tasked with analyzing user behavior data, identifying drop-off points in the customer journey, and proposing engagement strategies to improve retention metrics.',
			action:
				'Conducted cohort analysis to identify user segments and their behavior patterns. Designed A/B tests for push notification strategies. Proposed gamification elements including achievement badges, streaks, and tiered rewards. Created targeted email campaigns based on user lifecycle stage.',
			result:
				'Improved customer retention rate by 35%. Increased daily active users by 28%. Gamification features drove a 45% increase in repeat transactions. Email campaigns achieved a 42% open rate, significantly above industry average.'
		}
	},
	{
		slug: 'il-bronzetto',
		title: 'Il Bronzetto',
		role: 'Heritage & Craftsmanship Marketing',
		duration: '2023 - 2024',
		focus: 'Made in Italy, Luxury market, Traditional marketing',
		tags: ['Luxury Marketing', 'Brand Heritage', 'Made in Italy', 'B2B'],
		visualStyle: 'elegant',
		brandColor: '#a16207',
		logo: '/images/logos/il-bronzetto.png',
		coverImage: '/images/projects/il-bronzetto-cover.png',
		star: {
			situation:
				'Il Bronzetto, a traditional Italian bronze artisan workshop, wanted to expand beyond the local market while preserving its artisanal identity. The challenge was translating centuries-old craftsmanship into a compelling modern brand story.',
			task: 'Develop a brand narrative that honors tradition while appealing to contemporary luxury buyers. Create marketing materials for international trade shows and establish digital presence.',
			action:
				'Conducted brand archaeology research, documenting the workshop\'s 50-year history. Developed storytelling content featuring artisan interviews and behind-the-scenes craftsmanship videos. Created bilingual marketing collateral for international exhibitions. Established relationships with interior design publications.',
			result:
				'Successfully positioned the brand for international expansion. Secured features in 3 prestigious design publications. Developed a catalog that led to partnerships with 5 international distributors.'
		}
	},
	{
		slug: 'field-experience',
		title: 'Field Experience',
		role: 'Hostess, Promoter & Sales',
		duration: '2021 - Present',
		focus: 'Direct sales psychology, Customer relations, Problem-solving',
		tags: ['Direct Sales', 'Customer Service', 'Event Staffing', 'Negotiation'],
		visualStyle: 'field',
		brandColor: '#71717a',
		isSummaryCard: true
	}
];

// Skills / Toolkit Data
export const skills: Skill[] = [
	{ name: 'SWOT Analysis', category: 'analytics' },
	{ name: 'Market Research', category: 'analytics' },
	{ name: 'Google Analytics', category: 'technical' },
	{ name: 'Data Visualization', category: 'analytics' },
	{ name: 'SEO/SEM', category: 'marketing' },
	{ name: 'Content Strategy', category: 'marketing' },
	{ name: 'Social Media Marketing', category: 'marketing' },
	{ name: 'Email Marketing', category: 'marketing' },
	{ name: 'Public Speaking', category: 'communication' },
	{ name: 'Copywriting', category: 'communication' },
	{ name: 'Brand Strategy', category: 'marketing' },
	{ name: 'CRM Systems', category: 'technical' },
	{ name: 'A/B Testing', category: 'analytics' },
	{ name: 'Project Management', category: 'communication' },
	{ name: 'Stakeholder Management', category: 'communication' }
];

// Timeline Data for About Page
export const timeline: TimelineEvent[] = [
	{
		year: '2018',
		title: 'First Steps in the Field',
		description:
			'Started working as a hostess and promoter, learning the fundamentals of customer interaction, sales psychology, and thinking on my feet.'
	},
	{
		year: '2019',
		title: 'University Begins',
		description:
			'Enrolled in Marketing and Communication studies, combining academic theory with real-world experience from field work.'
	},
	{
		year: '2020',
		title: 'Heritage Marketing',
		description:
			'Joined Il Bronzetto to help bring traditional Italian craftsmanship to international markets, discovering a passion for brand storytelling.'
	},
	{
		year: '2021',
		title: 'Startup World',
		description:
			'Digital marketing internship at Unipiazza introduced me to data-driven marketing, gamification, and the fast-paced startup environment.'
	},
	{
		year: '2022',
		title: 'TEDx Experience',
		description:
			'Joined the TEDx Cortina team, gaining invaluable experience in event management, PR, and community building.'
	},
	{
		year: '2023',
		title: 'Co-founding Sapiens',
		description:
			'Took the leap to co-found an EdTech platform, applying all accumulated knowledge to build something meaningful for Italian students.'
	}
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

// Get projects for Bento grid (excluding field experience for separate treatment)
export function getBentoProjects(): Project[] {
	return projects.filter((p) => !p.isSummaryCard);
}

// Get field experience card
export function getFieldExperience(): Project | undefined {
	return projects.find((p) => p.isSummaryCard);
}
