import React, { useRef, useState } from 'react';
import styles from './Timeline.module.scss';
import EventSlider from '../eventSlider/EventSlider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import cn from 'clsx';
import { TimelineData } from '../../data/timelineData';
import { useCirclesDraw } from './hooks/useCirclesDraw';
import { useFadingCategoryName } from './hooks/useFadingCategoryName';
import { useAnimateYearsChange } from './hooks/useAnimateYearsChange';

interface TimelineProps {
	intervals: TimelineData[];
}

export interface IDisplayCategory {
	current: string;
	previous: string;
	showPrevious: boolean;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const Timeline = ({ intervals }: TimelineProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);

	// Refs and consts related to Big Years Numbers animation changes
	const startYearDate = intervals[activeIndex]?.events[0]?.date;
	const endYearDate = intervals[activeIndex]?.events?.at(-1)?.date;

	const startingYearRef = useRef<HTMLSpanElement | null>(null);
	const [startYear, setStartYear] = useState(startYearDate);
	const endingYearRef = useRef<HTMLSpanElement | null>(null);
	const [endYear, setEndYear] = useState(endYearDate);

	// State and refs related to Displayed Current Category Name
	const [displayCategory, setDisplayCategory] = useState<IDisplayCategory>({
		current: intervals[activeIndex].category,
		previous: intervals[activeIndex].category,
		showPrevious: false,
	});
	const currentCatRef = useRef<HTMLDivElement | null>(null);
	const previousCatRef = useRef<HTMLDivElement | null>(null);

	useCirclesDraw({ circleRef, containerRef, intervals });

	useFadingCategoryName({
		containerRef,
		intervals,
		activeIndex,
		displayCategory,
		setDisplayCategory,
		previousCatRef,
		currentCatRef,
	});

	useAnimateYearsChange({
		containerRef,
		intervals,
		activeIndex,
		startingYearRef,
		endingYearRef,
		startYearDate,
		endYearDate,
		setStartYear,
		setEndYear,
	});

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
		<main className={styles.timeline}>
			<h2 className={styles.header}>
				Historical <br /> dates
			</h2>

			<section className={styles.centerArea}>
				<div className={styles.numberLarge}>
					<span ref={startingYearRef}>{startYear}</span>
					<span ref={endingYearRef}>{endYear}</span>
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
			</section>

			<div className={styles.manualSwitch}>
				<button
					onClick={() => onSegmentClick(clamp(activeIndex - 1, 0, intervals.length - 1))}
					disabled={activeIndex === 0}
					aria-label='previous'
				>
					‹
				</button>
				<span className={styles.indexInfo}>{`${activeIndex + 1}/${intervals.length}`}</span>
				<button
					onClick={() => onIncreasePeriod(clamp(activeIndex + 1, 0, intervals.length - 1))}
					disabled={activeIndex === intervals.length - 1}
					aria-label='next'
				>
					›
				</button>
			</div>

			<section className={styles.sliderArea}>
				<EventSlider events={intervals[activeIndex].events} />
			</section>
		</main>
	);
};

export default Timeline;
