import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CoverSlider = ({ selectedCover }) => {
  if (!selectedCover) return null;

  return (
    <Swiper spaceBetween={20} slidesPerView={1} loop={true} className="w-full">
      <SwiperSlide>
        <img
          src={selectedCover.frontCover}
          alt="Front Cover"
          className="w-full h-auto"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={selectedCover.spineCover}
          alt="Spine Cover"
          className="w-full h-auto"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={selectedCover.backCover}
          alt="Back Cover"
          className="w-full h-auto"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default CoverSlider;
