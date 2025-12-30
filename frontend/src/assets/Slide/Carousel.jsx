import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ children }) => {
    // Calculate actual number of children to prevent empty space errors
    const childCount = React.Children.count(children);

    return (
        <Swiper
            style={{
                "--swiper-navigation-color": "#c0c0c0ff",
                "--swiper-pagination-color": "#c0c0c0ff",
                "--swiper-navigation-size": "25px",
            }}
            modules={[Navigation, Pagination, Autoplay, A11y]}

            slidesPerView={1}
            spaceBetween={10}

            loop={true}
            navigation={true}
            speed={4000}
            autoplay={{
                delay: 6000,
                disableOnInteraction: false,
                // pauseOnMouseEnter: true, 
            }}
            a11y={{ enabled: true }}

        >
            {React.Children.map(children, (item, index) => (
                <SwiperSlide key={index}>
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;