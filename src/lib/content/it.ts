// Italian copy. Mirrors en.ts field by field; same facts, same slugs, same media.
// Lines are kept close in length to the English so both layouts match.

import type { Content } from './index';

const site: Content['site'] = {
	name: 'Lorena Trapanese',
	role: 'Copywriter & content strategist',
	status: 'Copenaghen da ottobre 2026',
	languages: 'Italiano e inglese',
	email: 'trapaneselorena01@gmail.com',
	linkedin: 'https://www.linkedin.com/in/lorenatrapanese',
	url: 'https://portfolio-lorena-delta.vercel.app'
};

const stats: Content['stats'] = [
	{ value: '20+', label: 'tra post e articoli per TEDxCortina', href: '/experience/tedx-cortina' },
	{ value: '175', label: 'lead B2B trovati e qualificati in due mesi', href: '/experience/tesi' },
	{ value: '3', label: 'canali su cui pubblicavo ogni settimana', href: '/experience/unipiazza' },
	{ value: '3', label: 'lingue: italiano, inglese, spagnolo', href: '/about' }
];

const services: Content['services'] = [
	{
		name: 'Copy ed editoriale',
		text: 'Articoli, post e newsletter, scritti con la voce del brand.',
		items: ['Piani editoriali', 'Copy social', 'Newsletter', 'Tone of voice']
	},
	{
		name: 'Content strategy',
		text: 'Cosa pubblicare, dove e ogni quanto. Poi porto avanti il calendario ogni settimana.',
		items: ['Calendari', 'Piano dei canali', 'Content audit']
	},
	{
		name: 'Campagne ed eventi',
		text: 'Testi per eventi, interviste, script video e i messaggi che li tengono insieme.',
		items: ['Copy eventi', 'Interviste', 'Script video', 'Lanci']
	}
];

/* ---------------------------------------------------------------- work */

