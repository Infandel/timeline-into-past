import { useGSAP } from '@gsap/react';
import { TimelineData } from '../../../data/timelineData';
import { MutableRefObject } from 'react';
import gsap from 'gsap';

interface IUseCirlesDraw {
	circleRef: MutableRefObject<HTMLDivElement | null>;
	containerRef: MutableRefObject<HTMLDivElement | null>;
	intervals: TimelineData[];
}

export const useCirclesDraw = ({ circleRef, containerRef, intervals }: IUseCirlesDraw) => {
	// Drawing small circles on a Big main circle on initial Draw. And position Section name category above circle.
	useGSAP(
		() => {
			if (!circleRef.current || !containerRef.current || intervals.length === 0) return;

			const radius = circleRef.current.offsetWidth / 2;

			// Position images around the circle
			intervals.forEach((_, i) => {
				const angle = (i / intervals.length) * Math.PI * 2 - Math.PI / 2; // start top
				const image = circleRef.current?.querySelector(`.img-${i}`);

				if (image) {
					gsap.set(image, {
						x: Math.cos(angle) * radius,
						y: Math.sin(angle) * radius,
					});
				}
			});

			// Position category name above first category circle
			const category = containerRef.current?.querySelector(`.category-name`);
			const categoryNext = containerRef.current?.querySelector(`.category-name-next`);
			const catAngle = (0 / intervals.length) * Math.PI * 2 - Math.PI / 2;

			gsap.set([category, categoryNext], {
				x: Math.cos(catAngle) * radius + 30,
				y: Math.sin(catAngle) * radius - 30,
			});
		},
		{ dependencies: [intervals.length], scope: containerRef }
	);
};
