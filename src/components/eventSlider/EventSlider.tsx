import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './EventSlider.module.scss';
import { EventItem } from '../../data/timelineData';

SwiperCore.use([Navigation, Pagination]);

const EventSlider: React.FC<{ events: EventItem[] }> = ({ events }) => {
	return (
		<div className={styles.sliderWrap}>
			<Swiper spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }}>
				{events.map((ev) => (
					<SwiperSlide key={ev.id}>
						<div className={styles.card}>
							<div className={styles.meta}>
								<div className={styles.date}>{ev.date}</div>
								<h3 className={styles.title}>{ev.title}</h3>
								<p className={styles.desc}>{ev.description}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default EventSlider;
