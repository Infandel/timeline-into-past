export type EventItem = {
	id: string;
	title: string;
	date: string;
	description: string;
};

export type TimelineData = {
	id: string;
	category: string;
	events: EventItem[];
};

export type CategoryKey = keyof typeof CATEGORIES;

// Categories and their specific data
export const CATEGORIES = {
	Science: {
		titles: [
			'Solar eclipse',
			'Moon landing',
			'Hubble telescope launch',
			'Discovery of DNA',
			'First successful cloning',
			'Mars rover landing',
			'Quantum computer breakthrough',
			'COVID-19 vaccine development',
			'Gravitational waves detection',
			'Human genome project completion',
			'International Space Station launch',
			'Theory of relativity publication',
		],
		descriptions: [
			'Major breakthrough in scientific research',
			'Groundbreaking discovery that changed our understanding',
			'Important scientific expedition and findings',
			'Revolutionary invention in the field',
			'Significant research publication that influenced the scientific community',
			'Experimental verification of fundamental theories',
			'Technological advancement in research methods',
		],
	},
	Literature: {
		titles: [
			'Publication of famous novel',
			'Nobel Prize in Literature',
			'Literary movement begins',
			'Bestselling book release',
			'Author receives prestigious award',
			'Classic work published',
			'Literary festival inauguration',
			'Poetry collection debut',
			'Literary criticism published',
			'Translation of ancient texts completed',
		],
		descriptions: [
			'Influential work that shaped modern literature',
			'Award-winning piece that received critical acclaim',
			'Cultural phenomenon that captivated readers worldwide',
			'Seminal work in its literary genre',
			'Book that sparked important social discussions',
			'Literary masterpiece that defined a generation',
			'Groundbreaking narrative style that influenced writers',
		],
	},
	Films: {
		titles: [
			'Blockbuster movie premiere',
			'Oscar award ceremony',
			'Film festival grand opening',
			'Classic film release',
			'Groundbreaking animation debut',
			'Cult film premiere',
			'Record-breaking box success',
			"Director's landmark film",
			'First film with new technology',
			'Influential documentary release',
		],
		descriptions: [
			'Cinematic masterpiece that redefined filmmaking',
			'Award-winning performance and direction',
			'Cultural impact that influenced generations',
			'Technical innovation in film production',
			'Box office success that broke multiple records',
			'Film that launched new cinematic techniques',
			'Groundbreaking visual effects that set industry standards',
		],
	},
	History: {
		titles: [
			'Important treaty signing',
			'Historical battle',
			'Political revolution',
			'Significant protest movement',
			'Monumental construction completed',
			'Historical figure birth/death',
			'Cultural renaissance period',
			'Empire rise/fall',
			'Economic crisis begins',
			'Exploration voyage completion',
		],
		descriptions: [
			'Pivotal moment that shaped world history',
			'Event that marked the beginning of a new era',
			'Historical turning point with lasting impact',
			'Cultural movement that transformed society',
			'Political change that redefined international relations',
			'Military conflict that changed borders',
			'Social movement that achieved significant reforms',
		],
	},
	'Computer Games': {
		titles: [
			'Groundbreaking game release',
			'Gaming console launch',
			'E-sports tournament',
			'Game development studio founded',
			'Revolutionary game engine created',
			'Record-breaking game sales',
			'Online gaming service launched',
			'VR gaming breakthrough',
			'Indie game success story',
			'Gaming convention inaugural event',
		],
		descriptions: [
			'Innovative gameplay that set new industry standards',
			'Technical achievement in game development',
			'Cultural phenomenon in the gaming community',
			'Award-winning game design and storytelling',
			'Platform that revolutionized online gaming experience',
			'Graphics breakthrough that raised the bar',
			'Game that defined a new genre in the industry',
		],
	},
};
