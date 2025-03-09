import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const Slider = ({ type, slides = [], breakpoints, imageSizes, imageClasses }) => {
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (videoRefs.current[0]) {
      const firstVideo = videoRefs.current[0];
      if (firstVideo.readyState >= 2) {
        firstVideo.play().catch(() => { });
      } else {
        firstVideo.oncanplay = () => {
          firstVideo.play().catch(() => { });
          firstVideo.oncanplay = null;
        };
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: 1 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          if (video.readyState >= 2) {
            video.play().catch(() => { });
          }
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev-arrow",
          nextEl: ".swiper-button-next-arrow",
        }}
        loop={false}
        breakpoints={breakpoints}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="video-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className="flex flex-col  bg-[#F6F6F6] p-1">
            <div className="shadow-slideShadow">
              <div
                className={` text-center italic text-[#2b2b2b] opacity-[0.88] font-medium ${slide.font ? `text-[${slide.font}px]` : 'text-[14px]'} leading-[16px] h-[65px] pt-2 px-2`}
                dangerouslySetInnerHTML={{ __html: slide.text }}
              ></div>
              {type === "video" && slide.videoUrl ? (
                   <video
                   ref={(el) => (videoRefs.current[index] = el)}
                   data-index={index}
                   src={slide.videoUrl}
                   muted
                   loop
                   playsInline
                   autoPlay
                   className="slider-video pointer-events-none"
                   onLoadedData={(e) => {
                    const isMobile = /iPhone|iPad|iPod|Android/.test(navigator.userAgent);
                    if (index === 0) {
                      e.target.play().catch(() => {});
                    } else if (index === 1 && isMobile) {
                      e.target.pause();
                    }
                  }}
                  
                  
                 />

              ) : type === "image" && slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt="Slide"
                  className={imageClasses}
                  sizes={imageSizes}
                />
              ) : (
                <div className="error">Invalid slide data</div>
              )}
              <div className="text-[#2b2b2b] opacity-[0.88] justify-center text-center h-8 flex items-center font-semibold">{slide.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="swiper-button-prev-arrow absolute left-[-70px] top-1/2 transform -translate-y-1/2 z-10 hidden lg:block"
        aria-label="Previous Slide"
      >
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.48195 12.7696C0.766281 13.4853 0.766281 14.6456 1.48195 15.3613L13.1445 27.0238C13.8602 27.7395 15.0205 27.7395 15.7362 27.0238C16.4519 26.3082 16.4519 25.1478 15.7362 24.4322L5.36948 14.0654L15.7362 3.6987C16.4519 2.98303 16.4519 1.8227 15.7362 1.10702C15.0205 0.391349 13.8602 0.391349 13.1445 1.10702L1.48195 12.7696ZM33.0156 12.2328L2.7778 12.2328L2.7778 15.898L33.0156 15.898L33.0156 12.2328Z" fill="#747474" />
        </svg>
      </button>
      <button
        className="swiper-button-next-arrow absolute right-[-70px] top-1/2 transform -translate-y-1/2 z-10 hidden lg:block"
        aria-label="Next Slide"
      >
        <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.1743 15.3613C32.89 14.6456 32.89 13.4853 32.1743 12.7696L20.5117 1.10702C19.7961 0.391345 18.6357 0.391345 17.92 1.10702C17.2044 1.82269 17.2044 2.98303 17.92 3.6987L28.2868 14.0654L17.92 24.4322C17.2044 25.1478 17.2044 26.3082 17.92 27.0238C18.6357 27.7395 19.7961 27.7395 20.5117 27.0238L32.1743 15.3613ZM0.640625 15.898L30.8785 15.898L30.8785 12.2328L0.640625 12.2328L0.640625 15.898Z" fill="#747474" />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
