"use client";

import VideoGrid from '../VideoGrid/VideoGrid';
import Slider from '../Slider/Slider';
import Button from '../Button/Button';
import React, { useState, useEffect } from "react";
import config from "../../../config";

function Videos() {
  const { videosUrl } = config;
  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(videosUrl)
      .then((response) => response.json())
      .then((data) => setVideo(data))
      .catch((err) => {
        console.error("Error fetching Video data:", err);
        setError("Failed to load Video data.");
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setActiveIndex(0);
    }
  }, [isMobile, video]);

  return video?.slides?.length ? (
    <>
      <div className='bg-pink section-py relative'>
        <div className="max-w-[1260px] mx-auto px-4 md:px-0">
          <h2 className="text-title text-center">{video.title}</h2>
          <div className="h-auto">
            <div className="relative mx-auto w-full md:max-w-[870px]">
              {isMobile ? (
                <Slider
                  type='video'
                  slides={video.slides}
                  breakpoints={{
                    0: { slidesPerView: 1.3, spaceBetween: 10 },


                    485: { slidesPerView: 1.6, spaceBetween: 10 },
                    700: { slidesPerView: 1.9, spaceBetween: 20 },

                    900: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  imageSizes={{ width: 186, height: 340 }}
                  imageClasses={"rounded-lg"}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  initialSlide={0} // Гарантує, що початковий слайд - перший
                />
              ) : (
                <VideoGrid videos={video.slides.slice(0, 4)} />
              )}
            </div>
          </div>
          <div className="">
            <Button text={video.button} />
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default Videos;
