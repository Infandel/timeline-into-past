import React, { useMemo, useRef } from 'react';
import { Interval } from '../../data/timelineData';
import styles from './Timeline.module.scss';
import EventSlider from '../eventSlider/EventSlider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type Props = {
	intervals: Interval[];
	activeIndex: number;
	onChangeIndex: (i: number) => void;
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const Timeline: React.FC<Props> = ({ intervals, activeIndex, onChangeIndex }) => {
	const circleRef = useRef<HTMLDivElement | null>(null);
	const controlsRef = useRef<SVGGElement | null>(null);

	const points = useMemo(() => {
		const n = intervals.length;
		const arr = [];
		for (let i = 0; i < n; i++) arr.push(i);
		return arr;
	}, [intervals.length]);

	useGSAP(
		() => {
			const angle = (360 / intervals.length) * activeIndex;

			if (controlsRef.current) {
				gsap.to(controlsRef.current, { rotation: angle, transformOrigin: '50% 50%', duration: 0.6 });
			}
		},
		{ dependencies: [activeIndex, intervals.length] }
	);

	// compute positions for points on circle
	const radius = 180; // visual radius
	const center = { x: 0, y: 0 };

	const computePos = (idx: number) => {
		const n = intervals.length;
		const angle = (idx / n) * Math.PI * 2 - Math.PI / 2; // start top
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;
		return { x, y };
	};

	return (
		<div className={styles.timeline}>
			<div className={styles.header}>
				<h2>Historical dates</h2>
			</div>

			<div className={styles.centerArea}>
				<div className={styles.numberLarge}>
					{intervals[activeIndex]?.events[0]?.date || '2000'}
					<span>{intervals[activeIndex]?.events?.at(-1)?.date || '2022'}</span>
				</div>

				<div className={styles.circleWrap} ref={circleRef}>
					<svg width='520' height='520' viewBox='0 0 520 520' className={styles.circleSvg}>
						<g transform='translate(260,260)'>
							<circle r='220' className={styles.circleLine} fill='none' />

							{/* control points */}
							<g ref={controlsRef}>
								{points.map((i) => {
									const p = computePos(i);
									return (
										<g key={i} transform={`translate(${p.x}, ${p.y})`}>
											<circle
												className={styles.controlDot}
												r='6'
												onClick={() => onChangeIndex(i)}
												style={{ cursor: 'pointer' }}
											/>
											{i === activeIndex && (
												<g transform={`translate(18,-8)`}>
													<circle r='20' className={styles.activeBubble} />
													<text x='-8' y='6' fontSize='14' fill='#213047'>
														{i + 1}
													</text>
												</g>
											)}
										</g>
									);
								})}
							</g>
						</g>
					</svg>
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
