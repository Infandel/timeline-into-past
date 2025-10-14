export type EventItem = {
	id: string;
	title: string;
	date: string;
	description: string;
};

export type Interval = {
	id: string;
	year: string; // large number shown in center
	color: 'blue' | 'pink' | string;
	events: EventItem[];
};

const data: Interval[] = [
	{
		id: 'i2015',
		year: '2015',
		color: 'blue',
		events: [
			{
				id: 'e1',
				title: 'Частное солнечное затмение',
				date: '13 сентября',
				description: 'Частное солнечное затмение, видимое в Южной Африке и части Антарктиды.',
			},
			{ id: 'e2', title: 'Событие A', date: '20 марта', description: 'Дополнительная информация о событии A.' },
		],
	},
	{
		id: 'i2016',
		year: '2016',
		color: 'blue',
		events: [
			{
				id: 'e3',
				title: 'Хаббл обнаружил GN-z11',
				date: '07 марта',
				description: 'Телескоп «Хаббл» обнаружил самую удалённую галактику.',
			},
		],
	},
	{
		id: 'i2017',
		year: '2017',
		color: 'pink',
		events: [
			{
				id: 'e4',
				title: 'Представлен Tesla Semi',
				date: '16 ноября',
				description: 'Компания Tesla представила электрический грузовик Tesla Semi.',
			},
		],
	},
	{
		id: 'i2022',
		year: '2022',
		color: 'pink',
		events: [
			{ id: 'e5', title: 'Наука', date: '—', description: 'Пример ключевого события в 2022.' },
			{ id: 'e6', title: 'Событие B', date: '01 июня', description: 'Доп. описание события B.' },
		],
	},
];

export default data;
