"use client";
import { Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";


import Image from "next/image";
import React, { useState, useEffect } from "react";
import config from "../../../config";

const Feed = () => {
  const { feedUrl } = config;
  const [feedData, setFeedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(feedUrl)
      .then((response) => response.json())
      .then((data) => setFeedData(data))
      .catch((err) => {
        console.error("Error fetching Feed data:", err);
        setError("Failed to load feed data.");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (feedData) {

    return (
      <div className="bg-[#FFC697]/75 h-[55px] overflow-hidden flex items-center text-gray/80">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={feedData.speed || 2000}
            loop={true}
            modules={[Autoplay]}
            className="h-full feed-slider"
          >
            {feedData.texts.map((text, index) => (
              <SwiperSlide key={index} className="!flex items-center !w-auto ">
                <span className="text-[15px] md:text-[22px]">{text}</span>
                <Image
                  src="/images/star.svg"
                  alt="Star Icon"
                  width={23}
                  height={24}
                  className='ml-[10px] md:w-[23px] md:h-[24px] w-[16px] h-[16px] opacity-80'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  };
};

export default Feed;
