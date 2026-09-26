// English copy. Facts come from Lorena's own portfolio draft (Sept 2026);
// nothing in this file should be invented. Items marked TODO need her input.
// Tone: first person, plain, relaxed. No slogans, no big claims.

import type { Experience, Project, Stat } from './types';

const site = {
	name: 'Lorena Trapanese',
	role: 'Copywriter & content strategist',
	status: 'Copenhagen from October 2026',
	languages: 'Italian & English',
	email: 'trapaneselorena01@gmail.com',
	linkedin: 'https://www.linkedin.com/in/lorenatrapanese',
	url: 'https://portfolio-lorena-delta.vercel.app'
};

const stats: Stat[] = [
	{ value: '20+', label: 'posts and articles for TEDxCortina', href: '/experience/tedx-cortina' },
	{ value: '175', label: 'B2B leads found and qualified in two months', href: '/experience/tesi' },
	{ value: '3', label: 'channels I posted on every week at Unipiazza', href: '/experience/unipiazza' },
	{ value: '3', label: 'languages: Italian, English, Spanish', href: '/about' }
];

const services = [
	{
		name: 'Copy & editorial',
		text: 'Articles, posts and newsletters, written in the brand’s voice.',
		items: ['Editorial plans', 'Social copy', 'Newsletters', 'Tone of voice']
	},
	{
		name: 'Content strategy',
		text: 'What to post, where and how often. Then I keep the calendar going every week.',
		items: ['Calendars', 'Channel plans', 'Content audits']
	},
	{
		name: 'Campaigns & events',
		text: 'Event copy, interviews, video scripts and the messages that tie them together.',
		items: ['Event copy', 'Interviews', 'Video scripts', 'Launch copy']
	}
];

/* ---------------------------------------------------------------- work */

