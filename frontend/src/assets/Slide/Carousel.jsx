import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ children }) => {
    if (!children || React.Children.count(children) === 0) return null;

    return (
        <Swiper
            style={{
                "--swiper-navigation-color": "#c0c0c0",
                "--swiper-pagination-color": "#c0c0c0",
                "--swiper-navigation-size": "25px",
            }}
            modules={[Navigation, Pagination, Autoplay, A11y]}
            slidesPerView={1}
            spaceBetween={10}
            loop={React.Children.count(children) > 1} 
            navigation={true}
            pagination={{ clickable: true }} 
            speed={800} 
            autoplay={{
                delay: 9200,
                disableOnInteraction: false,
                pauseOnMouseEnter: false, 
            }}
            a11y={{ enabled: true }}
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={child.key || index}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;