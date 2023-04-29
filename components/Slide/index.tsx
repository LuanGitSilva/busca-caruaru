import styles from './Slide.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import Image from 'next/image';
import Img1 from './image/test.jpg';
import Swiper1 from './swiper1';
import Swiper2 from './swiper2';

export const Slide = () => {
    return (
        <div className={styles.container}>
            <h4 className={styles.aviso}>Continua após o anúncio</h4>
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
        </div>
      );
}