const projects: Project[] = [
	{
		slug: 'glow-tedxcortina',
		title: 'GLOW',
		client: 'TEDxCortina',
		kind: 'Concept & copy · Video',
		year: '2026',
		hook: 'The teaser for TEDxCortina’s tenth edition.',
		summary:
			'I came up with the concept and wrote all the text on screen. We made two versions: a short one for Instagram and a longer one for YouTube.',
		accent: '#E62B1E',
		cover: { kind: 'image', src: '/media/glow/title-card.jpg', alt: 'TEDxCortina GLOW teaser, title card with a black and white Dolomites peak' },
		preview: { src: '/media/glow/teaser-vertical.mp4', poster: '/media/glow/vertical-poster.jpg' },
		brief: {
			get: 'TEDxCortina followers',
			who: 'Event posts get skipped',
			to: 'Get people to save 21 August',
			by: 'Seven short lines that build up to the name and end with the date.'
		},
		facts: [
			{ label: 'Client', value: 'TEDxCortina' },
			{ label: 'My part', value: 'Concept, on-screen text' },
			{ label: 'Format', value: 'Video teaser, 2 versions' },
			{ label: 'Channels', value: 'Instagram, YouTube' },
			{ label: 'Event', value: '21 Aug 2026, Cortina' }
		],
		credits: 'Concept and on-screen text by me, made with the TEDxCortina comms team.',
		takeaways: [
			'The text builds up one line at a time, and the date comes last.',
			'One script, two edits: 4 seconds for Instagram, 11 for YouTube.',
			'GLOW is the name of the edition and the visual idea too.'
		],
		sections: [
			{
				kind: 'text',
				label: 'The brief',
				title: 'Announce the tenth edition.',
				body: [
					'I started the 2026 edition on the sustainability content. Then the tenth anniversary came up and the campaign became GLOW.',
					'The teaser had two jobs: tell people when and where, and make them curious enough to remember.'
				]
			},
			{
				kind: 'script',
				label: 'The script',
				title: 'Seven lines.',
				intro: 'One line at a time on screen. Put together, they make one sentence.',
				lines: [
					{ it: '10 anni', en: '10 years' },
					{ it: 'di idee', en: 'of ideas' },
					{ it: 'un unico GLOW', en: 'one single GLOW' },
					{ it: 'per illuminare', en: 'to light up' },
					{ it: 'il futuro', en: 'the future' },
					{ it: 'Ci vediamo il 21 agosto al Rifugio Col Gallina', en: 'See you on 21 August at Rifugio Col Gallina' },
					{ it: 'Stay tuned', en: 'Stay tuned' }
				]
			},
			{
				kind: 'cuts',
				label: 'Two versions',
				title: 'One for Instagram, one for YouTube.',
				intro: 'The YouTube one takes 11 seconds to get there. On Instagram you get the date and place in 4.',
				items: [
					{ kind: 'video', name: 'Vertical', spec: 'Instagram · 4 s', src: '/media/glow/teaser-vertical.mp4', poster: '/media/glow/vertical-poster.jpg', ratio: '9 / 16' },
					{ kind: 'video', name: 'Horizontal', spec: 'YouTube · 11 s', src: '/media/glow/teaser-wide.mp4', poster: '/media/glow/wide-poster.jpg', ratio: '16 / 9' }
				]
			},
			{
				kind: 'gallery',
				label: 'Frames',
				title: 'Title, reveal, end.',
				layout: 'row',
				items: [
					{ kind: 'image', src: '/media/glow/title-card.jpg', alt: 'Title card: TEDxCortina over a misty Dolomites peak', caption: 'Title card', ratio: '620 / 1102' },
					{ kind: 'image', src: '/media/glow/reveal.jpg', alt: 'Static noise with the date and venue typed in the corner', caption: 'Date and place', ratio: '620 / 1102' },
					{ kind: 'image', src: '/media/glow/end-card.jpg', alt: 'End card: TEDxCortina 10th anniversary logo on black', caption: 'End card', ratio: '620 / 1102' }
				]
			}
		]
	},
	{
		slug: 'pochi-ma-buoni',
		title: 'Pochi ma Buoni',
		client: 'University of Padova',
		kind: 'Social advertising',
		year: 'MSc', // TODO: year not given in Lorena's draft
		hook: 'A campaign against food waste, aimed at 18–24 year olds.',
		summary:
			'A press ad, two street installations and stickers for supermarket baskets, all with the same line.',
		accent: '#1F8A4C',
		cover: { kind: 'image', src: '/media/pochi-ma-buoni/press-ad.jpg', alt: 'Pochi ma Buoni press ad: an almost empty shelf holding one pack of pasta and one jar of pesto' },
		brief: {
			get: '18 to 24 year olds',
			who: 'They waste the most food',
			to: 'Buy less food, and better',
			by: 'Show up where waste starts: shelf, square, trolley.'
		},
		facts: [
			{ label: 'Context', value: 'University project' },
			{ label: 'Course', value: 'Storia della pubblicità sociale' },
			{ label: 'Audience', value: '18 to 24 year olds' },
			{ label: 'Media', value: 'Print, street, stickers' }
		],
		credits: 'Concept project for the course Storia della pubblicità sociale. The visuals are mock-ups.',
		takeaways: [
			'The message shows up while you shop, right when you decide.',
			'The name means “few but good”, so buying less sounds like a treat.',
			'Four executions, one line. Each makes the others easier to spot.'
		],
		sections: [
			{
				kind: 'text',
				label: 'The problem',
				title: 'Over a third of our food gets thrown away.',
				body: [
					'18 to 24 year olds waste the most, and they have heard plenty of talks about sustainability already.',
					'So the campaign skips the talk. It shows up in the squares and supermarkets they already go to.'
				]
			},
			{
				kind: 'quote',
				text: 'Compra meno, con maggiore consapevolezza.',
				note: '“Buy less, more consciously.” The line on every piece of the campaign.'
			},
			{
				kind: 'executions',
				label: 'The work',
				title: 'Where you’d see it.',
				items: [
					{
						name: 'Press ad',
						text: 'An almost empty shelf: pasta and a jar of pesto. Few, but good.',
						media: [{ kind: 'image', src: '/media/pochi-ma-buoni/press-ad.jpg', alt: 'Press ad with an almost empty wooden shelf', ratio: '840 / 1200' }]
					},
					{
						name: 'Street: the bins',
						text: 'Big see-through bins in the squares where students hang out, full of food that went off.',
						media: [{ kind: 'image', src: '/media/pochi-ma-buoni/bin.jpg', alt: 'A giant transparent bin overflowing with spoiled food in a city square', ratio: '548 / 722' }]
					},
					{
						name: 'Street: tiny trolleys',
						text: 'Mini trolleys next to the normal ones outside supermarkets in the city centre. A small hint to buy what you need.',
						media: [{ kind: 'image', src: '/media/pochi-ma-buoni/trolleys.jpg', alt: 'Rows of miniature shopping trolleys outside a supermarket', ratio: '578 / 772' }]
					},
					{
						name: 'Stickers',
						text: 'The line inside baskets and on trolley handles, right when you’re about to grab one more thing.',
						media: [
							{ kind: 'image', src: '/media/pochi-ma-buoni/basket.jpg', alt: 'A red shopping basket with the campaign line printed inside', ratio: '467 / 325' },
							{ kind: 'image', src: '/media/pochi-ma-buoni/handle.jpg', alt: 'A trolley handle wrapped with the campaign line', ratio: '673 / 345' }
						]
					}
				]
			},
			{
				kind: 'gallery',
				label: 'Logo',
				title: 'Stickers and badges.',
				intro: 'A few versions, so the logo fits on a basket, a bin or a shelf.',
				layout: 'grid',
				items: [{ kind: 'image', src: '/media/pochi-ma-buoni/stickers.jpg', alt: 'Eight round and star-shaped Pochi ma Buoni badges in green and cream', ratio: '660 / 1130' }]
			}
		]
	},
	{
		slug: 'streetart',
		title: 'STREETART',
		client: 'University of Padova',
		kind: 'Editorial · Zine',
		year: '2025–26',
		hook: 'A zine about street art, borders and migration.',
		summary:
			'17 pages on how street art helps social inclusion. Real academic sources, laid out like a magazine: tabloid pages, collages, a barcode.',
		accent: '#D7261E',
		cover: { kind: 'image', src: '/media/streetart/page-01.jpg', alt: 'Zine cover: the word STREETART in tall red type over a stencil of a bear with suitcases' },
		brief: {
			get: 'Students',
			who: 'Heavy theory, street art as decor',
			to: 'Show how street walls talk about borders',
			by: 'Turn the research into a zine you would pick up for fun.'
		},
		facts: [
			{ label: 'Context', value: 'University project' },
			{ label: 'Course', value: 'Communication Practices, Diversity & Inclusion' },
			{ label: 'Team', value: '4 people' },
			{ label: 'Format', value: 'Zine, 17 pages' }
		],
		credits: 'Made with a team of four for Communication Practices, Diversity & Inclusion, 2025–26.',
		takeaways: [
			'All the theory is there, it just reads like a magazine.',
			'Each topic gets its own format, like the tabloid page on borders.',
			'It ends with a real idea: a school workshop called “Walls that welcome”.'
		],
		sections: [
			{
				kind: 'text',
				label: 'The brief',
				title: 'Academic theory, but readable.',
				body: [
					'Real sources: Lefebvre on the right to the city, De Genova on the “border spectacle”, walls as “contact zones”.',
					'The tricky part was keeping it accurate and still fun to flip through.'
				]
			},
			{
				kind: 'pages',
				label: 'Read it',
				title: 'The whole zine.',
				intro: 'Scroll or use the arrows. Click a page to see it full screen.',
				pages: [
					{ src: '/media/streetart/page-01.jpg', title: 'Cover' },
					{ src: '/media/streetart/page-02.jpg', title: 'Zine' },
					{ src: '/media/streetart/page-03.jpg', title: 'From subculture to artivism' },
					{ src: '/media/streetart/page-04.jpg', title: 'The wall as a contact zone' },
					{ src: '/media/streetart/page-05.jpg', title: 'Street News: global and Italian' },
					{ src: '/media/streetart/page-06.jpg', title: 'Street News: the liquid border' },
					{ src: '/media/streetart/page-07.jpg', title: 'Around the world' },
					{ src: '/media/streetart/page-08.jpg', title: 'Street art of migration' },
					{ src: '/media/streetart/page-09.jpg', title: 'Graffitaly' },
					{ src: '/media/streetart/page-10.jpg', title: 'Street art in Italy' },
					{ src: '/media/streetart/page-11.jpg', title: 'Street art and politics' },
					{ src: '/media/streetart/page-12.jpg', title: 'What it can change' },
					{ src: '/media/streetart/page-13.jpg', title: 'Walls that welcome: the idea' },
					{ src: '/media/streetart/page-14.jpg', title: 'Walls that welcome: the workshop' },
					{ src: '/media/streetart/page-15.jpg', title: 'Conclusions' },
					{ src: '/media/streetart/page-16.jpg', title: 'Sources' },
					{ src: '/media/streetart/page-17.jpg', title: 'The End' }
				]
			},
			{
				kind: 'gallery',
				label: 'Spreads',
				title: 'Favourite pages.',
				layout: 'row',
				items: [
					{ kind: 'image', src: '/media/streetart/page-05.jpg', alt: 'Street News tabloid page on street art as diversity and inclusion', caption: 'Theory as a tabloid', ratio: '790 / 1116' },
					{ kind: 'image', src: '/media/streetart/page-02.jpg', alt: 'Collage spread of cut-out images and textures', caption: 'Collage', ratio: '790 / 1116' },
					{ kind: 'image', src: '/media/streetart/page-13.jpg', alt: 'Walls that welcome school workshop proposal page', caption: 'The workshop idea', ratio: '790 / 1116' }
				]
			}
		]
	}
];

