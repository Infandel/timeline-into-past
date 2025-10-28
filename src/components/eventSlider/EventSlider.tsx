import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './EventSlider.module.scss';
import { EventItem } from '../../data/timelineData';
import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface IEventSlider {
	events: EventItem[];
}

const EventSlider = ({ events }: IEventSlider) => {
	const sliderWrapRef = useRef(null);

	// Fading out and in Current Slider element
	useGSAP(
		() => {
			// Taking small timeline for that
			const tl = gsap.timeline();

			// Fade out previous value instantly
			tl.to(sliderWrapRef.current, {
				opacity: 0,
				duration: 0,
			})
				// And slowly show next value after 0.3 delay
				.to(
					sliderWrapRef.current,
					{
						opacity: 1,
						duration: 0.8,
						ease: 'power2.in',
					},
					0.2
				);
		},
		{ dependencies: [events] }
	);

	return (
		<div ref={sliderWrapRef} className={styles.sliderWrap}>
			<Swiper
				breakpoints={{
					480: {
						slidesPerView: 1,
						spaceBetween: 15,
					},
					870: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					1530: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
				}}
				slidesPerView={1}
				spaceBetween={5}
				navigation
				modules={[Navigation]}
			>
				{events.map((ev) => (
					<SwiperSlide key={ev.id}>
						<div className={styles.card}>
							<div className={styles.date}>{ev.date}</div>
							<h3 className={styles.title}>{ev.title}</h3>
							<p className={styles.description}>{ev.description}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default EventSlider;
