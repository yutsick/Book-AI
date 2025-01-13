"use client";

import Slider from '../Slider/Slider';
import Button from '../Button/Button';

import React, { useState, useEffect } from "react";
import config from "../../../config";

function Videos() {
  const { videosUrl } = config;
  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(videosUrl)
      .then((response) => response.json())
      .then((data) => setVideo(data))
      .catch((err) => console.error("Error fetching Video slider data:", err));
      setError('Failed to load Video slider data.');

  }, []);

  return video?.slides?.length ? (
    <>
      <div className='bg-pink section-py relative'>
        <div className="max-w-[1260px] mx-auto">
          <h2 className="text-title text-center">{video.title}</h2>
          <div className="h-[460px]">
            <div  className="relative mx-auto max-w-[90%] md:max-w-[870px]  ">
                <Slider
                  type='video'
                  slides={video.slides}

                  breakpoints={{
                    0: { slidesPerView: 1.3, spaceBetween: 10 },
                    335: { slidesPerView: 1.4, spaceBetween: 10 },
                    355: { slidesPerView: 1.6, spaceBetween: 10 },
                    395: { slidesPerView: 1.8, spaceBetween: 10 },
                    430: { slidesPerView: 2, spaceBetween: 10 },
                    485: { slidesPerView: 2.2, spaceBetween: 10 },
                    545: { slidesPerView: 2.4, spaceBetween: 10 },
                    635: { slidesPerView: 2.7, spaceBetween: 15 },
                    700: { slidesPerView: 3, spaceBetween: 15 },
                    768: { slidesPerView: 3.6, spaceBetween: 20 },
                    900: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  imageSizes={{
                    width: 186,
                    height: 340
                  }}
                  imageClasses={"rounded-lg"}
                />
              </div>
          </div>
          <div className="">
            <Button text={video.button} />
          </div>
        </div>

      </div>
    </>
  ) : null
}


export default Videos
