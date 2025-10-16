export type EventItem = {
	id: string;
	title: string;
	date: string;
	description: string;
};

export type Interval = {
	id: string;
	events: EventItem[];
};

const data: Interval[] = [
	{
		id: 'i2015',
		events: [
			{
				id: 'e1',
				title: 'Solar eclipse',
				date: '2001',
				description: 'Solar eclipse in South Africe. Was pretty huge.',
			},
			{ id: 'e2', title: 'Event A', date: '2002', description: 'Additional information about event A' },
		],
	},
	{
		id: 'i2016',
		events: [
			{
				id: 'e3',
				title: 'Hubble have found GZ-321',
				date: '2003',
				description: 'Oh it is our Hubble telescope. And it is working.',
			},
			{
				id: 'e8',
				title: 'Hubble have found GZ-324',
				date: '2004',
				description: 'And it is just works.',
			},
		],
	},
	{
		id: 'i2017',
		events: [
			{
				id: 'e4',
				title: 'Tesla booms the market',
				date: '2002',
				description: 'Tesla introduced their new Cybertruck.',
			},
			{
				id: 'e7',
				title: 'Tesla',
				date: '2005',
				description: 'Tesla introduced their new Cybertruck2 .',
			},
		],
	},
	{
		id: 'i2022',
		events: [
			{ id: 'e5', title: 'Science', date: '2004', description: 'Another key thing in 2022.' },
			{ id: 'e6', title: 'Event B', date: '2015', description: 'Super serious event was happened' },
		],
	},
];

export default data;