const projects: Content['projects'] = [
	{
		slug: 'glow-tedxcortina',
		title: 'GLOW',
		client: 'TEDxCortina',
		kind: 'Concept e copy · Video',
		year: '2026',
		hook: 'Il teaser per la decima edizione di TEDxCortina.',
		summary:
			'Ho pensato il concept e scritto tutto il testo a schermo. Ne abbiamo fatte due versioni: una corta per Instagram e una più lunga per YouTube.',
		accent: '#E62B1E',
		cover: { kind: 'image', src: '/media/glow/title-card.jpg', alt: 'Teaser GLOW di TEDxCortina, title card con una vetta delle Dolomiti in bianco e nero' },
		preview: { src: '/media/glow/teaser-vertical.mp4', poster: '/media/glow/vertical-poster.jpg' },
		brief: {
			get: 'Chi segue TEDxCortina',
			who: 'I post di eventi si saltano',
			to: 'Far segnare a tutti il 21 agosto',
			by: 'Sette righe brevi che arrivano al nome e chiudono con la data.'
		},
		facts: [
			{ label: 'Cliente', value: 'TEDxCortina' },
			{ label: 'Io ho fatto', value: 'Concept, testo a schermo' },
			{ label: 'Formato', value: 'Teaser video, 2 versioni' },
			{ label: 'Canali', value: 'Instagram, YouTube' },
			{ label: 'Evento', value: '21 ago 2026, Cortina' }
		],
		credits: 'Concept e testo a schermo miei, con il team comunicazione di TEDxCortina.',
		takeaways: [
			'Il testo arriva una riga alla volta, e la data arriva per ultima.',
			'Uno script, due tagli: 4 secondi per Instagram, 11 per YouTube.',
			'GLOW è il nome dell’edizione e anche l’idea visiva.'
		],
		sections: [
			{
				kind: 'text',
				label: 'Il brief',
				title: 'Annunciare la decima edizione.',
				body: [
					'Ho iniziato l’edizione 2026 sui contenuti di sostenibilità. Poi è arrivato il decimo anniversario e la campagna è diventata GLOW.',
					'Il teaser doveva fare due cose: dire quando e dove, e incuriosire abbastanza da farselo ricordare.'
				]
			},
			{
				kind: 'script',
				label: 'Lo script',
				title: 'Sette righe.',
				intro: 'Una riga alla volta a schermo. Messe insieme, fanno una frase sola.',
				// `en` is not shown on the Italian page; it only reserves the same space.
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
				label: 'Due versioni',
				title: 'Una per Instagram, una per YouTube.',
				intro: 'Su YouTube ci mette 11 secondi ad arrivarci. Su Instagram hai data e luogo in 4.',
				items: [
					{ kind: 'video', name: 'Verticale', spec: 'Instagram · 4 s', src: '/media/glow/teaser-vertical.mp4', poster: '/media/glow/vertical-poster.jpg', ratio: '9 / 16' },
					{ kind: 'video', name: 'Orizzontale', spec: 'YouTube · 11 s', src: '/media/glow/teaser-wide.mp4', poster: '/media/glow/wide-poster.jpg', ratio: '16 / 9' }
				]
			},
			{
				kind: 'gallery',
				label: 'Frame',
				title: 'Titolo, reveal, fine.',
				layout: 'row',
				items: [
					{ kind: 'image', src: '/media/glow/title-card.jpg', alt: 'Title card: TEDxCortina su una vetta delle Dolomiti nella nebbia', caption: 'Title card', ratio: '620 / 1102' },
					{ kind: 'image', src: '/media/glow/reveal.jpg', alt: 'Rumore statico con data e luogo scritti nell’angolo', caption: 'Data e luogo', ratio: '620 / 1102' },
					{ kind: 'image', src: '/media/glow/end-card.jpg', alt: 'End card: logo TEDxCortina decimo anniversario su nero', caption: 'End card', ratio: '620 / 1102' }
				]
			}
		]
	},
	{
		slug: 'pochi-ma-buoni',
		title: 'Pochi ma Buoni',
		client: 'Università di Padova',
		kind: 'Pubblicità sociale',
		year: 'Magistrale', // TODO: year not given in Lorena's draft
		hook: 'Una campagna contro lo spreco di cibo, per chi ha 18–24 anni.',
		summary:
			'Un annuncio stampa, due installazioni in strada e adesivi per i cestini della spesa, tutti con la stessa frase.',
		accent: '#1F8A4C',
		cover: { kind: 'image', src: '/media/pochi-ma-buoni/press-ad.jpg', alt: 'Annuncio stampa Pochi ma Buoni: uno scaffale quasi vuoto con un pacco di pasta e un vasetto di pesto' },
		brief: {
			get: 'Chi ha 18–24 anni',
			who: 'Sprecano più cibo di tutti',
			to: 'Comprare meno, e meglio',
			by: 'Esserci dove nasce lo spreco: scaffale, piazza, carrello.'
		},
		facts: [
			{ label: 'Contesto', value: 'Progetto universitario' },
			{ label: 'Corso', value: 'Storia della pubblicità sociale' },
			{ label: 'Target', value: 'Ragazzi dai 18 ai 24 anni' },
			{ label: 'Mezzi', value: 'Stampa, strada, adesivi' }
		],
		credits: 'Progetto di concept per il corso Storia della pubblicità sociale. I visual sono mock-up.',
		takeaways: [
			'Il messaggio arriva mentre fai la spesa, cioè quando decidi.',
			'Il nome dice “pochi ma buoni”: comprare meno suona come un premio.',
			'Quattro esecuzioni, una frase. Ognuna fa riconoscere le altre.'
		],
		sections: [
			{
				kind: 'text',
				label: 'Il problema',
				title: 'Buttiamo più di un terzo del nostro cibo.',
				body: [
					'Chi ha tra 18 e 24 anni spreca più di tutti, e di discorsi sulla sostenibilità ne ha già sentiti parecchi.',
					'Quindi la campagna salta il discorso. Si fa trovare nelle piazze e nei supermercati dove vanno già.'
				]
			},
			{
				kind: 'quote',
				text: 'Compra meno, con maggiore consapevolezza.',
				note: 'La frase che c’è su ogni pezzo della campagna, dalla stampa ai carrelli.'
			},
			{
				kind: 'executions',
				label: 'Il lavoro',
				title: 'Dove la trovi.',
				items: [
					{
						name: 'Annuncio stampa',
						text: 'Scaffale quasi vuoto: pasta e un vasetto di pesto. Pochi, ma buoni.',
						media: [{ kind: 'image', src: '/media/pochi-ma-buoni/press-ad.jpg', alt: 'Annuncio stampa con uno scaffale di legno quasi vuoto', ratio: '840 / 1200' }]
					},
					{
						name: 'Strada: i cestini',
						text: 'Cestini trasparenti enormi nelle piazze dove stanno gli studenti, pieni di cibo andato a male.',
						media: [{ kind: 'image', src: '/media/pochi-ma-buoni/bin.jpg', alt: 'Un cestino trasparente gigante pieno di cibo andato a male in una piazza', ratio: '548 / 722' }]
					},
					{
						name: 'Strada: i mini carrelli',
						text: 'Carrellini accanto a quelli normali, fuori dai supermercati del centro. Un piccolo invito a comprare quello che serve.',
						media: [{ kind: 'image', src: '/media/pochi-ma-buoni/trolleys.jpg', alt: 'File di carrelli in miniatura fuori da un supermercato', ratio: '578 / 772' }]
					},
					{
						name: 'Adesivi',
						text: 'La frase dentro i cestini e sui manici dei carrelli, proprio mentre stai per prendere una cosa in più.',
						media: [
							{ kind: 'image', src: '/media/pochi-ma-buoni/basket.jpg', alt: 'Un cestino rosso della spesa con la frase della campagna stampata all’interno', ratio: '467 / 325' },
							{ kind: 'image', src: '/media/pochi-ma-buoni/handle.jpg', alt: 'Il manico di un carrello rivestito con la frase della campagna', ratio: '673 / 345' }
						]
					}
				]
			},
			{
				kind: 'gallery',
				label: 'Logo',
				title: 'Adesivi e bollini.',
				intro: 'Qualche versione, così il logo sta su un cestino, un bidone o uno scaffale.',
				layout: 'grid',
				items: [{ kind: 'image', src: '/media/pochi-ma-buoni/stickers.jpg', alt: 'Otto bollini Pochi ma Buoni, tondi e a stella, in verde e crema', ratio: '660 / 1130' }]
			}
		]
	},
	{
		slug: 'streetart',
		title: 'STREETART',
		client: 'Università di Padova',
		kind: 'Editoriale · Zine',
		year: '2025–26',
		hook: 'Una zine su street art, confini e migrazione.',
		summary:
			'17 pagine su come la street art aiuta l’inclusione. Fonti accademiche vere, impaginate come una rivista: tabloid, collage, codice a barre.',
		accent: '#D7261E',
		cover: { kind: 'image', src: '/media/streetart/page-01.jpg', alt: 'Copertina della zine: la scritta STREETART in rosso sopra lo stencil di un orso con le valigie' },
		brief: {
			get: 'Studenti',
			who: 'Teoria pesante, arte come decoro',
			to: 'Mostrare come i muri parlano di confini',
			by: 'Trasformare la ricerca in una zine da sfogliare per piacere.'
		},
		facts: [
			{ label: 'Contesto', value: 'Progetto universitario' },
			{ label: 'Corso', value: 'Communication Practices, Diversity & Inclusion' },
			{ label: 'Team', value: '4 persone' },
			{ label: 'Formato', value: 'Zine, 17 pagine' }
		],
		credits: 'Fatta in un team di quattro per Communication Practices, Diversity & Inclusion, 2025–26.',
		takeaways: [
			'La teoria c’è tutta, solo che si legge come una rivista.',
			'Ogni tema ha il suo formato, come la pagina tabloid sui confini.',
			'Chiude con un’idea vera: un laboratorio a scuola, “Walls that welcome”.'
		],
		sections: [
			{
				kind: 'text',
				label: 'Il brief',
				title: 'Teoria accademica, ma leggibile.',
				body: [
					'Fonti vere: Lefebvre sul diritto alla città, De Genova sul “border spectacle”, il muro come “contact zone”.',
					'La parte difficile era restare precisi e rendere la zine piacevole da sfogliare.'
				]
			},
			{
				kind: 'pages',
				label: 'Leggila',
				title: 'Tutta la zine.',
				intro: 'Scorri o usa le frecce. Clicca una pagina per vederla a schermo intero.',
				pages: [
					{ src: '/media/streetart/page-01.jpg', title: 'Copertina' },
					{ src: '/media/streetart/page-02.jpg', title: 'Zine' },
					{ src: '/media/streetart/page-03.jpg', title: 'Dalla sottocultura all’artivismo' },
					{ src: '/media/streetart/page-04.jpg', title: 'Il muro come zona di contatto' },
					{ src: '/media/streetart/page-05.jpg', title: 'Street News: mondo e Italia' },
					{ src: '/media/streetart/page-06.jpg', title: 'Street News: il confine liquido' },
					{ src: '/media/streetart/page-07.jpg', title: 'Around the world' },
					{ src: '/media/streetart/page-08.jpg', title: 'Street art e migrazione' },
					{ src: '/media/streetart/page-09.jpg', title: 'Graffitaly' },
					{ src: '/media/streetart/page-10.jpg', title: 'Street art in Italia' },
					{ src: '/media/streetart/page-11.jpg', title: 'Street art e politica' },
					{ src: '/media/streetart/page-12.jpg', title: 'Cosa può cambiare' },
					{ src: '/media/streetart/page-13.jpg', title: 'Walls that welcome: l’idea' },
					{ src: '/media/streetart/page-14.jpg', title: 'Walls that welcome: il laboratorio' },
					{ src: '/media/streetart/page-15.jpg', title: 'Conclusioni' },
					{ src: '/media/streetart/page-16.jpg', title: 'Fonti' },
					{ src: '/media/streetart/page-17.jpg', title: 'Fine' }
				]
			},
			{
				kind: 'gallery',
				label: 'Pagine',
				title: 'Pagine preferite.',
				layout: 'row',
				items: [
					{ kind: 'image', src: '/media/streetart/page-05.jpg', alt: 'Pagina Street News in stile tabloid sulla street art come diversità e inclusione', caption: 'Teoria da tabloid', ratio: '790 / 1116' },
					{ kind: 'image', src: '/media/streetart/page-02.jpg', alt: 'Doppia pagina a collage di ritagli e texture', caption: 'Collage', ratio: '790 / 1116' },
					{ kind: 'image', src: '/media/streetart/page-13.jpg', alt: 'Pagina della proposta di laboratorio Walls that welcome', caption: 'L’idea del laboratorio', ratio: '790 / 1116' }
				]
			}
		]
	}
];

