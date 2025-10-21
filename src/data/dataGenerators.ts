import { CATEGORIES, CategoryKey, EventItem, TimelineData } from './timelineData';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate random year between 1900 and current year
function generateRandomYear(): string {
	const currentYear = new Date().getFullYear();
	const minYear = 1900;
	const year = Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
	return year.toString();
}

// Main function to generate timeline data for a specific category (sorted by Date)
function generateTimelineDataForCategory(category: CategoryKey, numberOfEvents: number = 5): TimelineData {
	const categoryData = CATEGORIES[category];

	const events: EventItem[] = Array.from({ length: numberOfEvents }, () => {
		return {
			id: `e${uuidv4()}`,
			title: getRandomItem(categoryData.titles),
			date: generateRandomYear(),
			description: getRandomItem(categoryData.descriptions),
		};
	}).sort((event1, event2) => Number(event1.date) - Number(event2.date));

	return {
		id: `i${uuidv4()}`,
		category: category,
		events,
	};
}

// Generate timelines for all 5 categories
export function generateAllCategoryTimelines(eventsPerTimeline: number = 5): TimelineData[] {
	const categoryKeys = Object.keys(CATEGORIES) as CategoryKey[];

	return categoryKeys.map((category) => generateTimelineDataForCategory(category, eventsPerTimeline));
}
