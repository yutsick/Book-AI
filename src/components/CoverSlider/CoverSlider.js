import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const CoverSlider = ({ selectedCover, setSwiperSize }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (swiperRef.current) {
        setSwiperSize({
          width: swiperRef.current.clientWidth,
          height: swiperRef.current.scrollHeight, 
        });
      }
    };

    const observer = new MutationObserver(updateSize);
    if (swiperRef.current) {
      observer.observe(swiperRef.current, { childList: true, subtree: true });
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      observer.disconnect();
    };
  }, []);

  if (!selectedCover) return <p>No cover available</p>;

  return (
    <div ref={swiperRef} className="relative w-[65%] md:w-full">
      <button
        className="swiper-button-prev-arrow absolute -left-8 md:left-[-40px] top-1/2 transform md:-translate-y-1/2 z-10"
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-5 md:w-8 md:h-7"
          viewBox="0 0 34 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.48195 12.7696C0.766281 13.4853 0.766281 14.6456 1.48195 15.3613L13.1445 27.0238C13.8602 27.7395 15.0205 27.7395 15.7362 27.0238C16.4519 26.3082 16.4519 25.1478 15.7362 24.4322L5.36948 14.0654L15.7362 3.6987C16.4519 2.98303 16.4519 1.8227 15.7362 1.10702C15.0205 0.391349 13.8602 0.391349 13.1445 1.10702L1.48195 12.7696ZM33.0156 12.2328L2.7778 12.2328L2.7778 15.898L33.0156 15.898L33.0156 12.2328Z"
            fill="#747474"
          />
        </svg>
      </button>

      <button
        className="swiper-button-next-arrow absolute -right-8 md:right-[-40px] top-1/2 transform md:-translate-y-1/2 z-10"
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-5 md:w-8 md:h-7"
          viewBox="0 0 33 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.1743 15.3613C32.89 14.6456 32.89 13.4853 32.1743 12.7696L20.5117 1.10702C19.7961 0.391345 18.6357 0.391345 17.92 1.10702C17.2044 1.82269 17.2044 2.98303 17.92 3.6987L28.2868 14.0654L17.92 24.4322C17.2044 25.1478 17.2044 26.3082 17.92 27.0238C18.6357 27.7395 19.7961 27.7395 20.5117 27.0238L32.1743 15.3613ZM0.640625 15.898L30.8785 15.898L30.8785 12.2328L0.640625 12.2328L0.640625 15.898Z"
            fill="#747474"
          />
        </svg>
      </button>

      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev-arrow",
          nextEl: ".swiper-button-next-arrow",
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className="w-full"
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper && swiper.el) {
              setSwiperSize({
                width: swiper.el.clientWidth,
                height: swiper.el.scrollHeight, 
              });
            }
          }, 100);
        }}
      >
        <SwiperSlide>
          <img
            src={selectedCover.frontCover}
            alt="Front Cover"
            className="w-full h-auto"
            onLoad={() => {
              if (swiperRef.current) {
                setSwiperSize({
                  width: swiperRef.current.clientWidth,
                  height: swiperRef.current.scrollHeight, 
                });
              }
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={selectedCover.spineCover} alt="Spine Cover" className="w-full h-auto" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={selectedCover.backCover} alt="Back Cover" className="w-full h-auto" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CoverSlider;
