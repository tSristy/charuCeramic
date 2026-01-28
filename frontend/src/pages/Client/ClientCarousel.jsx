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
                slidesPerView={8} // Adjusted for better visibility, change back to 10 if needed
                spaceBetween={30}
                loop={true}
                allowTouchMove={false}
                speed={5000} // Increase this for a slower, more professional glide
                autoplay={{
                    delay: 0, // CRITICAL: Set to 0 for continuous motion
                    disableOnInteraction: false,
                }}
                // This helps Swiper handle the "0 delay" transition better
                freeMode={true} 
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