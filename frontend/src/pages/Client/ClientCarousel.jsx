import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const ClientCarousel = ({ children }) => {
    if (!children || React.Children.count(children) === 0) return null;

    return (
        <>
            <style>
                {`
                .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
                .swiper-slide {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                `}
            </style>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={2} 
                spaceBetween={30}
                loop={true}
                allowTouchMove={false}
                speed={5000} 
                autoplay={{
                    delay: 0, 
                    disableOnInteraction: false,
                }}
                freeMode={true} 
                breakpoints={{
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 8,
                        spaceBetween: 30
                    }
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ClientCarousel;