/* ---------------------------------------------------------- experience */

const experience: Experience[] = [
	{
		slug: 'tedx-cortina',
		role: 'Copywriter',
		org: 'TEDxCortina',
		orgNote: 'Local TEDx event',
		when: 'Nov 2025 – now',
		headline: 'Posts, web copy, interviews.',
		summary:
			'I’m on the comms team: I write interviews, posts and web copy. This year, the anniversary teaser too.',
		image: { src: '/media/experience/tedxcortina-team.jpg', alt: 'The TEDxCortina team in front of the red TEDx letters, Dolomites behind them' },
		highlights: [
			{ value: '20+', label: 'pieces published' },
			{ value: '3', label: 'channels: Instagram, LinkedIn, web' },
			{ value: '1', label: 'launch campaign' }
		],
		did: [
			{ title: 'Sustainability', text: 'I started on the 2026 sustainability theme, before the edition became GLOW.' },
			{ title: 'Interviews', text: 'I write the speaker interviews and cut the talks into short social posts.' },
			{ title: 'Channels', text: 'Each post is adapted for Instagram, LinkedIn or the site.' },
			{ title: 'GLOW teaser', text: 'Concept and on-screen text for the launch of the tenth edition.' }
		],
		lesson: 'Speakers give you lots of good material, and Instagram gives you three seconds. Most of my job is picking what to keep.',
		skills: ['Social copy', 'Interviews', 'Event copy', 'Video scripts'],
		related: 'glow-tedxcortina',
		page: true
	},
	{
		slug: 'tesi',
		role: 'Business developer',
		org: 'TESI',
		orgNote: 'B2B research & outreach',
		when: 'May 2026 – now',
		headline: 'Research, outreach, emails.',
		summary:
			'I find and qualify small companies and startups, keep HubSpot in order and write the outreach emails.',
		highlights: [
			{ value: '175', label: 'leads in two months' },
			{ value: '3', label: 'deals closed' },
			{ value: '1', label: 'HubSpot database, mine' }
		],
		did: [
			{ title: 'Pipeline', text: '175 SME and startup leads found and qualified in two months.' },
			{ title: 'Outreach', text: 'I write the email sequences and tweak them based on the replies.' },
			{ title: 'CRM', text: 'I look after HubSpot: segments, stages and all the follow-ups.' }
		],
		lesson: 'Cold emails show you fast if your writing works. They reply or not, and you adjust.',
		skills: ['Outreach copy', 'HubSpot', 'Sales Navigator', 'Research'],
		page: true
	},
	{
		slug: 'unipiazza',
		role: 'Content intern',
		org: 'Unipiazza',
		orgNote: 'Startup',
		when: '2025 – 2026',
		headline: 'Posts, blog articles and a newsletter, every week.',
		summary:
			'As an intern I posted every week on social, blog and newsletter, and planned the calendar.',
		image: { src: '/media/experience/unipiazza.jpg', alt: 'A hand holding an orange Unipiazza card in front of a Unipiazza terminal in a shop' },
		highlights: [
			{ value: '3', label: 'channels, every week' },
			{ value: '1', label: 'editorial calendar, mine' }
		],
		did: [
			{ title: 'Social', text: 'Short posts for people scrolling fast.' },
			{ title: 'Blog', text: 'Longer articles people read to the end.' },
			{ title: 'Newsletter', text: 'Emails with a subject line worth opening.' },
			{ title: 'Calendar', text: 'What goes out, where and when, weekly.' }
		],
		lesson: 'Every channel has its own rules. I learned to tell the same news in three different ways.',
		skills: ['Editorial plans', 'Blog', 'Newsletter', 'Social copy'],
		page: true
	},
	{
		slug: 'il-bronzetto',
		role: 'Marketing intern',
		org: 'Il Bronzetto',
		orgNote: 'Luxury Italian craft',
		when: '2023 – 2024',
		headline: 'Social and Pinterest for a luxury craft brand.',
		summary:
			'I wrote copy for a Made in Italy craft brand, on social and on Pinterest.',
		image: { src: '/media/experience/il-bronzetto.jpg', alt: 'The Il Bronzetto artisans in their workshop, black and white' },
		highlights: [{ value: '2', label: 'channels: social, Pinterest' }],
		did: [
			{ title: 'Social copy', text: 'Captions and posts for a brand that sells handmade pieces.' },
			{ title: 'Pinterest', text: 'Boards about the craft and the people in the workshop.' }
		],
		lesson: 'For handmade luxury pieces, calm and simple copy worked much better than anything loud.',
		skills: ['Brand voice', 'Social copy', 'Pinterest', 'Luxury'],
		page: true
	},
	{
		slug: 'sapiens',
		role: 'Co-founder, marketing',
		org: 'Sapiens',
		orgNote: 'Study material for STEM students',
		when: 'Side project',
		headline: 'Marketing for a study platform.',
		summary:
			'I do positioning and product marketing. Students cramming for exams have zero patience, so it all has to be clear.',
		highlights: [],
		did: [],
		skills: ['Positioning', 'Product marketing'],
		page: false
	},
	{
		slug: 'freelance',
		role: 'Events & sales',
		org: 'Freelance',
		orgNote: 'Live events around Italy',
		when: 'Mar 2021 – now',
		headline: 'Hosting events and selling face to face.',
		summary:
			'Welcoming guests, managing crowds and selling in person. Good practice for knowing quickly if a pitch works.',
		highlights: [],
		did: [],
		skills: ['Public speaking', 'Sales'],
		page: false
	}
];

