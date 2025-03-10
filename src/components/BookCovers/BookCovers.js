
"use client";



import config from '../../../config';
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

const BookCovers = () => {

  const { bookCoversUrl } = config;

  const [coversData, setCoversData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(bookCoversUrl)
      .then((response) => response.json())
      .then((data) => {

        setCoversData(data)
      })
      .catch((err) => {
        console.error('Error fetching Book Covers data:', err);
        setError('Failed to load Book Covers data.');
      });
  }, []);

  const title = coversData?.title;
  const subtitle = coversData?.subtitle;
  const slidesTitle = coversData?.slidesTitle;
  const slidesSubTitle = coversData?.slidesSubTitle;
  const slides = coversData?.slides || [];
  const button = coversData?.button;

  return coversData ? (
    <section className="bg-pink text-white section-py" id='book-covers'>
      <div className="max-w-[940px] mx-auto px-4">
        <div className="flex">
          <div className="w-full">
            <h2 className="text-title text-center">
              {title}
            </h2>
            <p className="text-gray text-center font-medium  text-[19px] leading-[24px]  "
              dangerouslySetInnerHTML={{ __html: subtitle }}
            >

            </p>
          </div>
        </div>

       
        <div className="mx-auto w-full mt-6  overflow-x-scroll no-scrollbar">
          <div className="grid grid-rows-2 grid-cols-[repeat(4,145px)] md:grid-cols-[repeat(4,180px)] gap-x-3 md:gap-x-1 gap-y-3 md:gap-y-1 865:justify-center">
            {slides.map((slide) => (
              <div className="w-full" key={slide.id}>
                <img className="w-full md:h-[235px] md:w-[220px] object-contain" src={slide.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>


        <div className="">
          <Button text={button} />
        </div>
      </div>
    </section>
  ) : null;
};

export default BookCovers;
