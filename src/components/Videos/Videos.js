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
      <div className='bg-pink py-11 md:pt-20 md:pb-14 relative'>
        <div className="max-w-[1260px] mx-auto">
          <h2 className="text-title text-center">{video.title}</h2>
          <div className="h-[340px]">
            <div  className="relative mx-auto max-w-[90%] md:max-w-[80%]  mt-6 md:mt-8">
                <Slider
                  slides={video.slides}
                  breakpoints={{
                    0: { slidesPerView: 1.8, spaceBetween: 10 },
                    425: { slidesPerView: 2.5, spaceBetween: 15 },
                    625: { slidesPerView: 3.2, spaceBetween: 20 },
                    976: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  imageSizes={{
                    width: 186,
                    height: 340
                  }}
                  imageClasses={"rounded-lg"}
                />
              </div>
          </div>
          <div className="mt-14 md:mt-8">
            <Button text={video.button} />
          </div>
        </div>

      </div>
    </>
  ) : null
}


export default Videos