/* ---------------------------------------------------------- experience */

const experience: Content['experience'] = [
	{
		slug: 'tedx-cortina',
		role: 'Copywriter',
		org: 'TEDxCortina',
		orgNote: 'Evento TEDx locale',
		when: 'Nov 2025 – oggi',
		headline: 'Post, testi per il sito, interviste.',
		summary:
			'Nel team comunicazione scrivo interviste, post e testi web, e quest’anno il teaser dei 10 anni.',
		image: { src: '/media/experience/tedxcortina-team.jpg', alt: 'Il team di TEDxCortina davanti alle lettere rosse TEDx, con le Dolomiti alle spalle' },
		highlights: [
			{ value: '20+', label: 'contenuti pubblicati' },
			{ value: '3', label: 'canali: Instagram, LinkedIn, sito' },
			{ value: '1', label: 'campagna di lancio' }
		],
		did: [
			{ title: 'Sostenibilità', text: 'Ho iniziato sul tema sostenibilità del 2026, prima che l’edizione diventasse GLOW.' },
			{ title: 'Interviste', text: 'Scrivo le interviste agli speaker e taglio i talk in post brevi per i social.' },
			{ title: 'Canali', text: 'Ogni post è adattato per Instagram, LinkedIn o il sito.' },
			{ title: 'Teaser GLOW', text: 'Concept e testo a schermo per il lancio della decima edizione.' }
		],
		lesson: 'Gli speaker ti danno un sacco di materiale buono, e Instagram ti dà tre secondi. Il grosso del lavoro è scegliere cosa tenere.',
		skills: ['Copy social', 'Interviste', 'Copy eventi', 'Script video'],
		related: 'glow-tedxcortina',
		page: true
	},
	{
		slug: 'tesi',
		role: 'Business developer',
		org: 'TESI',
		orgNote: 'Ricerca e outreach B2B',
		when: 'Mag 2026 – oggi',
		headline: 'Ricerca, outreach, email.',
		summary:
			'Trovo e qualifico piccole aziende e startup, tengo in ordine HubSpot e scrivo le email di outreach.',
		highlights: [
			{ value: '175', label: 'lead in due mesi' },
			{ value: '3', label: 'contratti chiusi' },
			{ value: '1', label: 'database HubSpot, mio' }
		],
		did: [
			{ title: 'Pipeline', text: '175 lead tra PMI e startup, trovati e qualificati in due mesi.' },
			{ title: 'Outreach', text: 'Scrivo le sequenze di email e le sistemo in base alle risposte.' },
			{ title: 'CRM', text: 'Mi occupo di HubSpot: segmenti, fasi e tutti i follow-up.' }
		],
		lesson: 'Le email a freddo ti dicono subito se scrivi bene. Ti rispondono o no, e sistemi.',
		skills: ['Copy outreach', 'HubSpot', 'Sales Navigator', 'Ricerca'],
		page: true
	},
	{
		slug: 'unipiazza',
		role: 'Stage contenuti',
		org: 'Unipiazza',
		orgNote: 'Startup',
		when: '2025 – 2026',
		headline: 'Post, articoli e una newsletter, ogni settimana.',
		summary:
			'Da stagista pubblicavo ogni settimana su social, blog e newsletter, e curavo il calendario.',
		image: { src: '/media/experience/unipiazza.jpg', alt: 'Una mano che tiene una carta Unipiazza arancione davanti a un terminale Unipiazza in un negozio' },
		highlights: [
			{ value: '3', label: 'canali, ogni settimana' },
			{ value: '1', label: 'calendario editoriale, mio' }
		],
		did: [
			{ title: 'Social', text: 'Post brevi per chi scrolla di fretta.' },
			{ title: 'Blog', text: 'Articoli lunghi da leggere fino in fondo.' },
			{ title: 'Newsletter', text: 'Email con un oggetto da aprire subito.' },
			{ title: 'Calendario', text: 'Cosa esce, dove e quando, a settimana.' }
		],
		lesson: 'Ogni canale ha le sue regole. Ho imparato a dire la stessa notizia in tre modi diversi.',
		skills: ['Piani editoriali', 'Blog', 'Newsletter', 'Copy social'],
		page: true
	},
	{
		slug: 'il-bronzetto',
		role: 'Stage marketing',
		org: 'Il Bronzetto',
		orgNote: 'Artigianato di lusso',
		when: '2023 – 2024',
		headline: 'Social e Pinterest per un marchio artigiano.',
		summary:
			'Ho scritto per un marchio artigiano Made in Italy, su social e Pinterest.',
		image: { src: '/media/experience/il-bronzetto.jpg', alt: 'Gli artigiani del Bronzetto nel loro laboratorio, in bianco e nero' },
		highlights: [{ value: '2', label: 'canali: social, Pinterest' }],
		did: [
			{ title: 'Copy social', text: 'Caption e post per un marchio che vende pezzi fatti a mano.' },
			{ title: 'Pinterest', text: 'Board che raccontano il mestiere e le persone in bottega.' }
		],
		lesson: 'Per pezzi di lusso fatti a mano, un copy calmo e semplice funzionava molto meglio di uno urlato.',
		skills: ['Voce del brand', 'Copy social', 'Pinterest', 'Lusso'],
		page: true
	},
	{
		slug: 'sapiens',
		role: 'Co-founder, marketing',
		org: 'Sapiens',
		orgNote: 'Materiale di studio STEM',
		when: 'Side project',
		headline: 'Marketing per una piattaforma.',
		summary:
			'Faccio posizionamento e product marketing. Chi studia sotto esame ha zero pazienza: tutto deve essere chiaro.',
		highlights: [],
		did: [],
		skills: ['Posizionamento', 'Product marketing'],
		page: false
	},
	{
		slug: 'freelance',
		role: 'Eventi e vendita',
		org: 'Freelance',
		orgNote: 'Eventi dal vivo in Italia',
		when: 'Mar 2021 – oggi',
		headline: 'Accoglienza agli eventi e vendita dal vivo.',
		summary:
			'Accogliere ospiti, gestire il pubblico e vendere di persona. Ottimo allenamento per capire in fretta se un pitch funziona.',
		highlights: [],
		did: [],
		skills: ['Public speaking', 'Vendita'],
		page: false
	}
];

