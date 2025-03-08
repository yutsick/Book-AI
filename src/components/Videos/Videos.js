"use client";

import VideoGrid from '../VideoGrid/VideoGrid';
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
      .catch((err) => {
        console.error("Error fetching Video grid data:", err);
        setError("Failed to load Video grid data.");
      });
  }, []);

  return video?.slides?.length ? (
    <>
      <div className='bg-pink section-py relative'>
        <div className="max-w-[1260px] mx-auto px-4 md:px-0">
          <h2 className="text-title text-center">{video.title}</h2>
          <div className="h-auto">
            <div className="relative mx-auto w-full md:max-w-[870px]">
              <VideoGrid videos={video.slides.slice(0, 4)} />
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