const toolkit = [
	{ head: 'Writing & content', items: ['Editorial plans', 'Long and short copy', 'Newsletters', 'Tone of voice', 'Interviews', 'Short video'] },
	{ head: 'Sales & marketing', items: ['B2B outreach', 'CRM', 'Campaigns', 'Events'] },
	{ head: 'Software', items: ['PowerPoint', 'Excel', 'Google Workspace', 'HubSpot', 'Sales Navigator', 'Canva', 'Photoshop', 'Figma', 'CapCut', 'Notion', 'Trello', 'Google Analytics'] }
];

const education = [
	{ degree: 'Communication Strategies', school: 'University of Padova', when: 'MSc · graduated Sept 2026' },
	{ degree: 'Humanities for Communication', school: 'University of Florence', when: 'BA · 2021 – 2024' },
	{ degree: 'Languages, Cambridge curriculum', school: 'Language high school', when: 'Diploma · 2016 – 2021' }
];

const languages = [
	{ name: 'Italian', level: 'Native' },
	{ name: 'English', level: 'Fluent (C1)' },
	{ name: 'Spanish', level: 'Conversational (B2)' }
];

const principles = [
	{
		title: 'Channels are different',
		text: 'Captions and newsletters need different things, so I write them differently.'
	},
	{
		title: 'I love a dense topic',
		text: 'Technical talks, research, product details. I like finding ways to make them easy to follow.'
	},
	{
		title: 'I check if it works',
		text: 'Outreach emails and selling face to face taught me to find out quickly what lands and what doesn’t.'
	}
];