const toolkit: Content['toolkit'] = [
	{ head: 'Scrittura e contenuti', items: ['Piani editoriali', 'Copy lungo e breve', 'Newsletter', 'Tone of voice', 'Interviste', 'Video brevi'] },
	{ head: 'Vendite e marketing', items: ['Outreach B2B', 'CRM', 'Campagne', 'Eventi'] },
	{ head: 'Software', items: ['HubSpot', 'Sales Navigator', 'Canva', 'Figma', 'CapCut', 'Notion', 'Trello', 'Google Workspace', 'PowerPoint', 'Google Analytics'] }
];

const education: Content['education'] = [
	{ degree: 'Strategie di comunicazione', school: 'Università di Padova', when: 'Magistrale · 2024 – 2026' },
	{ degree: 'Scienze umanistiche per la comunicazione', school: 'Università di Firenze', when: 'Triennale · 2021 – 2024' }
];

const languages: Content['languages'] = [
	{ name: 'Italiano', level: 'Madrelingua' },
	{ name: 'Inglese', level: 'Fluente (C1)' },
	{ name: 'Spagnolo', level: 'Buono (B2)' }
];

const principles: Content['principles'] = [
	{
		title: 'Ogni canale è diverso',
		text: 'Una caption e una newsletter chiedono cose diverse, e le scrivo in modo diverso.'
	},
	{
		title: 'Adoro i temi densi',
		text: 'Talk tecnici, ricerche, dettagli di prodotto. Mi diverte capire come renderli facili da seguire.'
	},
	{
		title: 'Controllo se funziona',
		text: 'Le email di outreach e la vendita dal vivo mi hanno insegnato a capire in fretta cosa arriva e cosa no.'
	}
];

