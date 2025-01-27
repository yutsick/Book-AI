import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import 'swiper/css/navigation';

const icons = [
  { id: 1, label: "Icon 1", icon: "/images/create-book/cover-slider/icon1.png", images: ["/images/create-book/cover-slider/front1.png", "/images/create-book/cover-slider/spine1.png", "/images/create-book/cover-slider/back1.png"] },
  { id: 2, label: "Icon 2", icon: "/images/create-book/cover-slider/icon2.png", images: ["/images/create-book/cover-slider/front2.png", "/images/create-book/cover-slider/spine2.png", "/images/create-book/cover-slider/back2.png"] },
  { id: 3, label: "Icon 3", icon: "/images/create-book/cover-slider/icon3.png", images: ["/images/create-book/cover-slider/front3.png", "/images/create-book/cover-slider/spine3.png", "/images/create-book/cover-slider/back3.png"] },
  { id: 4, label: "Icon 4", icon: "/images/create-book/cover-slider/icon4.png", images: ["/images/create-book/cover-slider/front4.png", "/images/create-book/cover-slider/spine4.png", "/images/create-book/cover-slider/back4.png"] },
  // { id: 5, label: "Icon 5", icon: "/images/create-book/cover-slider/icon5.png", images: ["/images/create-book/cover-slider/front5.png", "/images/create-book/cover-slider/spine5.png", "/images/create-book/cover-slider/back5.png"] },
  // { id: 6, label: "Icon 6", icon: "/images/create-book/cover-slider/icon6.png", images: ["/images/create-book/cover-slider/front6.png", "/images/create-book/cover-slider/spine6.png", "/images/create-book/cover-slider/back6.png"] },
  { id: 7, label: "Icon 7", icon: "/images/create-book/cover-slider/icon7.png", images: ["/images/create-book/cover-slider/front7.png", "/images/create-book/cover-slider/spine7.png", "/images/create-book/cover-slider/back7.png"] },
  // { id: 8, label: "Icon 8", icon: "/images/create-book/cover-slider/icon8.png", images: ["/images/create-book/cover-slider/front8.png", "/images/create-book/cover-slider/spine8.png", "/images/create-book/cover-slider/back8.png"] },
];

const CoverSlider = () => {
  const [selectedImages, setSelectedImages] = useState(icons[0].images);

  const handleIconClick = (images) => {
    setSelectedImages(images);
  };

  return (
    <div className="flex flex-col md:flex-row items-center  justify-between">
      <div className="w-full lg:w-1/2 relative">
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
        <Swiper 
        navigation={{
          prevEl: ".swiper-button-prev-arrow",
          nextEl: ".swiper-button-next-arrow",
        }}
        loop={true}
          spaceBetween={10} 
          slidesPerView={1} 
          modules={[Navigation]}
          className="overflow-hidden max-h-[550px] relative" >

        

          {selectedImages.map((image, index) => (
            <SwiperSlide key={index}>
               
              <img src={image} alt={`Cover ${index + 1}`} style={{ width: 'auto', maxWidth: '100%', height: '550px', margin: '0 auto', display: 'block', objectFit: 'cover' }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full  md:grid mt-6 md:mt-0 md:h-[550px] grid-cols-2 grid-rows-4 gap-4 flex md:items-start md:w-1/4 md:gap-2 overflow-x-auto md:overflow-visible sm:justify-center">
        {icons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => handleIconClick(icon.images)}
            className="md:flex items-center gap-2  hover:bg-gray-100 md:w-full min-w-[80px]"
          >
            <img src={icon.icon} alt={icon.label} className="w-full " />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoverSlider;
