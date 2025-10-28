import { useGSAP } from '@gsap/react';
import { TimelineData } from '../../../data/timelineData';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import gsap from 'gsap';
import { IDisplayCategory } from '../Timeline';

interface IUseFadingCategoryName {
	containerRef: MutableRefObject<HTMLDivElement | null>;
	intervals: TimelineData[];
	activeIndex: number;
	displayCategory: IDisplayCategory;
	setDisplayCategory: Dispatch<SetStateAction<IDisplayCategory>>;
	previousCatRef: MutableRefObject<HTMLDivElement | null>;
	currentCatRef: MutableRefObject<HTMLDivElement | null>;
}

export const useFadingCategoryName = ({
	containerRef,
	intervals,
	activeIndex,
	displayCategory,
	setDisplayCategory,
	previousCatRef,
	currentCatRef,
}: IUseFadingCategoryName) => {
	// Fading out and in Current category Name
	useGSAP(
		() => {
			if (intervals[activeIndex].category !== displayCategory.current) {
				// Set up the transition - show both values
				setDisplayCategory({
					current: intervals[activeIndex].category,
					previous: displayCategory.current,
					showPrevious: true,
				});

				// Animate both elements
				const tl = gsap.timeline();

				// Fade out previous value
				tl.to(previousCatRef.current, {
					opacity: 0,
					duration: 0.8,
					ease: 'power2.out',
				})
					// Simultaneously fade in current value, but with 0.4 delay (so not gonna happen any overlapping)
					.to(
						currentCatRef.current,
						{
							opacity: 1,
							duration: 0.8,
							ease: 'power2.in',
							onComplete: () => {
								// Hide previous value after animation
								setDisplayCategory((prev) => ({
									...prev,
									showPrevious: false,
								}));
							},
						},
						0.4
					);
			}
		},
		{ dependencies: [activeIndex], scope: containerRef }
	);
};