const ui: Content['ui'] = {
	nav: { work: 'Lavori', experience: 'Esperienza', about: 'Chi sono', hello: 'Scrivimi', home: 'home', main: 'Principale' },
	skip: 'Vai al contenuto',
	theme: { toDark: 'Passa al tema scuro', toLight: 'Passa al tema chiaro' },
	lang: { label: 'Lingua', switchTo: 'Read in English' },
	meta: {
		home: 'Lorena Trapanese, copywriter e content strategist italiana. A Copenaghen da ottobre 2026.',
		about: 'Lorena Trapanese, copywriter e content strategist italiana. Magistrale in Strategie di comunicazione. A Copenaghen da ottobre 2026.'
	},
	home: {
		lede: ['Ciao, sono Lorena.', 'Scrivo copy e rendo', 'le cose complicate', '*facili da leggere*.'],
		seeWork: 'I miei lavori',
		writeMe: 'Scrivimi',
		numbers: 'In numeri',
		work: 'Lavori',
		workNote: (n: number) => `${n} progetti`,
		services: 'Cosa faccio',
		servicesNote: 'In breve',
		experience: 'Esperienza',
		experienceNote: 'Dal 2021',
		how: 'Come lavoro',
		moreAbout: 'Altro su di me →',
		portraitAlt: 'Ritratto di Lorena Trapanese',
		standingAlt: 'Lorena in piedi davanti a un muro bianco'
	},
	card: { read: 'Vedi il progetto', hover: 'Passaci sopra' },
	brief: { title: 'Il brief', get: 'Per', who: 'Problema', to: 'Obiettivo', by: 'Idea' },
	work: {
		all: '← Tutti i lavori',
		look: 'In breve',
		next: 'Prossimo',
		enlarge: 'Ingrandisci',
		play: 'Play',
		pause: 'Pausa',
		teaser: 'teaser',
		cut: 'versione'
	},
	reader: {
		prev: 'Pagina precedente',
		next: 'Pagina successiva',
		open: (n: number, t: string) => `Apri la pagina ${n}, ${t}, a schermo intero`
	},
	lightbox: { close: 'Chiudi · Esc', viewer: 'Visualizzatore immagini', prev: 'Precedente', next: 'Successiva' },
	xp: {
		all: '← Tutta l’esperienza',
		did: 'Cosa ho fatto',
		lesson: 'Cosa ho imparato',
		seeWork: 'Il progetto',
		skills: 'Competenze',
		next: 'Prossima'
	},
	about: {
		label: 'Chi sono',
		title: 'Ciao, sono Lorena.',
		bio: [
			'Sono una copywriter e content strategist italiana, laureata in Strategie di comunicazione.',
			'Ho scritto per un evento TED, una startup, un marchio artigiano di lusso e un team di vendita B2B. La parte che mi piace di più è prendere una cosa complicata, un talk tecnico o una ricerca, e renderla facile da leggere.',
			'A ottobre 2026 mi trasferisco a Copenaghen e cerco lavoro lì, nel copy o nei contenuti. Se hai un posto libero, o conosci chi ce l’ha, scrivimi.'
		],
		photoAlt: 'Lorena Trapanese in piedi davanti a un muro bianco',
		how: 'Come lavoro',
		timeline: 'Esperienza',
		timelineNote: 'Dalla più recente',
		education: 'Studi',
		languages: 'Lingue',
		toolkit: 'Strumenti'
	},
	footer: {
		open: 'Cerco lavoro',
		line: ['A ottobre mi trasferisco', 'a Copenaghen e cerco', 'lavoro nel copy o nei', 'contenuti. Parliamone.'],
		write: 'Scrivimi',
		copied: 'Copiata!',
		signoff: 'Grazie di aver letto fin qui.',
		subject: 'Ciao Lorena'
	},
	error: {
		label: 'Errore',
		notFound: 'Questa pagina non esiste.',
		notFoundText: 'Forse l’ho spostata, forse il link è sbagliato. Scusa.',
		other: 'Qualcosa è andato storto.',
		otherText: 'Riprova tra un minuto, oppure mandami una email.',
		back: 'Torna alla home'
	}
};

export const it: Content = {
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
