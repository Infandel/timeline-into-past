import React, { useRef, useState } from 'react';
import { Interval } from '../../data/timelineData';
import styles from './Timeline.module.scss';
import EventSlider from '../eventSlider/EventSlider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import cn from 'clsx';

type Props = {
	intervals: Interval[];
	activeIndex: number;
	onChangeIndex: (i: number) => void;
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const Timeline: React.FC<Props> = ({ intervals, activeIndex, onChangeIndex }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);
	const startingYear = useRef<HTMLSpanElement | null>(null);
	const [startYear, setStartYear] = useState(intervals[activeIndex]?.events[0]?.date);
	const endingYear = useRef<HTMLSpanElement | null>(null);
	const [endYear, setEndYear] = useState(intervals[activeIndex]?.events?.at(-1)?.date);

	// Drawing small circles on a Big main circle
	useGSAP(
		() => {
			if (!circleRef.current || intervals.length === 0) return;

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
		},
		{ dependencies: [intervals.length], scope: containerRef }
	);

	// Animating years changing in dynamic manner
	useGSAP(
		() => {
			// Create an object to animate
			const obj = { startYear: +startingYear.current!.textContent, endYear: +endingYear.current!.textContent };

			// compute an end year if available from the current active interval
			const startYear = Number(intervals[activeIndex]?.events[0]?.date);
			const endYear = Number(intervals[activeIndex]?.events?.at(-1)?.date);

			gsap.to(obj, {
				startYear,
				duration: 0.5, // total duration in seconds
				ease: 'none',
				onUpdate: () => {
					// Round and render the year to the DOM (guarding against null ref)
					startingYear.current!.textContent = Math.round(+obj.startYear).toString();
				},
			});
			setStartYear(intervals[activeIndex]?.events[0]?.date);

			gsap.to(obj, {
				endYear,
				duration: 0.5, // total duration in seconds
				ease: 'none',
				onUpdate: () => {
					// Round and render the year to the DOM (guarding against null ref)
					endingYear.current!.textContent = Math.round(+obj.endYear).toString();
				},
			});
			setEndYear(intervals[activeIndex]?.events?.at(-1)?.date);
		},
		{ dependencies: [intervals.length, activeIndex], scope: containerRef }
	);

	const { contextSafe } = useGSAP({ dependencies: [activeIndex, intervals.length], scope: containerRef }); // we can pass in a config object as the 1st parameter to make scoping simple

	/* The `onSegmentClick` function is using the `contextSafe` hook provided by `useGSAP` to create an
	animation that rotates elements on the page. When the function is called (presumably triggered by a
	click event), it uses GSAP (GreenSock Animation Platform) to animate the rotation of elements with
	the classes `.main-circle` and `.circle-image`. */
	const onSegmentClick = contextSafe(() => {
		gsap.to('.main-circle', {
			rotation: `+=${360 / intervals.length}`,
			duration: 0.7,
			ease: 'power1.inOut',
		});

		gsap.to('.circle-image', {
			rotation: `-=${360 / intervals.length}`,
			duration: 0.7,
			ease: 'power1.inOut',
		});
	});

	return (
		<div className={styles.timeline}>
			<div className={styles.header}>
				<h2>Historical dates</h2>
			</div>

			<div className={styles.centerArea}>
				<div className={styles.numberLarge}>
					<span ref={startingYear}>{startYear}</span>
					<span ref={endingYear}>{endYear}</span>
				</div>
				<div ref={containerRef} className={styles.circleContainer}>
					<div ref={circleRef} className={cn('main-circle', styles.mainCircle)}>
						{intervals.map((_, i) => (
							<button key={i} className={cn(`circle-image`, styles.circleContent, `img-${i}`)} onClick={onSegmentClick}>
								<div className={styles.innerNumber}>{i + 1}</div>
							</button>
						))}
					</div>
				</div>
			</div>

			<div className={styles.sliderArea}>
				<EventSlider events={intervals[activeIndex].events} />
			</div>

			<div className={styles.footerControls}>
				<button onClick={() => onChangeIndex(clamp(activeIndex - 1, 0, intervals.length - 1))} aria-label='previous'>
					‹
				</button>
				<div className={styles.indexInfo}>{`${activeIndex + 1}/${intervals.length}`}</div>
				<button onClick={() => onChangeIndex(clamp(activeIndex + 1, 0, intervals.length - 1))} aria-label='next'>
					›
				</button>
			</div>
		</div>
	);
};

export default Timeline;
