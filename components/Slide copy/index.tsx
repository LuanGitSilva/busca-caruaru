import styles from './Slide.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import Swiper1 from './swiper1';
import Swiper2 from './swiper2';

export const SlideMini = () => {
    return (
        <div className={styles.slide}>
            <Swiper
            className={styles.swiper}
                modules={[ Autoplay ]}
                autoplay={{
                    delay: 10000
                }}
                slidesPerView={1}
            >
                <SwiperSlide>
                    <Swiper1 />
                </SwiperSlide>

                <SwiperSlide>
                    <Swiper2 />
                </SwiperSlide>
            </Swiper>
        </div>
      );
}