const ui = {
	nav: { work: 'Work', experience: 'Experience', about: 'About', hello: 'Write me', home: 'home', main: 'Main' },
	skip: 'Skip to content',
	cv: { nav: 'CV', view: 'View CV', download: 'Download', title: 'Open my CV (PDF)' },
	theme: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
	lang: { label: 'Language', switchTo: 'Leggi in italiano' },
	meta: {
		home: 'Lorena Trapanese, copywriter and content strategist from Italy. Moving to Copenhagen in October 2026.',
		about: 'Lorena Trapanese, Italian copywriter and content strategist. MSc in Communication Strategies. Moving to Copenhagen in October 2026.'
	},
	home: {
		// One entry per line, same count in every language. *stars* mark the green italic part.
		lede: ['Hi, I’m Lorena.', 'I write copy and make', 'complicated things', '*easy to read*.'],
		seeWork: 'See my work',
		writeMe: 'Write to me',
		numbers: 'In numbers',
		work: 'Work',
		workNote: (n: number) => `${n} projects`,
		services: 'What I do',
		servicesNote: 'In short',
		experience: 'Experience',
		experienceNote: 'Since 2021',
		how: 'How I work',
		moreAbout: 'More about me →',
		portraitAlt: 'Portrait of Lorena Trapanese',
		standingAlt: 'Lorena standing against a white wall'
	},
	card: { read: 'See the project', hover: 'Hover to play' },
	brief: { title: 'The brief', get: 'For', who: 'Problem', to: 'Goal', by: 'Idea' },
	work: {
		all: '← All work',
		look: 'In short',
		next: 'Next project',
		enlarge: 'Enlarge',
		play: 'Play',
		pause: 'Pause',
		teaser: 'teaser',
		cut: 'version'
	},
	reader: {
		prev: 'Previous page',
		next: 'Next page',
		open: (n: number, t: string) => `Open page ${n}, ${t}, full screen`
	},
	lightbox: { close: 'Close · Esc', viewer: 'Image viewer', prev: 'Previous', next: 'Next' },
	xp: {
		all: '← All experience',
		did: 'What I did',
		lesson: 'What I learned',
		seeWork: 'The project',
		skills: 'Skills',
		next: 'Next'
	},
	about: {
		label: 'About',
		title: 'Hi, I’m Lorena.',
		bio: [
			'I’m an Italian copywriter and content strategist, with a master’s in Communication Strategies.',
			'I’ve written for a TED event, a startup, a luxury craft brand and a B2B sales team. My favourite part is taking something complicated, like a technical talk or a research paper, and making it easy to read.',
			'In October 2026 I’m moving to Copenhagen and looking for a copy or content job. If you have one, or know someone who does, write to me.'
		],
		photoAlt: 'Lorena Trapanese standing against a white wall',
		how: 'How I work',
		timeline: 'Experience',
		timelineNote: 'Most recent first',
		education: 'Education',
		languages: 'Languages',
		toolkit: 'Tools'
	},
	footer: {
		open: 'Open to work',
		// One entry per line, same count in every language.
		line: ['I’m moving to Copenhagen', 'in October and looking', 'for a copy or content job.', 'Let’s talk.'],
		write: 'Email me',
		copied: 'Copied!',
		signoff: 'Thanks for reading this far.',
		subject: 'Hi Lorena'
	},
	error: {
		label: 'Error',
		notFound: 'This page doesn’t exist.',
		notFoundText: 'Maybe I moved it, maybe the link is wrong. Sorry about that.',
		other: 'Something went wrong.',
		otherText: 'Try again in a minute, or send me an email.',
		back: 'Back to the home page'
	}
};

export const en = {
	site,
	stats,
	services,
	projects,
	experience,
	toolkit,
	education,
	languages,
	principles,
	ui
};
