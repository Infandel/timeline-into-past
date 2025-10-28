import { useGSAP } from '@gsap/react';
import { TimelineData } from '../../../data/timelineData';
import { MutableRefObject, SetStateAction } from 'react';
import gsap from 'gsap';

interface IUseAnimateYearsChange {
	containerRef: MutableRefObject<HTMLDivElement | null>;
	intervals: TimelineData[];
	activeIndex: number;
	startingYearRef: MutableRefObject<HTMLSpanElement | null>;
	endingYearRef: MutableRefObject<HTMLSpanElement | null>;
	startYearDate: string;
	endYearDate: string | undefined;
	setStartYear: (value: SetStateAction<string>) => void;
	setEndYear: (value: SetStateAction<string | undefined>) => void;
}

export const useAnimateYearsChange = ({
	containerRef,
	intervals,
	activeIndex,
	startingYearRef,
	endingYearRef,
	startYearDate,
	endYearDate,
	setStartYear,
	setEndYear,
}: IUseAnimateYearsChange) => {
	// Animating years changing in dynamic manner
	useGSAP(
		() => {
			// Create an object to animate
			const obj = { startYear: +startingYearRef.current!.textContent, endYear: +endingYearRef.current!.textContent };

			// compute an end year if available from the current active interval
			const startYear = Number(startYearDate);
			const endYear = Number(endYearDate);

			gsap.to(obj, {
				startYear,
				duration: 0.5,
				onUpdate: () => {
					// Round and render the year to the DOM (guarding against null ref)
					startingYearRef.current!.textContent = Math.round(+obj.startYear).toString();
				},
			});
			setStartYear(startYearDate);

			gsap.to(obj, {
				endYear,
				duration: 0.5,
				onUpdate: () => {
					// Round and render the year to the DOM (guarding against null ref)
					endingYearRef.current!.textContent = Math.round(+obj.endYear).toString();
				},
			});
			setEndYear(endYearDate);
		},
		{ dependencies: [intervals.length, activeIndex], scope: containerRef }
	);
};
