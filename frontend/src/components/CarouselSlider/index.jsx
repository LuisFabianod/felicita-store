import React from "react";
import { register } from 'swiper/element/bundle'
import './styles.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

register();

export const CarouselSlider = ({ images, url, width, maxHeight }) => {


  return (
    <Swiper
      slidesPerView={1}
      pagination={{clickable: true}}
      navigation={true}
      style={{width, maxHeight}}
      loop={true}
      autoplay={{
        delay: 2500, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={`${url}/${img}`}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
            style={{width, maxHeight}}
          />
        </SwiperSlide>
      ))}
      
    </Swiper>
  );
};
