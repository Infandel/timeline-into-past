import React, { useRef, useState } from 'react';
import styles from './Timeline.module.scss';
import EventSlider from '../eventSlider/EventSlider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import cn from 'clsx';
import { TimelineData } from '../../data/timelineData';

type TimelineProps = {
	intervals: TimelineData[];
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const Timeline = ({ intervals }: TimelineProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);

	// Refs related to Big Years Numbers animation changes
	const startingYear = useRef<HTMLSpanElement | null>(null);
	const [startYear, setStartYear] = useState(intervals[activeIndex]?.events[0]?.date);
	const endingYear = useRef<HTMLSpanElement | null>(null);
	const [endYear, setEndYear] = useState(intervals[activeIndex]?.events?.at(-1)?.date);

	// State and refs related to Displayed Current Category
	const [displayCategory, setDisplayCategory] = useState({
		current: intervals[activeIndex].category,
		previous: intervals[activeIndex].category,
		showPrevious: false,
	});
	const currentCatRef = useRef(null);
	const previousCatRef = useRef(null);

	// Drawing small circles on a Big main circle on initial Draw
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
					// Simultaneously fade in current value
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
				duration: 0.5,
				onUpdate: () => {
					// Round and render the year to the DOM (guarding against null ref)
					startingYear.current!.textContent = Math.round(+obj.startYear).toString();
				},
			});
			setStartYear(intervals[activeIndex]?.events[0]?.date);

			gsap.to(obj, {
				endYear,
				duration: 0.5,
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
	the classes `.main-circle` and `.circle-image`. It's need to be done simulteniously. */
	const onSegmentClick = contextSafe((newIndex: number) => {
		if (newIndex === activeIndex) return;

		let rotationAmount = 0;
		const indexDiff = newIndex - activeIndex;

		// If indexDiff is positive we should take intervals length in the formula
		if (indexDiff > 0) {
			rotationAmount = (360 / intervals.length) * Math.abs(intervals.length - (newIndex - activeIndex));
		} else if (indexDiff < 0) {
			rotationAmount = (360 / intervals.length) * Math.abs(newIndex - activeIndex);
		}

		gsap.to('.main-circle', {
			rotation: `+=${rotationAmount}`,
			duration: 0.7,
			ease: 'power1.inOut',
		});

		gsap.to('.dot-number', {
			rotation: `-=${rotationAmount}`,
			duration: 0.7,
			ease: 'power1.inOut',
		});

		setActiveIndex(newIndex);
	});

	const onIncreasePeriod = contextSafe((newIndex: number) => {
		if (newIndex === activeIndex) return;

		gsap.to('.main-circle', {
			rotation: `-=${360 / intervals.length}`,
			duration: 0.7,
			ease: 'power1.inOut',
		});

		gsap.to('.dot-number', {
			rotation: `+=${360 / intervals.length}`,
			duration: 0.7,
			ease: 'power1.inOut',
		});

		setActiveIndex(newIndex);
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
							<button
								key={i}
								className={cn(styles.dot, `img-${i}`, { [styles.chosenDot]: i === activeIndex })}
								onClick={() => onSegmentClick(i)}
							>
								<div className={cn('dot-number', styles.dotNumber)}>{i + 1}</div>
							</button>
						))}
					</div>
					<div
						ref={previousCatRef}
						className={cn('category-name', styles.categoryName)}
						style={{ opacity: displayCategory.showPrevious ? 1 : 0 }}
					>
						{displayCategory.previous}
					</div>
					<div
						ref={currentCatRef}
						className={cn('category-name-next', styles.categoryName)}
						style={{ opacity: displayCategory.showPrevious ? 0 : 1 }}
					>
						{displayCategory.current}
					</div>
				</div>
			</div>

			<div className={styles.sliderArea}>
				<EventSlider events={intervals[activeIndex].events} />
			</div>

			<div className={styles.footerControls}>
				<button onClick={() => onSegmentClick(clamp(activeIndex - 1, 0, intervals.length - 1))} aria-label='previous'>
					‹
				</button>
				<div className={styles.indexInfo}>{`${activeIndex + 1}/${intervals.length}`}</div>
				<button onClick={() => onIncreasePeriod(clamp(activeIndex + 1, 0, intervals.length - 1))} aria-label='next'>
					›
				</button>
			</div>
		</div>
	);
};

export default Timeline;
